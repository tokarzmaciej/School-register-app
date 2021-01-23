import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from "react-redux";
import { postSubject } from '../operations/subjects';
import 'bulma/css/bulma.css';
import { postMark } from '../operations/marks';

function CreateMark({ allStudents, createSubject, createMark }) {

    const [nameClass2, setNameClass2] = useState("")
    const [nameSubject, setNameSubject] = useState("")


    const filterByStatus = (values) => Object.keys(values)
        .filter(student => values[student] === true)

    const handleSubmit = (values) => {

        if (window.confirm('Are you sure you want to create new mark?')) {
            const idSubjects = allStudents
                .filter(student => filterByStatus(values).includes(student.surname))
                .map(student => student.subjects.filter(subject => subject.name === nameSubject))
                .map(subject => subject[0]["_id"])
            const idStudents = allStudents
                .filter(student => filterByStatus(values).includes(student.surname))
                .map(student => student["_id"])

            createMark({
                mark: {
                    name: values.name,
                    grade: parseInt(values.grade)
                },
                idSubjects: idSubjects,
                idStudents: idStudents
            })
        }

    }

    const validate = (values) => {
        const errors = {};
        const kindOfGrade = ["1", "2", "3", "4", "5", "6"]
        if (!values.name) {
            errors.name = '*Required';
        }
        if (filterByStatus(values).length === 0) {
            errors.name = 'You have to choose student/s';
        }
        if (!kindOfGrade.includes(values.grade)) {
            errors.grade = "Bad value grade"
        }

        return errors
    };

    const studentsWithStatus = allStudents
        .filter(student => student.class === nameClass2 &&
            student.subjects
                .map(subject => subject.name)
                .includes(nameSubject))
        .reduce((total, amount) => {
            return { [amount.surname]: false, ...total }
        }, {})

    const studentCheckbox = Object.keys(studentsWithStatus)
        .map((student, index) =>
            <div key={index}>
                <Field type="checkbox" name={student} />
                <label className="is-size-7-mobile is-size-6-tablet has-text-black-bis" >{student}</label>
                <h5 className="valueText is-size-7" ><ErrorMessage name={student} /></h5>
            </div>
        )

    const listClass = allStudents.reduce((total, amount) => {
        return !total.includes(amount.class) ? [...total, amount.class] : total
    }, [])

    const listSubjects = [...new Set(allStudents
        .filter(student => student.class === nameClass2)
        .map(student => student.subjects.map(subject => subject.name))
        .reduce((total, amount) => {
            return [...amount, ...total]
        }, []))]


    return (
        <details className="is-size-3 has-text-danger-dark">
            <summary className="is-size-4-mobile is-size-3-tablet">Create mark</summary>
            <div className="create">
                <div className="select is-rounded is-size-6">
                    <select onChange={(event) => setNameClass2(event.target.value)}>
                        <option>class</option>
                        {listClass.map((name, index) => <option key={index}>{name}</option>)}
                    </select>
                </div>
                <div className="select is-rounded is-size-6">
                    <select onChange={(event) => setNameSubject(event.target.value)}>
                        <option>subject</option>
                        {listSubjects.map((name, index) => <option key={index}>{name}</option>)}
                    </select>
                </div>
                <Formik
                    initialValues={{
                        ...studentsWithStatus,
                        name: "",
                        grade: ""
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                    validate={validate}>
                    {({ handleSubmit, resetForm, initialValues }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field type="text" name="name" placeholder="name mark" className="input is-rounded is-size-6" />
                            <h5 className="valueText is-size-7" ><ErrorMessage name="name" /></h5>
                            <Field type="text" name="grade" placeholder="value" className="input is-rounded is-size-6" />
                            <h5 className="valueText is-size-7" ><ErrorMessage name="grade" /></h5>
                            <div className="student-checkbox">
                                {studentCheckbox}
                            </div>
                            <div className="batton">
                                <button type="submit" className="button is-success is-size-5">Create</button>
                                <button type={"button"} onClick={() => {
                                    if (window.confirm('Are you sure you want to reset?')) {
                                        resetForm(initialValues)
                                    }
                                }} className="button is-danger is-size-5">Reset</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </details>
    );
}
const mapStateToProps = (state) => {
    return {
        allStudents: state.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSubject: (payload, idStudent) => {
            dispatch(postSubject(payload, idStudent))
        },
        createMark: (payload) => {
            dispatch(postMark(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMark);

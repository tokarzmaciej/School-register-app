import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from "react-redux";
import { postSubject } from '../operations/subjects';
import 'bulma/css/bulma.css'

function CreateSubjects({ allStudents, createSubject }) {

    const [nameClass, setNameClass] = useState("")

    const filterByStatus = (values) => Object.keys(values)
        .filter(student => values[student] === true)

    const handleSubmit = (values) => {

        if (window.confirm('Are you sure you want to create new subject?')) {
            allStudents
                .filter(student => filterByStatus(values).includes(student.surname))
                .map(student => createSubject({ name: values.name }, student["_id"]))
        }

    }


    const validate = (values) => {
        const errors = {};
        const checkRepeatSubject = allStudents
            .filter(student => filterByStatus(values).includes(student.surname))
            .filter(students => students.subjects.map(subject => subject.name).includes(values.name))

        if (values.name.length < 3) {
            errors.name = 'Bad length';
        }
        if (filterByStatus(values).length === 0) {
            errors.name = 'You have to choose student/s';
        }
        if (checkRepeatSubject !== []) {
            if (checkRepeatSubject[0] !== undefined) {
                errors[checkRepeatSubject[0].surname] = `Student is already enrolled in this subject`
            }
        }

        return errors
    };

    const studentsWithStatus = allStudents
        .filter(student => student.class === nameClass)
        .reduce((total, amount) => {
            return { [amount.surname]: false, ...total }
        }, {})

    const studentCheckbox = Object.keys(studentsWithStatus)
        .map((student, index) =>
            <div key={index}>
                <Field type="checkbox" name={student} />
                <label className="is-size-5 has-text-black-bis" >{student}</label>
                <h5 className="valueText is-size-7" ><ErrorMessage name={student} /></h5>
            </div>
        )

    const listClass = allStudents.reduce((total, amount) => {
        return !total.includes(amount.class) ? [...total, amount.class] : total
    }, [])

    return (
        <details className="is-size-3 has-text-danger-dark">
            <summary>Create subject</summary>
            <div className="create">
                <div className="select is-rounded is-size-6">
                    <select onChange={(event) => setNameClass(event.target.value)}>
                        <option>class</option>
                        {listClass.map((name, index) => <option key={index}>{name}</option>)}
                    </select>
                </div>
                <Formik
                    initialValues={{
                        ...studentsWithStatus,
                        name: "",
                    }}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                    validate={validate}>
                    {({ handleSubmit, resetForm, initialValues }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field type="text" name="name" placeholder="name subject" className="input is-rounded is-size-5" />
                            <h5 className="valueText is-size-7" ><ErrorMessage name="name" /></h5>
                            <div className="student-checkbox">
                                {studentCheckbox}
                            </div>
                            <div className="batton">
                                <button type="submit" className="button is-success is-size-7">Create</button>
                                <button type={"button"} onClick={() => {
                                    if (window.confirm('Are you sure you want to reset?')) {
                                        resetForm(initialValues)
                                    }
                                }} className="button is-danger is-size-7">Reset</button>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubjects);

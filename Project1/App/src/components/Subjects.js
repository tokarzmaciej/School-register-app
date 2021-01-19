import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Menu from './Menu';
import { getStudents } from '../operations/students';
import { postSubject } from '../operations/subjects';
import 'bulma/css/bulma.css'

function Subjects({ allStudents, fetchStudents, createSubject }) {

    useEffect(() => fetchStudents(), [fetchStudents])
    console.log(allStudents);
    const [nameClass, setNameClass] = useState("")

    const handleSubmit = (values) => {
        const filterByStatus = Object.keys(values).filter(student => values[student] === true)

        allStudents.filter(student => filterByStatus.includes(student.surname)).map(student => createSubject({ name: values.name }, student["_id"]))
    }
    const validate = ({ name }) => {
        const errors = {};
        if (name.length < 3) {
            errors.name = 'Bad length';
        }
        return errors
    };
    const studentsWithStatus = allStudents.filter(student => student.class === nameClass).reduce((total, amount) => {
        return { [amount.surname]: false, ...total }
    }, {})

    const studentToCheck = Object.keys(studentsWithStatus)
        .map((student, index) =>
            <div key={index}>
                <Field type="checkbox" name={student} />
                <label className="is-size-5 has-text-black-bis" >{student}</label>
            </div>
        )
    const className = allStudents.reduce((total, amount) => {
        return !total.includes(amount.class) ? [...total, amount.class] : total
    }, [])
    return (
        <div id="container-subjects">
            <Menu></Menu>
            <div className="subjects">

                <details className="is-size-4 has-text-danger-dark">
                    <summary>Create subject</summary>
                    <div className="create-subjects">
                        <div className="select is-rounded is-size-6">
                            <select onChange={(event) => setNameClass(event.target.value)}>
                                <option>class name</option>
                                {className.map((name, index) => <option key={index}>{name}</option>)}
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
                                    <Field type="text" name="name" placeholder="name subject" className="input is-rounded is-size-6" />
                                    <h5 className="valueText" ><ErrorMessage name="name" /></h5>
                                    <div className="student-checkbox">
                                        {studentToCheck}
                                    </div>
                                    <div className="batton">
                                        <button type="submit" className="button is-success">Create</button>
                                        <button type={"button"} onClick={() => {
                                            if (window.confirm('Are you sure you want to reset?')) {
                                                resetForm(initialValues)
                                            }
                                        }} className="button is-danger">Reset</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </details>
                <div className="view">
                    {allStudents.map(student =>
                        <div key={student._id} className="box has-background-info-light is-size-4">
                            <div className="notification has-background-info-light">
                                <Link to={`/student/${student._id}`} className="title has-text-link-dark">
                                    {student.name + " " + student.surname}
                                </Link>
                                <p className="title is-size-6"> Subjects: {student.subjects.map(element => element.name)}</p>
                            </div>
                        </div>
                    )
                    }
                </div>

            </div >
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        allStudents: state.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => {
            dispatch(getStudents());
        },
        createSubject: (payload, idStudent) => {
            dispatch(postSubject(payload, idStudent))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);

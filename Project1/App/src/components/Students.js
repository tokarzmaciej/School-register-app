import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import Menu from './Menu';
import { getStudents, postStudent, deleteStudent } from '../operations/students';
import { sortByname } from '../selectors/students';
import { postAction } from '../operations/actions';
import '../style/students.css';

function Students({ allStudents, fetchStudents, createStudent, delStudent, createAction }) {

    useEffect(() => fetchStudents(), [fetchStudents]);

    const [value, setValue] = useState("");
    const [sort, setSort] = useState("");
    const [gender, setGender] = useState("");

    const filter = (students, sort, gender, value) => {
        return alphabeticSort(sortByname(sortByGender(students, gender), value), sort)
    };

    const alphabeticSort = (students, sort) => {
        if (sort === true) {
            return students.sort((studentA, studentB) => studentA.name.localeCompare(studentB.name))
        } else if (sort === false) {
            return students.sort((studentA, studentB) => studentA.name.localeCompare(studentB.name)).reverse()
        } else {
            return students
        }
    };

    const sortByGender = (students, gender) => {
        return students.filter(student => student.gender === gender || gender === "")
    };

    const handleSubmit = (values) => {
        if (window.confirm('Are you sure you want to create new student?')) {
            createStudent(values)
            createAction({
                action: `The new student ${values.name} ${values.surname} has been added`
            })
        }
    };

    const validate = ({ name, surname, email }) => {
        const errors = {};
        if (name.length < 3) {
            errors.name = 'Bad length';
        }
        else if (!name) {
            errors.name = '*Required';
        }
        else if (!/^[A-Za-z]+$/.test(name)) {
            errors.name = 'Bad value name';
        }
        else if (!surname) {
            errors.surname = '*Required';
        }
        else if (!/^[A-Za-z]+$/.test(surname)) {
            errors.surname = 'Bad value surname';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = 'Bad value email'
        }
        return errors
    };

    return (
        <div id="container-students">
            <Menu></Menu>

            <div className="students">
                <div className="filter-students">
                    <input className="input is-rounded is-size-6"
                        placeholder="find a student"
                        onChange={(event) => setValue(event.target.value)}>
                    </input>
                    <div className="select is-rounded">
                        <select onChange={(event) => setGender(event.target.value)}>
                            <option></option>
                            <option>male</option>
                            <option>female</option>
                        </select>
                    </div>
                    <button className="button is-rounded is-danger" onClick={() => setSort(true)}>A-Z</button>
                    <button className="button is-rounded is-info" onClick={() => setSort(false)}> Z-A</button>
                </div>

                <div className="create-student">
                    <Formik
                        initialValues={{
                            name: "",
                            surname: "",
                            email: "",
                            gender: "",
                            class: ""
                        }}
                        onSubmit={(values) => {
                            handleSubmit(values)
                        }}
                        validate={validate}>
                        {({ handleSubmit, resetForm, initialValues }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field type="text" name="name" placeholder="name" className="input is-rounded is-size-6" />
                                <h5 ><ErrorMessage name="name" /></h5>
                                <Field type="text" name="surname" placeholder="surname" className="input is-rounded is-size-6" />
                                <h5 ><ErrorMessage name="surname" /></h5>
                                <Field type="email" name="email" placeholder="email" className="input is-rounded is-size-6" />
                                <h5 ><ErrorMessage name="email" /></h5>
                                <Field type="text" name="class" placeholder="class" className="input is-rounded is-size-6" />
                                <div className="select is-rounded">
                                    <Field as="select" name="gender">
                                        <option></option>
                                        <option>female</option>
                                        <option>male</option>
                                    </Field>
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

                <div className="view">
                    {filter(allStudents, sort, gender, value).map(student =>
                        <div key={student._id} className="box has-background-info-light is-size-4">
                            <div className="notification has-background-info-light">
                                <button className="delete" onClick={() => {
                                    if (window.confirm('Are you sure you want to delete student?')) {
                                        delStudent(student._id)
                                        createAction({
                                            action: `The student ${student.name} ${student.surname} has been deleted`
                                        })
                                    }
                                }}>
                                </button>
                                <Link to={`/students/${student._id}`}
                                    className="title has-text-link-dark">
                                    {student.name + " " + student.surname}
                                </Link>
                                <p className="title  is-size-7-mobile is-size-6-tablet"> class: {student.class}</p>
                                <p className="title  is-size-7-mobile is-size-6-tablet"> email: {student.email}</p>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div >
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        allStudents: state.students
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => {
            dispatch(getStudents());
        },
        createStudent: (payload) => {
            dispatch(postStudent(payload))
        },
        delStudent: (payload) => {
            dispatch(deleteStudent(payload))
        },
        createAction: (payload) => {
            dispatch(postAction(payload))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);


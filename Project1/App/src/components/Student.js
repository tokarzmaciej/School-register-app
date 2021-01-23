import React, { useState } from 'react';
import { connect } from "react-redux";
import Menu from './Menu';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { patchStudent } from '../operations/students';
import { averageFromSubject } from '../selectors/students';
import { postAction } from '../operations/actions';
import '../style/student.css';

function Student({ id, allStudents, updateStudent, average, createAction }) {

    const student = allStudents.filter(student => student["_id"] === id)[0];
    const studentAverage = average.filter(student => student.id === id)[0];
    const styleTitle = "title is-size-7-mobile is-size-5-tablet"

    const [img, setImg] = useState("");

    const uploadImage = event => {
        let picture = event.target.files[0];
        if (picture && picture.type === "image/jpeg") {
            setImg(URL.createObjectURL(picture));
        } else {
            alert("Bad file")
        }
    };

    const picture = () => {
        return img !== "" ?
            <figure className="image is-128x128">
                <img src={img} alt="img" />
            </figure> :
            null
    };

    const upload = () => {
        return img === "" ?
            <input type="file" onChange={(event) => uploadImage(event)} /> :
            null
    };

    const handleSubmit = (values) => {
        const editValues = {}
        if (values.name !== student.name && values.name !== "") {
            editValues.name = values.name
        }
        if (values.surname !== student.surname && values.surname !== "") {
            editValues.surname = values.surname
        }
        if (values.email !== student.email && values.email !== "") {
            editValues.email = values.email
        }
        if (values.gender !== student.gender && values.gender !== "") {
            editValues.gender = values.gender
        }
        if (values.class !== student.class && values.class !== "") {
            editValues.class = values.class
        }
        if (window.confirm('Are you sure you want to edit student?')) {
            updateStudent(editValues, id)
            createAction({
                action: `Edit student ${student.name} ${student.surname}`
            })
        }
    };

    const validate = ({ name, surname, email }) => {
        const errors = {};
        if (name.length < 3 && name !== "") {
            errors.name = 'Bad length';
        }
        else if (!/^[A-Za-z]+$/.test(name) && name !== "") {
            errors.name = 'Bad value name';
        }
        else if (!/^[A-Za-z]+$/.test(surname) && surname !== "") {
            errors.surname = 'Bad value surname';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && email !== "") {
            errors.email = 'Bad value email'
        }
        return errors
    };

    return (
        <div id="container-student">
            <Menu></Menu>
            <div className="student">

                <div className="view">
                    <div key={student && student._id} className="box has-background-info-light is-size-4">
                        <div className="picture">
                            {picture()}
                            {upload()}
                        </div>
                        <div className="notification has-background-info-light">
                            <div className="title has-text-link-dark">
                                <details className="details-student-edit">
                                    <summary className="title is-size-6-mobile is-size-3-tablet">
                                        {student && student.name} {student && student.surname}
                                    </summary>
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
                                                <h5 className="title is-size-7" ><ErrorMessage name="name" /></h5>
                                                <Field type="text" name="surname" placeholder="surname" className="input is-rounded is-size-6" />
                                                <h5 className="title is-size-7"><ErrorMessage name="surname" /></h5>
                                                <Field type="email" name="email" placeholder="email" className="input is-rounded is-size-6" />
                                                <h5 className="title is-size-7"><ErrorMessage name="email" /></h5>
                                                <Field type="text" name="class" placeholder="class" className="input is-rounded is-size-6" />
                                                <div className="select is-rounded is-size-6">
                                                    <Field as="select" name="gender">
                                                        <option></option>
                                                        <option>female</option>
                                                        <option>male</option>
                                                    </Field>
                                                </div>
                                                <div className="batton">
                                                    <button type="submit" className="button is-success is-size-6">Edit</button>
                                                    <button type={"button"} onClick={() => {
                                                        if (window.confirm('Are you sure you want to reset?')) {
                                                            resetForm(initialValues)
                                                        }
                                                    }} className="button is-danger is-size-6">Reset</button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </details>
                            </div>

                            <p className={styleTitle}> Class: {student && student.class}</p>
                            <p className={styleTitle}> Email: {student && student.email}</p>
                            <p className={styleTitle}> Gender: {student && student.gender}</p>
                            <p className={`${styleTitle} has-text-danger-dark`}>
                                Average: {studentAverage && studentAverage.average}
                            </p>
                            {studentAverage && studentAverage.subjects
                                .map((subject, index) =>
                                    <p key={index} className={`${styleTitle} has-text-success-dark`}>
                                        {subject.name}: {subject.average}
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        allStudents: state.students,
        average: averageFromSubject(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudent: (payload, idStudent) => {
            dispatch(patchStudent(payload, idStudent))
        },
        createAction: (payload) => {
            dispatch(postAction(payload))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);


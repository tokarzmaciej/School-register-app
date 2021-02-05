import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { connect } from "react-redux";
import { postSubject } from '../operations/subjects';
import 'bulma/css/bulma.css';
import { postAction } from '../operations/actions';


function CreateSubjects({ allStudents, createSubject, createAction }) {

    const [nameClass1, setNameClass1] = useState("");

    const filterByStatus = (values) => Object.keys(values)
        .filter(student => values[student] === true);

    const handleSubmit1 = (values) => {

        if (window.confirm('Are you sure you want to create new subject?')) {
            allStudents
                .filter(student => filterByStatus(values).includes(student.surname))
                .map(student => createSubject({ name: values.name }, student["_id"]))
            createAction({
                action: `Create new subject ${values.name} in class ${nameClass1}`
            })
        }
    };

    const validate1 = (values) => {
        const errors = {};
        const checkRepeatSubject = allStudents
            .filter(student => filterByStatus(values).includes(student.surname))
            .filter(student => student.subjects.map(subject => subject.name).includes(values.name))

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

    const studentsWithStatus1 = allStudents
        .filter(student => student.class === nameClass1)
        .reduce((total, amount) => {
            return { [amount.surname]: false, ...total }
        }, {});

    const studentCheckbox1 = Object.keys(studentsWithStatus1)
        .map((student, index) =>
            <div key={index}>
                <Field type="checkbox" name={student} />
                <label className="is-size-7-mobile is-size-6-tablet has-text-black-bis" >{student}</label>
                <h5 className="valueText is-size-7" ><ErrorMessage name={student} /></h5>
            </div>
        );

    const listClass1 = allStudents.reduce((total, amount) => {
        return !total.includes(amount.class) ? [...total, amount.class] : total
    }, []);

    return (
        <details className="is-size-3 has-text-danger-dark">
            <summary className="is-size-4-mobile is-size-3-tablet">Create subject</summary>
            <div className="create">
                <div className="select is-rounded is-size-6">
                    <select value={nameClass1}
                        onChange={(event) => {
                            setNameClass1(event.target.value)
                            document.getElementById('reset').click()
                        }}
                    >
                        <option value="" disabled>Select class</option>
                        {listClass1.map((name, index) => <option key={index}>{name}</option>)}
                    </select>
                </div>
                <Formik
                    initialValues={{
                        ...studentsWithStatus1,
                        name: "",
                    }}
                    onSubmit={(values) => {
                        handleSubmit1(values)
                    }}
                    validate={validate1}>
                    {({ handleSubmit, resetForm, initialValues }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field type="text" name="name" placeholder="name subject" className="input is-rounded is-size-5" />
                            <h5 className="valueText is-size-7" ><ErrorMessage name="name" /></h5>
                            <div className="student-checkbox" >
                                {studentCheckbox1}
                            </div>
                            <div className="batton">
                                <button type="submit" className="button is-success is-size-5">Create</button>
                                <button type={"button"} onClick={() => {
                                    if (window.confirm('Are you sure you want to reset?')) {
                                        resetForm(initialValues)
                                    }
                                }} className="button is-danger is-size-5">Reset</button>
                                <button type="reset" id="reset" hidden>Reset-checkbox</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </details>
    );
};

const mapStateToProps = (state) => {
    return {
        allStudents: state.students
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createSubject: (payload, idStudent) => {
            dispatch(postSubject(payload, idStudent))
        },
        createAction: (payload) => {
            dispatch(postAction(payload))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubjects);

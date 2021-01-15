import React from 'react';
import { connect } from "react-redux";
import Menu from './Menu';
import { getStudents, postStudent, deleteStudent } from '../operations/students'
import 'bulma/css/bulma.css'

function Student({ id }) {


    return (
        <div id="container-students">
            <Menu></Menu>
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
        createStudent: (payload) => {
            dispatch(postStudent(payload))
        },
        delStudent: (payload) => {
            dispatch(deleteStudent(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);


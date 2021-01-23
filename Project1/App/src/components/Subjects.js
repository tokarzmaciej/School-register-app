import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Menu from './Menu';
import { getStudents } from '../operations/students';
import 'bulma/css/bulma.css';
import CreateSubject from './CreateSubject';
import CreateMark from './CreateMark';
import { deleteSubject, patchSubject } from '../operations/subjects';
import { deleteMark, patchMark } from '../operations/marks';
import { sortByname } from '../selectors/students';
import { postAction } from '../operations/actions';
import '../style/subjects.css';

function Subjects({ allStudents, fetchStudents, delSubject, updateSubject, delMark, updateMark, createAction }) {

    useEffect(() => fetchStudents(), [fetchStudents]);

    const [editSubject, setEditSubject] = useState("");
    const [editMark, setEditMark] = useState("");
    const [value, setValue] = useState("");

    return (
        <div id="container-subjects">
            <Menu></Menu>
            <div className="subjects">

                <div className="filter-students">
                    <input className="input is-rounded is-size-5"
                        placeholder={"find a student"}
                        onChange={(event) => setValue(event.target.value)}>
                    </input>
                </div>

                <div className="components-subject">
                    <CreateSubject></CreateSubject>
                    <CreateMark></CreateMark>
                </div>

                <div className="view">
                    {sortByname(allStudents, value) && sortByname(allStudents, value).map(student =>
                        <div key={student._id} className="box has-background-info-light is-size-4">
                            <div className="notification has-background-info-light">
                                <h1 to={`/student/${student._id}`} className="title has-text-link-dark">
                                    {student.name + " " + student.surname}
                                </h1>
                                <ul>
                                    {/* Subjects */}
                                    {student.subjects.map((element, index) =>
                                        <li className="block" key={index}>
                                            <span className="tag has-background-info-light  is-size-6-mobile is-size-4-tablet has-text-black has-text-weight-bold">
                                                <button className="delete has-background-danger mr-2" onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete subject?')) {
                                                        delSubject(element.idStudent, element["_id"])
                                                        createAction({
                                                            action: `Deleted subject ${element.name} in ${student.name} ${student.surname}`
                                                        })
                                                    }
                                                }}>
                                                </button>
                                                {element.name}
                                                <details className="details-subject-edit">
                                                    <summary></summary>
                                                    <div>
                                                        <input className="input is-size-7"
                                                            placeholder="new name"
                                                            value={editSubject}
                                                            onChange={(event) => setEditSubject(event.target.value)}>
                                                        </input>
                                                        <button className="button is-size-7"
                                                            onClick={() => {
                                                                if (window.confirm('Are you sure you want to edit subject?')) {
                                                                    updateSubject({ name: editSubject }, element.idStudent, element["_id"])
                                                                    setEditSubject("")
                                                                }
                                                            }}>OK
                                                            </button>
                                                    </div>
                                                </details>
                                            </span>

                                            {/* Marks */}
                                            <ul className="ml-6">
                                                {element.marks.map((mark, index) =>
                                                    <li className="block" key={index} >
                                                        <span className="tag has-background-info-light is-size-6-mobile is-size-4-tablet has-text-black">
                                                            <button className="delete has-background-danger-dark mr-1" onClick={() => {
                                                                if (window.confirm('Are you sure you want to delete mark?')) {
                                                                    delMark(element.idStudent, element["_id"], mark["_id"])
                                                                }
                                                            }}>
                                                            </button>
                                                            {mark.name}: {mark.grade}
                                                            <details className="details-subject-edit">
                                                                <summary></summary>
                                                                <div>
                                                                    <input className="input is-size-7"
                                                                        placeholder="new name"
                                                                        value={editMark}
                                                                        onChange={(event) => setEditMark(event.target.value)}>
                                                                    </input>
                                                                    <button className="button is-size-7"
                                                                        onClick={() => {
                                                                            if (window.confirm('Are you sure you want to edit mark?')) {
                                                                                updateMark({ name: editMark }, mark["_id"])
                                                                                setEditMark("")
                                                                            }
                                                                        }}>OK
                                                                    </button>
                                                                </div>
                                                            </details>
                                                        </span>
                                                    </li>)}
                                            </ul>
                                        </li>)}
                                </ul>
                            </div>
                        </div>)}
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
        delSubject: (idStudent, idSubject) => {
            dispatch(deleteSubject(idStudent, idSubject));
        },
        updateSubject: (payload, idStudent, idSubject) => {
            dispatch(patchSubject(payload, idStudent, idSubject));
        },
        delMark: (idStudent, idSubject, idMark) => {
            dispatch(deleteMark(idStudent, idSubject, idMark));
        },
        updateMark: (payload, idMark) => {
            dispatch(patchMark(payload, idMark));
        },
        createAction: (payload) => {
            dispatch(postAction(payload))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);


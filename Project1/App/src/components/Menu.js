import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <div className="menu">
            <div className="header">
                <h1 className="title has-text-black-ter is-3 has-text-weight-bold">E-CLASS</h1>
            </div>
            <div>
                <Link to={`/`} className="title has-text-white-bis">Home</Link>
            </div>
            <div>
                <Link to={`/students`} className="title has-text-white-bis">Students</Link>
            </div>
            <div>
                <Link to={`/subjects`} className="title has-text-white-bis">Subjects</Link>
            </div>
        </div>
    );
};

export default Menu;

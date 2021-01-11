import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { last20Actions } from '../selectors/actions';
import { getActions } from '../operations/actions';

const Actions = ({ fetchActions, last20Actions }) => {


    useEffect(() => fetchActions(), [fetchActions]);

    return (
        <div className="actions">
            <h2>Actions</h2>
            {last20Actions.map(action =>
                <div key={action._id} className="action">
                    <p className="content">{action.action}</p>
                    <p className="date">{action.date.slice(0, 10)}</p>
                </div>
            )}

        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        last20Actions: last20Actions(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActions: () => {
            dispatch(getActions());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);

import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { last15Actions } from '../selectors/actions';
import { getActions } from '../operations/actions';

const Actions = ({ fetchActions, actions }) => {

    useEffect(() => fetchActions(), [fetchActions]);

    return (
        <div className="actions">
            <h2 className="title has-text-black-ter is-2">ACTIONS</h2>
            {actions.map(action =>
                <div key={action._id} className="action">
                    <p className="is-large has-text-link-dark is-size-4">{action.action}</p>
                    <p className="is-small is-size-6">{action.date.slice(0, 10)}</p>
                </div>
            )}
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        actions: last15Actions(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActions: () => {
            dispatch(getActions());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);

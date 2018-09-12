import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { translate as $t, formatDate } from '../../helpers';
import { actions, get } from '../../store';

const Export = connect(
    (state, props) => {
        let access = get.accessById(state, props.account.bankAccess);
        let canBeSynced = !get.bankByUuid(state, access.bank).deprecated && access.enabled;
        return {
            canBeSynced
        };
    },
    (dispatch, ownProps) => {
        return {
            handleSync: () => {
                actions.runOperationsSync(dispatch, ownProps.account.bankAccess);
            }
        };
    }
)(props => {
    const lastSyncText = (
        <span>
            {$t('client.operations.last_sync')}
            &nbsp;
            {formatDate.fromNow(props.account.lastChecked)}
        </span>
    );

    if (props.canBeSynced) {
        return (
            <button type="button" onClick={props.handleSync} className="btn transparent">
                {lastSyncText}
                <span className="fa fa-refresh" />
            </button>
        );
    }

    return lastSyncText;
});

Export.propTypes = {
    // Account to be resynced
    account: PropTypes.object.isRequired
};

export default Export;

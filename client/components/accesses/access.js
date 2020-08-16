import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { translate as $t } from '../../helpers';
import { get, actions } from '../../store';

import { DELETE_ACCESS_MODAL_SLUG } from './confirm-delete-access';
import { DISABLE_MODAL_SLUG } from './disable-access-modal';
import { EDIT_ACCESS_MODAL_SLUG } from './edit-access-modal';
import AccountItem from './account';
import Label from '../ui/label';
import DisplayIf from '../ui/display-if';

import { Switch } from '../ui';

const DeleteAccessButton = connect(null, (dispatch, props) => {
    return {
        handleClick() {
            actions.showModal(dispatch, DELETE_ACCESS_MODAL_SLUG, props.accessId);
        },
    };
})(props => {
    return (
        <button
            className="fa fa-times-circle"
            aria-label="remove access"
            onClick={props.handleClick}
            title={$t('client.settings.delete_access_button')}
        />
    );
});

DeleteAccessButton.propTypes = {
    // The account's unique id.
    accessId: PropTypes.number.isRequired,
};

export default connect(
    (state, props) => {
        return {
            access: get.accessById(state, props.accessId),
            isDemoEnabled: get.isDemoMode(state),
        };
    },
    (dispatch, props) => {
        return {
            handleSyncAccounts: () => actions.runAccountsSync(dispatch, props.accessId),
            handleDeleteAccess: () => actions.deleteAccess(dispatch, props.accessId),
            setAccessCustomLabel(oldCustomLabel, customLabel) {
                actions.updateAccess(
                    dispatch,
                    props.accessId,
                    { customLabel },
                    { customLabel: oldCustomLabel }
                );
            },
            handleOpenEditModal() {
                actions.showModal(dispatch, EDIT_ACCESS_MODAL_SLUG, props.accessId);
            },
            handleOpenDisableModal() {
                actions.showModal(dispatch, DISABLE_MODAL_SLUG, props.accessId);
            },
        };
    },
    (stateToProps, dispatchToProp) => {
        let { setAccessCustomLabel, ...rest } = dispatchToProp;
        return {
            ...stateToProps,
            ...rest,
            getLabel() {
                return stateToProps.access.label;
            },
            setAccessCustomLabel(customLabel) {
                return setAccessCustomLabel(stateToProps.access.customLabel, customLabel);
            },
        };
    }
)(props => {
    let { access } = props;
    let accounts = access.accountIds.map(id => {
        let enabled = access.enabled && !access.isBankVendorDeprecated;
        return <AccountItem key={id} accountId={id} enabled={enabled} />;
    });

    let toggleEnableLabel = access.enabled
        ? $t('client.settings.disable_access')
        : $t('client.settings.enable_access');
    let toggleEnableModal = access.enabled
        ? props.handleOpenDisableModal
        : props.handleOpenEditModal;

    return (
        <div key={`bank-access-item-${access.id}`}>
            <table className="no-vertical-border no-hover bank-accounts-list">
                <caption>
                    <div>
                        <DisplayIf condition={!access.isBankVendorDeprecated}>
                            <Switch
                                className="enabled-status"
                                checked={access.enabled}
                                onChange={toggleEnableModal}
                                ariaLabel={toggleEnableLabel}
                            />
                        </DisplayIf>
                        <h3>
                            <Label
                                item={access}
                                setCustomLabel={props.setAccessCustomLabel}
                                getLabel={props.getLabel}
                                inputClassName="light"
                            />
                        </h3>
                        <div className="actions">
                            <DisplayIf condition={!access.isBankVendorDeprecated && access.enabled}>
                                <button
                                    type="button"
                                    className="fa fa-refresh"
                                    aria-label="Reload accounts"
                                    onClick={props.handleSyncAccounts}
                                    title={$t('client.settings.reload_accounts_button')}
                                />

                                <button
                                    type="button"
                                    className="fa fa-pencil"
                                    onClick={props.handleOpenEditModal}
                                    title={$t('client.settings.change_password_button')}
                                    aria-label="Edit bank access"
                                />
                            </DisplayIf>

                            <DisplayIf condition={!props.isDemoEnabled}>
                                <DeleteAccessButton accessId={access.id} />
                            </DisplayIf>
                        </div>
                    </div>
                </caption>
                <tbody>{accounts}</tbody>
            </table>
        </div>
    );
});

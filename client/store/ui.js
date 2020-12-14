import u from 'updeep';

import { createReducerFromMap, fillOutcomeHandlers, SUCCESS, FAIL } from './helpers';

import {
    SET_IS_SMALL_SCREEN,
    SET_SEARCH_FIELD,
    SET_SEARCH_FIELDS,
    RESET_SEARCH,
    TOGGLE_SEARCH_DETAILS,
    UPDATE_MODAL,
    TOGGLE_MENU,
    ENABLE_DEMO_MODE,
    DISABLE_DEMO_MODE,
    REQUEST_USER_ACTION,
} from './actions';

import { computeIsSmallScreen } from '../helpers';
import { DARK_MODE, FLUID_LAYOUT } from '../../shared/settings';

// Basic action creators
const basic = {
    setSearchField(field, value) {
        return {
            type: SET_SEARCH_FIELD,
            field,
            value,
        };
    },

    setSearchFields(fieldsMap) {
        return {
            type: SET_SEARCH_FIELDS,
            fieldsMap,
        };
    },

    resetSearch() {
        return {
            type: RESET_SEARCH,
        };
    },

    toggleSearchDetails(show) {
        return {
            type: TOGGLE_SEARCH_DETAILS,
            show,
        };
    },

    setIsSmallScreen(isSmall) {
        return {
            type: SET_IS_SMALL_SCREEN,
            isSmall,
        };
    },

    showModal(slug, modalState) {
        return {
            type: UPDATE_MODAL,
            slug,
            modalState,
        };
    },

    hideModal() {
        return {
            type: UPDATE_MODAL,
            slug: null,
            modalState: null,
        };
    },

    toggleMenu(hideMenu) {
        return {
            type: TOGGLE_MENU,
            hideMenu,
        };
    },

    enableDemo() {
        return {
            type: ENABLE_DEMO_MODE,
        };
    },

    disableDemo() {
        return {
            type: DISABLE_DEMO_MODE,
        };
    },

    requestUserAction(finish, message = '', fields = []) {
        return {
            type: REQUEST_USER_ACTION,
            finish,
            message,
            fields,
        };
    },
};

const fail = {},
    success = {};
fillOutcomeHandlers(basic, fail, success);

export function setSearchField(field, value) {
    return basic.setSearchField(field, value);
}
export function setSearchFields(fieldsMap) {
    return basic.setSearchFields(fieldsMap);
}
export function resetSearch() {
    return basic.resetSearch();
}
export function toggleSearchDetails(show) {
    return basic.toggleSearchDetails(show);
}
export function setIsSmallScreen(isSmall) {
    return basic.setIsSmallScreen(isSmall);
}
export function showModal(slug, modalState) {
    return basic.showModal(slug, modalState);
}
export function hideModal() {
    return basic.hideModal();
}
export function toggleMenu(hideMenu) {
    return basic.toggleMenu(hideMenu);
}
export function requestUserAction(finish, message, fields) {
    return basic.requestUserAction(finish, message, fields);
}
export function finishUserAction() {
    return success.requestUserAction();
}

// Reducers
function reduceSetSearchField(state, action) {
    let { field, value } = action;
    return u.updateIn(['search', field], value, state);
}

function reduceSetSearchFields(state, action) {
    return u.updateIn(['search'], action.fieldsMap, state);
}

function reduceToggleSearchDetails(state, action) {
    let { show } = action;
    if (typeof show !== 'boolean') {
        show = !getDisplaySearchDetails(state);
    }
    return u({ displaySearchDetails: show }, state);
}

function reduceResetSearch(state) {
    return u(
        {
            search: initialSearch(),
        },
        state
    );
}

function reduceSendTestEmail(state, action) {
    let { status } = action;

    if (status === SUCCESS || status === FAIL) {
        return u({ sendingTestEmail: false }, state);
    }

    return u({ sendingTestEmail: true }, state);
}

function reduceSendTestNotification(state, action) {
    let { status } = action;

    if (status === SUCCESS || status === FAIL) {
        return u({ sendingTestNotification: false }, state);
    }

    return u({ sendingTestNotification: true }, state);
}

function reduceSetIsSmallScreen(state, action) {
    let { isSmall } = action;
    return u({ isSmallScreen: isSmall }, state);
}

function reduceUpdateModal(state, action) {
    let { slug, modalState } = action;
    return u({ modal: { slug, state: modalState } }, state);
}

function makeHideModalOnSuccess(reducer = null) {
    return (state, action) => {
        let newState = state;
        if (reducer !== null) {
            newState = reducer(state, action);
        }
        if (action.status === SUCCESS) {
            return reduceUpdateModal(newState, { slug: null, modalState: null });
        }
        return newState;
    };
}

const hideModalOnSuccess = makeHideModalOnSuccess();

// Generates the reducer to display or not the spinner.
function makeProcessingReasonReducer(processingReason) {
    return (state, action) => {
        let { status } = action;
        if (status === FAIL || status === SUCCESS) {
            return u({ processingReason: null }, state);
        }
        return u({ processingReason }, state);
    };
}

function reduceToggleMenu(state, action) {
    let { hideMenu } = action;
    if (typeof hideMenu !== 'undefined') {
        return u({ isMenuHidden: hideMenu }, state);
    }
    return u({ isMenuHidden: !isMenuHidden(state) }, state);
}

function setDarkMode(enabled) {
    document.body.classList.toggle('dark', enabled);
}

function setFluidLayout(enabled) {
    document.body.classList.toggle('fluid', enabled);
}

function reduceSetSetting(state, action) {
    switch (action.key) {
        case DARK_MODE: {
            let enabled =
                typeof action.value === 'boolean' ? action.value : action.value === 'true';
            setDarkMode(enabled);
            break;
        }
        case FLUID_LAYOUT: {
            let enabled =
                typeof action.value === 'boolean' ? action.value : action.value === 'true';
            setFluidLayout(enabled);
            break;
        }
        default:
            break;
    }
    return state;
}

function reduceUserAction(state, action) {
    if (action.status === SUCCESS) {
        return u(
            {
                userActionRequested: null,
            },
            state
        );
    }

    return u(
        {
            // Clear the processing reason, in case there was one. The finish()
            // action should reset it.
            processingReason: null,
            userActionRequested: {
                message: action.message,
                fields: action.fields,
                // Since action.finish is a function, and we don't want updeep to
                // call it, wrap it by another function that does nothing.
                finish: () => action.finish,
            },
        },
        state
    );
}

const reducers = {
    IMPORT_INSTANCE: makeProcessingReasonReducer('client.spinner.import'),
    CREATE_ACCESS: makeProcessingReasonReducer('client.spinner.fetch_account'),
    DELETE_ACCESS: makeHideModalOnSuccess(
        makeProcessingReasonReducer('client.spinner.delete_account')
    ),
    DELETE_ACCOUNT: makeHideModalOnSuccess(
        makeProcessingReasonReducer('client.spinner.delete_account')
    ),
    DELETE_ALERT: hideModalOnSuccess,
    DELETE_CATEGORY: hideModalOnSuccess,
    DELETE_OPERATION: hideModalOnSuccess,
    RESET_SEARCH: reduceResetSearch,
    RUN_ACCOUNTS_SYNC: makeProcessingReasonReducer('client.spinner.sync'),
    RUN_BALANCE_RESYNC: makeProcessingReasonReducer('client.spinner.balance_resync'),
    RUN_OPERATIONS_SYNC: makeProcessingReasonReducer('client.spinner.sync'),
    RUN_APPLY_BULKEDIT: makeProcessingReasonReducer('client.spinner.apply'),
    SEND_TEST_EMAIL: reduceSendTestEmail,
    SEND_TEST_NOTIFICATION: reduceSendTestNotification,
    SET_SEARCH_FIELD: reduceSetSearchField,
    SET_SEARCH_FIELDS: reduceSetSearchFields,
    TOGGLE_SEARCH_DETAILS: reduceToggleSearchDetails,
    UPDATE_ACCESS_AND_FETCH: makeProcessingReasonReducer('client.spinner.fetch_account'),
    UPDATE_MODAL: reduceUpdateModal,
    SET_IS_SMALL_SCREEN: reduceSetIsSmallScreen,
    TOGGLE_MENU: reduceToggleMenu,
    ENABLE_DEMO_MODE: makeProcessingReasonReducer('client.demo.enabling'),
    DISABLE_DEMO_MODE: makeProcessingReasonReducer('client.demo.disabling'),
    SET_SETTING: reduceSetSetting,
    REQUEST_USER_ACTION: reduceUserAction,
};

const uiState = u({
    search: {},
    displaySearchDetails: false,
    processingReason: null,
    userActionRequested: null,
    sendingTestEmail: false,
    sendingTestNotification: false,
    isDemoMode: false,
});

export const reducer = createReducerFromMap(uiState, reducers);

// Initial state
function initialSearch() {
    return {
        keywords: [],
        categoryIds: [],
        type: '',
        amountLow: null,
        amountHigh: null,
        dateLow: null,
        dateHigh: null,
    };
}

export function initialState(isDemoEnabled, enabledDarkMode, enabledFluidLayout) {
    let search = initialSearch();

    setDarkMode(enabledDarkMode);
    setFluidLayout(enabledFluidLayout);

    return u(
        {
            search,
            displaySearchDetails: false,
            processingReason: null,
            userActionRequested: null,
            sendingTestEmail: false,
            sendingTestNotification: false,
            isDemoMode: isDemoEnabled,
            isSmallScreen: computeIsSmallScreen(),
            modal: {
                slug: null,
                state: null,
            },
            isMenuHidden: computeIsSmallScreen(),
        },
        {}
    );
}

// Getters
export function getSearchFields(state) {
    return state.search;
}
export function hasSearchFields(state) {
    // Keep in sync with initialSearch();
    let { search } = state;
    return (
        search.keywords.length > 0 ||
        search.categoryIds.length > 0 ||
        search.type !== '' ||
        search.amountLow !== null ||
        search.amountHigh !== null ||
        search.dateLow !== null ||
        search.dateHigh !== null
    );
}

export function getDisplaySearchDetails(state) {
    return state.displaySearchDetails;
}

export function getProcessingReason(state) {
    return state.processingReason;
}

export function userActionRequested(state) {
    return state.userActionRequested;
}

export function isSendingTestEmail(state) {
    return state.sendingTestEmail;
}

export function isSendingTestNotification(state) {
    return state.sendingTestNotification;
}

export function isSmallScreen(state) {
    return state.isSmallScreen;
}

export function getModal(state) {
    return state.modal;
}

export function isMenuHidden(state) {
    return state.isMenuHidden;
}

export function isDemoMode(state) {
    return state.isDemoMode;
}

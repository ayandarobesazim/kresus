// Banks
export const CREATE_ACCESS = 'CREATE_ACCESS';
export const CREATE_ALERT = 'CREATE_ALERT';
export const CREATE_OPERATION = 'CREATE_OPERATION';
export const DELETE_ACCESS = 'DELETE_ACCESS';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ALERT = 'DELETE_ALERT';
export const DELETE_OPERATION = 'DELETE_OPERATION';
export const MERGE_OPERATIONS = 'MERGE_OPERATIONS';
export const REQUEST_USER_ACTION = 'REQUEST_USER_ACTION';
export const RUN_ACCOUNTS_SYNC = 'RUN_ACCOUNTS_SYNC';
export const RUN_BALANCE_RESYNC = 'RUN_BALANCE_RESYNC';
export const RUN_OPERATIONS_SYNC = 'RUN_OPERATIONS_SYNC';
export const RUN_APPLY_BULKEDIT = 'RUN_APPLY_BULKEDIT';
export const SET_OPERATION_CUSTOM_LABEL = 'SET_OPERATION_CUSTOM_LABEL';
export const SET_OPERATION_CATEGORY = 'SET_OPERATION_CATEGORY';
export const SET_OPERATION_TYPE = 'SET_OPERATION_TYPE';
export const SET_OPERATION_BUDGET_DATE = 'SET_OPERATION_BUDGET_DATE';
export const UPDATE_ALERT = 'UPDATE_ALERT';

// UI
export const SET_IS_SMALL_SCREEN = 'SET_IS_SMALL_SCREEN';
export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
export const SET_SEARCH_FIELDS = 'SET_SEARCH_FIELDS';
export const RESET_SEARCH = 'RESET_SEARCH';
export const TOGGLE_SEARCH_DETAILS = 'TOGGLE_SEARCH_DETAILS';
export const UPDATE_MODAL = 'UPDATE_MODAL';
export const TOGGLE_MENU = 'TOGGLE_MENU';

// Categories
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

// Budgets
export const SET_BUDGETS_PERIOD = 'SET_BUDGETS_PERIOD';
export const FETCH_BUDGETS = 'FETCH_BUDGETS';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const RESET_BUDGETS = 'RESET_BUDGETS';

// Instance properties
export const IMPORT_INSTANCE = 'IMPORT_INSTANCE';
export const SEND_TEST_EMAIL = 'SEND_TEST_EMAIL';
export const SEND_TEST_NOTIFICATION = 'SEND_TEST_NOTIFICATION';
export const GET_WEBOOB_VERSION = 'GET_WEBOOB_VERSION';

// Settings
export const SET_DEFAULT_ACCOUNT = 'SET_DEFAULT_ACCOUNT';
export const SET_SETTING = 'SET_SETTING';
export const UPDATE_ACCESS = 'UPDATE_ACCESS';
export const UPDATE_ACCESS_AND_FETCH = 'UPDATE_ACCESS_AND_FETCH';

// Demo
export const ENABLE_DEMO_MODE = 'ENABLE_DEMO_MODE';
export const DISABLE_DEMO_MODE = 'DISABLE_DEMO_MODE';

export type ActionType =
    | typeof CREATE_ACCESS
    | typeof CREATE_ALERT
    | typeof CREATE_OPERATION
    | typeof DELETE_ACCESS
    | typeof DELETE_ACCOUNT
    | typeof UPDATE_ACCOUNT
    | typeof DELETE_ALERT
    | typeof DELETE_OPERATION
    | typeof MERGE_OPERATIONS
    | typeof REQUEST_USER_ACTION
    | typeof RUN_ACCOUNTS_SYNC
    | typeof RUN_BALANCE_RESYNC
    | typeof RUN_OPERATIONS_SYNC
    | typeof RUN_APPLY_BULKEDIT
    | typeof SET_OPERATION_CUSTOM_LABEL
    | typeof SET_OPERATION_CATEGORY
    | typeof SET_OPERATION_TYPE
    | typeof SET_OPERATION_BUDGET_DATE
    | typeof UPDATE_ALERT
    | typeof SET_IS_SMALL_SCREEN
    | typeof SET_SEARCH_FIELD
    | typeof SET_SEARCH_FIELDS
    | typeof RESET_SEARCH
    | typeof TOGGLE_SEARCH_DETAILS
    | typeof UPDATE_MODAL
    | typeof TOGGLE_MENU
    | typeof CREATE_CATEGORY
    | typeof DELETE_CATEGORY
    | typeof UPDATE_CATEGORY
    | typeof SET_BUDGETS_PERIOD
    | typeof FETCH_BUDGETS
    | typeof UPDATE_BUDGET
    | typeof RESET_BUDGETS
    | typeof IMPORT_INSTANCE
    | typeof SEND_TEST_EMAIL
    | typeof SEND_TEST_NOTIFICATION
    | typeof GET_WEBOOB_VERSION
    | typeof SET_DEFAULT_ACCOUNT
    | typeof SET_SETTING
    | typeof UPDATE_ACCESS
    | typeof UPDATE_ACCESS_AND_FETCH
    | typeof ENABLE_DEMO_MODE
    | typeof DISABLE_DEMO_MODE;

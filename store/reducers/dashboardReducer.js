import * as dashboardActions from '../actions/dashboardActions';

const initState = {
    username: '',
    userid: '',
    activeUsers: []
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case dashboardActions.DASHBOARD_SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
            return{
                ...state,
                activeUsers: action.activeUsers
            }
        case dashboardActions.DASHBOARD_SET_USER_ID:
            return{
                ...state,
                userid: action.userid
            }
        default:
            return state;
    }
};

export default reducer;
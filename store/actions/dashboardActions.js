export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD.SET_ACTIVE_USERS';
export const DASHBOARD_SET_USER_ID = 'DASHBOARD.SET_USER_ID';

export const setUserName = (username) => {
    return {
        type: DASHBOARD_SET_USERNAME,
        username
    };
};

export const setActiveUsers = (activeUsers) => {
    return {
        type: DASHBOARD_SET_ACTIVE_USERS,
        activeUsers
    }
};

export const setUserID = (userid) => {
    return {
        type: DASHBOARD_SET_USER_ID,
        userid
    }
}
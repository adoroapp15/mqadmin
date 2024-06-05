const currentUser = (state = {loggedIn:false}, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "SET_USER_ID":
            return {
                ...state,
                userId: action.payload,
                loggedIn: true
            }
        case "SET_USER_CAMPAIGN":
            return {
                ...state,
                campaign: action.payload,
                loggedIn: true
            }
        case "SET_BLOG":
            return {
                ...state,
                blog: action.payload,
                loggedIn: true
            }
        case "SET_ALL_CAMPAIGN":
            return {
                ...state,
                allCampaign : action.payload
            }
        case "LOG_OUT":
            return {
                ...state,
                logout: true,
                loggedIn: false
            }
        case "CAMPAIGN_CREATED":
            return {
                ...state,
                campaignCreated: true,
                loggedIn: true
            }
        case "CURRENT_PAGE":
            return {
                    ...state,
                    currentPage: action.payload,
                    loggedIn: true
            }
        default:
            return state
    }
}

export default currentUser;
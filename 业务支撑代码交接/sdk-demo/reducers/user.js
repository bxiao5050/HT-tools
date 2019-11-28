/**
 * Created by karl.zheng on 2018/4/11.
 */
export default (state={}, action) => {
    switch(action.type){
        case "INIT_USER":
            localStorage.setItem("account", JSON.stringify(action.user));
            return action.user?action.user:{}
        case "INSERT_ACCOUNT":
            localStorage.setItem("account", JSON.stringify(action.account));
            return action.account;
        case "LOGOUT_ACCOUNT":
            localStorage.setItem("account", "");
            return {}
        default:
            return state
    }
}
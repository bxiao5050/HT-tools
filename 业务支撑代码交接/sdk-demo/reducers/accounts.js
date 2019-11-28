/**
 * Created by karl.zheng on 2018/3/20.
 */
export default (state=[], action) => {
    switch (action.type) {
        case "INIT_ACCOUNT":
            return action.accounts;
        case "INSERT_ACCOUNT":
            var users = state.filter((a) => a.userId!=action.account.userId);
            users = [action.account, ...users];
            localStorage.setItem("users", JSON.stringify(users));
            return users;
        case "DELETE_ACCOUNT":
            var users = state.filter(node => node.userId!=action.userId)
            localStorage.setItem("users", JSON.stringify(users));
            return users;

        case "LOGOUT_ACCOUNT":
            var users = state;
            if(users[0]){
                users[0].activeTime = 0;
            }
            localStorage.setItem("users", JSON.stringify(users));
            // console.log(users);
            return users;
        default:
            return state;
    }
}

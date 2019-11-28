/**
 * Created by karl.zheng on 2018/4/2.
 */
export default (state={}, action) => {
    switch (action.type) {
        case "INIT_QUERY":
            return action.query;
        default:
            return state;
    }
}
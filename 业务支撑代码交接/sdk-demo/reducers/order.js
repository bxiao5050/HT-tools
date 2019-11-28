/**
 * Created by karl.zheng on 2018/4/1.
 */
export default (state={}, action) => {
    switch (action.type) {
        case "INIT_ORDER":
            return action.order;
        default:
            return state;
    }
}
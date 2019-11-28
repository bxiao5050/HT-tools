/**
 * Created by karl.zheng on 2018/5/8.
 */
export default (state=[], action) => {
    switch (action.type) {
        case "INIT_LIST":
            return action.orderList;
        default:
            return state;
    }
}
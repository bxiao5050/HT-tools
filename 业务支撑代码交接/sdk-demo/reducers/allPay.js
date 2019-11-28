/**
 * Created by karl.zheng on 2018/4/18.
 */
export default (state=[], action) => {
    switch (action.type) {
        case "INIT_PAYMENTS":
            return action.payments;
        default:
            return state;
    }
}
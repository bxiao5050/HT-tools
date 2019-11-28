/**
 * Created by karl.zheng on 2018/3/31.
 */
export default (state={}, action) => {
    switch (action.type) {
        case "INIT_PAY":
            return action.payments?action.payments:{};
        default:
            return state;
    }
}
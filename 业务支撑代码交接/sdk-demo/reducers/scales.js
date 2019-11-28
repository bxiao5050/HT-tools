/**
 * Created by karl.zheng on 2018/4/1.
 */
export default (state=[], action) => {
    switch (action.type) {
        case "INIT_SCALE":
            return action.scales;
        default:
            return state;
    }
}
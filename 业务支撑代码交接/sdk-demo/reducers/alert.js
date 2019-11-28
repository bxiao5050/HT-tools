/**
 * Created by karl.zheng on 2018/4/11.
 */
export default (state={isShow: false,msg: ""}, action) => {
    switch(action.type){
        case "SHOW_ALERT":
            return {
                isShow: true,
                msg: action.msg
            };
        case "CLOSE_ALERT":
            return {
                isShow: false,
                msg: ""
            };
        default:
            return state
    }
}
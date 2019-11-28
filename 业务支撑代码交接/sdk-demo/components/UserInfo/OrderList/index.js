/**
 * Created by karl.zheng on 2018/5/8.
 */
import React from 'react'
import {connect} from 'react-redux'
import {orderList} from '../../../config/requires'
import {initList} from '../../../actions'
require('./index.css')

class OrderList extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        orderList().then((res) => {
            console.log(res);
           if(res.code==200){
               this.props.initList(res.data);
           }else{
               console.log("get list fail");
           }
        });
    }

    render(){
        return (
            <div className="order-list">
                {
                    this.props.orderList.map((node, index) => (
                        <div className="order" key={index}>
                            <div className="order-line">
                                <p className="order-blue">Số tiền nạp</p>
                                <p>{node.amount +' '+ node.currency}</p>
                            </div>
                            <div className="order-line">
                                <p className="order-blue">Cách thức nạp</p>
                                <p>{node.channel!=0&&node.channel!=1?"Nhà phát hành":"Nạp thẻ"}</p>
                            </div>
                            <div className="order-line">
                                <p className="order-blue">Mã đơn hàng</p>
                                <p>{node.transactionId}</p>
                            </div>
                            <div className="order-line order-result">
                                <p className="order-red">Tình trạng nạp</p>
                                <p>{node.status==200?"Thành công":"Thất bại"}</p>
                                <p className="order-time">{node.clientDate}</p>
                            </div>
                            <div className={node.status==200?"order-status":"order-status red"}></div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orderList: state.orderList
})

const mapDispatchToProps = (dispatch) => ({
    initList: (list)=>{
        dispatch(initList(list))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList)
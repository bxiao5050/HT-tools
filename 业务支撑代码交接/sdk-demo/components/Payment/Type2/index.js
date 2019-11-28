/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay,payPoint} from '../../../config/requires'
// import assign from 'core-js/library/fn/object/assign'

require('./index.css')

class Type2 extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign(this.props.location.state, {PIN: ""});
        this.change = this.change.bind(this);
        this.pay = this.pay.bind(this);
    }

    pay(){
        var payment = this.state;
        loadPay(payment).then((res) => {
            // res = '{"data":{"returnInfo":{"url":"https://sandbox-global.mol.com/PaymentWall/Checkout/index?token\u003dqipDtsNLDSLep546VRLfQobeO5dFAz3nlnFRL7l4aR3ibDY7t5uCqrBPJkExHAPz56D6kL%2fYc0Qhae15S1BA3oBX988ct73pQ2Q5QXMw488YomzWXo8As2nRDno78ek8fg669mG9ZO9oSD%2fpsqAouMoPnb3890DM%2ffxL%2f6qCRfErSk0zplTp7s2Oa3%2byC90Fk%2fmvjZJrE2tY0NoCekh7Qfdxvr3bT8s38%2fABASZLaHLcNFuvXXOWzZE%2fsud34cnV2NbTTRf7I9C9wxUyG2amQonKf5eZCAJgNIqzGcCy7hKhiNP0ENM%2bWRxBZh9m7Lup5cVQLvl%2fb4KM1nJsSXKzN6MOgxV34dKCWxA3UJjDdrUC%2bO8hf%2bSE5256u7K9UMH87X3mybB3%2fJQkLv4URdZyarNFRp7WiogAoZfeRYS4Bco%3d"},"transactionId":"V4_10107_XJ1522570983869","money":"3.99","currency":"USD"},"code":200,"error_msg":"success"}';
            // res = JSON.parse(res);
            if(res.code==200){
                // alert("pay success");
                payPoint();
            }else{
                console.log("load order fail");
            }
        });
    }

    change(e){
        this.setState({
            PIN: e.target.value
        })
    }

    render(){
        return (
            <div className="payment-nav">
                <h2 className="name">
                    {this.state.name}
                    <span className="exchange">Exchange rate</span>
                </h2>

                <img className="card-head" src={this.state.codeImg}/>

                <div className="card-inputs PIN" >
                    <span>PIN: </span>
                    <input placeholder="Please enter PIN" value={this.state.PIN} id="pin" onChange={this.change}/>
                </div>

                <a href="javascript:void(0);" className="btn-pay" onClick={this.pay}>Payment</a>
            </div>
        )
    }
}

Type2.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Type2;

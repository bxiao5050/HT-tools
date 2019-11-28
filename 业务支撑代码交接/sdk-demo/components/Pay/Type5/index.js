/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay,payPoint,getSource} from '../../../config/requires'
require('./index.css')

class Type2 extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.location.state;
        this.change = this.change.bind(this);
        this.pay = this.pay.bind(this);
    }

    change(value){
        for(var i = 0; i < this.state.products.length; i++){
            if(this.state.products[i].amount == value){
                this.setState({
                    selectedProduct:  this.state.products[i]
                })
            }
        }
    }

    pay(){
        var payment = this.state;
        var _this = this;
        loadPay(payment).then((res) => {
            // res = '{"data":{"returnInfo":{"url":"https://sandbox-global.mol.com/PaymentWall/Checkout/index?token\u003dqipDtsNLDSLep546VRLfQobeO5dFAz3nlnFRL7l4aR3ibDY7t5uCqrBPJkExHAPz56D6kL%2fYc0Qhae15S1BA3oBX988ct73pQ2Q5QXMw488YomzWXo8As2nRDno78ek8fg669mG9ZO9oSD%2fpsqAouMoPnb3890DM%2ffxL%2f6qCRfErSk0zplTp7s2Oa3%2byC90Fk%2fmvjZJrE2tY0NoCekh7Qfdxvr3bT8s38%2fABASZLaHLcNFuvXXOWzZE%2fsud34cnV2NbTTRf7I9C9wxUyG2amQonKf5eZCAJgNIqzGcCy7hKhiNP0ENM%2bWRxBZh9m7Lup5cVQLvl%2fb4KM1nJsSXKzN6MOgxV34dKCWxA3UJjDdrUC%2bO8hf%2bSE5256u7K9UMH87X3mybB3%2fJQkLv4URdZyarNFRp7WiogAoZfeRYS4Bco%3d"},"transactionId":"V4_10107_XJ1522570983869","money":"3.99","currency":"USD"},"code":200,"error_msg":"success"}';
            // res = JSON.parse(res);
            if(res.code==200){
                // alert("pay success");
                payPoint();
                if(res.data.returnInfo.url){
                    var url = res.data.returnInfo.url;
                    var source = getSource();
                    if(_this.state.name=="SMS" && source ==3){
                        var temp = url.split("?")[1];
                        url = "http://vn.webpay.bluepay.tech/bluepay/qr.php?"+temp;
                        setTimeout(function(){
                            _this.context.router.push('/');
                        }, 6000)
                    }
                    var path = {
                        pathname: '/pay/type0',
                        state: {
                            url: url
                        }
                    }
                    this.context.router.push(path);
                }else{
                    console.log("get url fail");
                }
            }else{
                console.log("load order fail");
            }
        });
    }

    render(){
        let select;
        return (
            <div className="payment">
                <h2>{this.state.name}</h2>
                <div className="product">
                    <p className="tip">Sản phẩm</p>
                    <select className="productions" value={this.state.selectedProduct.amount} ref={node => {select = node}} onChange={() => {this.change(select.value)}}>
                        {
                            this.state.products.map((key, index) => (
                                    <option key={index} value={key.amount}>{key.gameCoin + key.gameCurrency}</option>
                                ))
                            }
                        }
                    </select>
                    <a href="javascript:void(0);" className="icon-down">
                    </a>
                </div>
                <div className="result">
                    <span>Cần trả: </span>
                    <p>{this.state.selectedProduct.shortCurrency+' '+this.state.selectedProduct.amount}</p>
                </div>
                <a href="javascript:void(0);" className="buy-goods" onClick={this.pay}>Mua KNB</a>
            </div>
        )
    }
}

Type2.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Type2;

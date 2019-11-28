/**
 * Created by karl.zheng on 2018/3/26.
 */
import React from 'react'
import {getPay,salert} from '../../config/requires'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {initPay, initOrder} from '../../actions'
import Scale from './Scale'
require('./index.css')

class Pay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            isActive: 0,
            payments: [],
        };

        this.change = this.change.bind(this);
        this.close = this.close.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount(){
        // this.props.initOrder(this.props.query);
        if(this.props.order.gameOrderId){
            getPay().then((res) => {
                if(res.code == 200){
                    let index = 0;
                    this.setState({
                        list: res.payments.map(key => ({
                            id: index++,
                            value: key.name
                        })),
                        payments: res.payments
                    });

                    if(res.payments[0]){
                        this.props.initPay(res.payments[0]);
                        this.intoPay(res.payments[0]);
                    }
                }else{
                    salert("init pay fail");
                }
            })
        }else{
            this.context.router.push('/');
        }

    }

    intoPay(payments){
        if(payments.name == "SMS"){
            payments.showMethod = 5;
        }
        var path = {
            pathname: '/pay/type'+payments.showMethod,
            state: payments
        }
        this.context.router.push(path);
    }

    change(e){
        var index = e.target.dataset.id;
        this.setState({
            isActive: index
        })
        this.props.initPay(this.state.payments[index]);
        this.intoPay(this.state.payments[index]);
    }

    close(){
        // window.location.href=this.props.query.redirect_uri;
        this.context.router.push('/');
    }

    back(){
        this.context.router.goBack();
    }

    render(){
        return (
            <div className="pay">
                <div className="wrap"></div>

                <div className="wrap-pay">
                    <div className="pay-header">
                        <a href="javascript:void(0);" onClick={this.back} className="back">
                        </a>
                        <h2>Trung tâm nạp</h2>
                        <a href="javascript:void(0);" onClick={this.close} className="close">
                        </a>
                    </div>

                    <div className="list-payment">
                        <ul>
                            {
                                this.state.list.map((node) => (
                                    <li key={node.id} data-id={node.id} className={this.state.isActive==node.id?"active":""}
                                        onClick={(e) => this.change(e)}>
                                        {node.value}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="pay-content">
                        {this.props.children}
                    </div>
                </div>

                <Scale />
            </div>
        );
    }
}

Pay.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    payments: state.payments,
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
    initPay: (payments) => {
        dispatch(initPay(payments));
    },
    initOrder: (order) => {
        dispatch(initOrder(order));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pay)

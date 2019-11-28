/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {loadPay} from '../../../config/requires'
require('./index.css')

class Type4 extends React.Component{
    constructor(props){
        super(props);
        this.state = this.props.location.state;
        this.choseType = this.choseType.bind(this);
    }

    choseType(node){
        var path = {
            pathname: '/pay/type'+node.showMethod,
            state: node
        }
        this.context.router.push(path);
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.location.state)
    }

    render(){
        return (
            <div className="payment">
                <h2 className="name">{this.state.name}</h2>
                <ul className="cards">
                    {
                        this.state.nodes.map((node, index) => (
                            <li key={index} data-id={index} onClick={() => {this.choseType(node)}}>
                                <img src={node.codeImg} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

Type4.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    payments: state.payments
});

export default connect(
    mapStateToProps,
    {}
)(Type4);

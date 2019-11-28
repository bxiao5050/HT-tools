/**
 * Created by karl.zheng on 2018/4/11.
 */
import React from 'react';
import {connect} from "react-redux"
import {closeAlert, logout} from '../../../actions'
require('./index.css');

class AlertBox extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    logout(){
        this.props.close();
        this.props.logout();
    }

    cancel(){
        this.props.close();
    }

    render(){
        return (
            <div className={"box-alert "+(this.props.showAlert.isShow ? "active": "")}>
                <div className="wrap"></div>
                <div className="alert">
                    <p>{this.props.showAlert.msg}</p>
                    <button className="sure" onClick={this.logout}>Xác nhận</button>
                    <button className="cancel" onClick={this.cancel}>Hủy</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    showAlert: state.alert
})

const mapDispatchToProps = (dispatch) => ({
    close: () => {
        dispatch(closeAlert());
    },
    logout: () => {
        dispatch(logout());
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertBox);



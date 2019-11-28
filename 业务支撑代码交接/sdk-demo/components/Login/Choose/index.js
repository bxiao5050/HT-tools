/**
 * Created by karl.zheng on 2018/3/13.
 */
import React from 'react'
import {connect} from 'react-redux'
import {insertAccount, deleteAccount} from '../../../actions'
import {fbInit, fbLogin, reqRegister, AutoLogin} from '../../../config/requires'
import md5 from '../../../config/md5'
import {server} from '../../../config/index'
import {Link} from 'react-router'
import 'whatwg-fetch'
require('./index.css')

class Choose extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          showList: false
        };

        this.showAccounts = this.showAccounts.bind(this);
    }

    componentWillMount(){
        fbInit();
    }

    register(){
        var password = Math.floor(Math.random()*100000000);
        var params = {
            userName: "",
            password: md5(password),
            appId: server.appId,
            accountType: 0,
            thirdPartyId: "",
            email: "",
            telephone: '',
            userChannel: 0,
            exInfo: ""
        };
        reqRegister(params);
    }

    showAccounts(){
        var temp = !this.state.showList;
        this.setState({
            showList: temp
        })
    }

    getAccountType(type){
        switch (type){
            case 0:
                return "guest";
            case 1:
                return "sdk";
            case 2:
                return "fb";
            default:
                return "";
        }
    }

    render(){
        return (
            <div className="content win-login win-choose">
                <h2 className="logo block">IPOCKET GAMES</h2>
                <div className="box-input">
                    <div className="line-input username"  onClick={this.showAccounts}>
                        <div className="icon"></div>
                        <p className="choose">Đổi tài khoản</p>
                        <div className={"icon-close "+(this.state.closeUser?"active":"")} onClick={this.clearUser}></div>
                        <div className="icon-down"></div>
                        <div className={"accounts " + (this.state.showList?"active":"")}>
                            <ul className={"list-account "+ (this.state.showList?"active":"")}>
                                {
                                    this.props.users.map(node => (
                                        <li key={node.userId}>
                                            <p onClick={() => {AutoLogin(node); this.showAccounts();}}>{this.getAccountType(node.accountType) + ' : ' + node.userName}</p>
                                            <div className="icon-close" onClick={() => {this.props.deleteUser(node.userId)}}></div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <a href="javascript:void(0);" className="btn-fb" onClick={fbLogin}>
                    <span className="icon-fb " />
                    <span>Đăng nhập Facebook</span>
                </a>
                <div className="line">
                    <div className="line-left"></div>
                    <div className="line-right"></div>
                </div>
                <div className="box">
                    <Link  className="btn-login" to="/login/account">
                        <span className="icon-login" />
                        <span className="name">Đăng nhập</span>
                    </Link>
                    <div className="line-bot" />
                    <Link  className="btn-register" to="/login/register">
                        <span className="icon icon-register" />
                        <span className="name">Đăng ký</span>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.accounts
});

const mapDispatchToProps = (dispatch) => ({
    insertUser: (data) => {
        dispatch(insertAccount(data));
    },
    deleteUser: (account) => {
        dispatch(deleteAccount(account));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Choose);


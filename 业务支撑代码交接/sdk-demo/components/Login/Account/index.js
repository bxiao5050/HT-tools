/**
 * Created by karl.zheng on 2018/3/13.
 */
import React from 'react'
import {reqLogin, AutoLogin} from '../../../config/requires'
import {connect} from 'react-redux'
import { insertAccount, deleteAccount, topAccount} from '../../../actions'
import md5 from '../../../config/md5'
import {Link} from 'react-router'
require('./index.css')

class Account extends React.Component{
    constructor(){
        super();
        this.state = {
            showList: false,
            closeUser: false,
            closePass: false,
            userName: "",
            password: "",
            timer: ""
        };

        [   "showAccounts",
            "onChange",
            "clearUser",
            "clearPassword",
            "blurInput",
            "focusInput"
        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    Login(username, password){
        password = md5(password);
        reqLogin(username,password);
    }

    showAccounts(){
        var temp = !this.state.showList;
        this.setState({
            showList: temp
        })
    }

    onChange(e){
        if(e.target.id == "username"){
            var userName = e.target.value;
            this.setState({
                userName: userName,
                closeUser: (userName.length > 0)
            })

            this.setState({
                showList: !(userName.length > 0)
            })
        }else if(e.target.id=="password"){
            var password = e.target.value;
            this.setState({
                password: password,
                closePass: (password.length > 0)
            })
        }
    }

    clearUser(){
        this.setState({
            userName: "",
            closeUser: false
        })
    }

    clearPassword(){
        this.setState({
            password: "",
            closePass: false
        })
    }

    blurInput(name){
        var _this = this;
        this.setState({
            timer: setTimeout(function(){
                if(name == "userName"){
                    _this.setState({
                        closeUser: false
                    })
                }else{
                    _this.setState({
                        closePass: false
                    })
                }
            }, 100)
        })
    }

    focusInput(name){
        if(name == "userName"&&this.state.userName.length > 0){
            this.setState({
                closeUser: true
            })
        }else if(name == "password"&&this.state.password.length > 0){
            this.setState({
                closePass: true
            })
        }
    }

    componentWillUnmount(){
        clearTimeout(this.state.timer);
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
        let username, password;
        return (
            <div className="content win-account">
                <div className="header">
                    <div className="icon-head"></div>
                </div>
                <div className="box-input">
                    <div className="line-input username">
                        <div className="icon"></div>
                        <input type="text" placeholder="Nhập tài khoản" ref={node => username = node}
                               value={this.state.userName} onChange={(e) =>this.onChange(e)} id="username"
                               onBlur={() => this.blurInput("userName")} onFocus={() => this.focusInput("userName")}
                               onClick={this.showAccounts}
                        />
                        <div className={"icon-close "+(this.state.closeUser?"active":"")} onClick={this.clearUser}></div>
                        <div className="icon-down" onClick={this.showAccounts}></div>
                        <div className="accounts">
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
                    <div className="line-input password">
                        <div className="icon"></div>
                        <input type="password" placeholder="Nhập mật khẩu" ref={node => password = node}
                            value={this.state.password} onChange={(e) =>this.onChange(e)} id="password"
                            onBlur={() => this.blurInput("password")} onFocus={() => this.focusInput("password")}/>
                        <div className={"icon-close "+(this.state.closePass?"active":"")} onClick={this.clearPassword}></div>
                        <a href="javascript:void(0);" className="forget"></a>
                    </div>
                </div>
                <a href="javascript:void(0);" className="btn-login" onClick={()=>this.Login(username.value, password.value)}>Login</a>
                <div className="box-link">
                    <Link to="/login/main" className="link-change">&lt;&lt; Đổi tài khoản</Link>
                    <Link to="/login/register" className="link-register">Đăng ký &gt;&gt;</Link>
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
)(Account);

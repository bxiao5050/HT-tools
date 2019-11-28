/**
 * Created by karl.zheng on 2018/3/14.
 */
/**
 * Created by karl.zheng on 2018/3/13.
 */
import React from 'react'
import {reqRegister, salert} from '../../../config/requires'
import {server} from '../../../config/index'
require('./index.css')

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showPass: false,
            userName: "",
            password1: "",
            password2: "",
            closeUser: false,
            closePass1: false,
            closePass2: false,
            timer: ""
        };

        [   "changeType",
            "onChange",
            "clearUser",
            "clearPass1",
            "clearPass2",
            "blurInput",
            "focusInput",
            "close"
        ].forEach(func => {
            this[func] = this[func].bind(this)
        });
    }

    changeType(){
        var temp = !this.state.showPass;
        this.setState({
            showPass: temp
        })
    }

    onChange(e){
        switch (e.target.id){
            case "userName":
                var userName = e.target.value;
                this.setState({
                    userName: userName,
                    closeUser: (userName.length > 0)
                });
                break;
            case "password1":
                var password1 = e.target.value;
                this.setState({
                    password1: password1,
                    closePass1: (password1.length > 0)
                });
                break;
            case "password2":
                var password2 = e.target.value;
                this.setState({
                    password2: password2,
                    closePass2: (password2.length > 0)
                });
                break;
            default:
                break;
        }
    }

    clearUser(){
        this.setState({
            userName: "",
            closeUser: false
        });
    }

    clearPass1(){
        this.setState({
            password1: "",
            closePass1: false
        });
    }

    clearPass2(){
        this.setState({
            password2: "",
            closePass2: false
        });
    }

    blurInput(id){
        var _this = this;
        this.setState({
            timer:  setTimeout(function(){
                switch (id){
                    case "userName":
                        _this.setState({
                            closeUser: false
                        });
                        break;
                    case "password1":
                        _this.setState({
                            closePass1: false
                        });
                        break;
                    case "password2":
                        _this.setState({
                            closePass2: false
                        });
                        break;
                    default:
                        break;
                }
            }, 100)
        })
    }

    focusInput(id){
        if(id == "userName"&&this.state.userName.length > 0){
            this.setState({
                closeUser: true
            })
        }else if(id == "password1"&&this.state.password1.length > 0){
            this.setState({
                closePass1: true
            })
        }else if(id == "password2"&&this.state.password2.length > 0){
            this.setState({
                closePass2: true
            })
        }
    }

    register(userName, password1, password2){
        if(password1 != password2){
            salert("Mật khẩu trước và sau không khớp");
        }else if(password1.length < 6 || password1.length > 20){
            salert("Quy cách mật khẩu không đúng");
        }else{
            var params = {
                userName: userName,
                password: password1,
                appId: server.appId,
                accountType: 1,
                thirdPartyId: "",
                email: "",
                telephone: '',
                userChannel: 0,
                exInfo: ""
            };
            reqRegister(params);
        }
    }

    componentWillUnmount(){
        clearTimeout(this.state.timer);
    }

    close(){
        // window.location.href=this.props.query.redirect_uri;
        this.context.router.goBack();
    }

    render(){
        let username, password1, password2;

        return (
            <div className="content win-register">
                <div className="header">
                    <div className="icon-head"></div>
                    <a href="javascript:void(0);" onClick={this.close} className="close">
                    </a>
                </div>
                <div className="box-input">
                    <div className="line-input username" onBlur={() => this.blurInput("userName")} onFocus={() => this.focusInput("userName")} >
                        <div className="icon"></div>
                        <input type="text" placeholder="Please enter your account" value={this.state.userName}
                               ref = {node => {username = node}} onChange={(e) =>this.onChange(e)} id="userName"/>
                        <div className={"icon-close "+(this.state.closeUser?"active":"")}  onClick={this.clearUser}></div>
                    </div>
                    <div className="line-input password one" >
                        <div className="icon"></div>
                        <input type={this.state.showPass?"text":"password"} placeholder="Please enter your password(6-20)"
                               value={this.state.password1} id="password1"
                               ref = {node => {password1 = node}} onChange={(e) =>this.onChange(e)}
                               onBlur={() => this.blurInput("password1")} onFocus={() => this.focusInput("password1")}/>
                        <div className={"icon-close "+(this.state.closePass1?"active":"")} onClick={() => this.clearPass1()}></div>
                    </div>
                    <div className="line-input password" >
                        <div className="icon"></div>
                        <input type={this.state.showPass?"text":"password"} placeholder="Please enter your password"
                               value={this.state.password2}
                               ref = {node => {password2 = node}} onChange={(e) =>this.onChange(e)} id="password2"
                               onBlur={() => this.blurInput("password2")} onFocus={() => this.focusInput("password2")}/>
                        <div className={"icon-close "+(this.state.closePass2?"active":"")} onClick={() => this.clearPass2()}></div>
                    </div>
                </div>

                <div className="check" onClick={this.changeType}>
                    <div className={"checkbox " + (this.state.showPass?"active":"")}></div>
                    <p>Xem mật khẩu</p>
                </div>
                <a href="javascript:void(0);" className="btn-register" onClick={() => this.register(username.value, password1.value, password2.value)}>Đăng ký</a>
            </div>
        )
    }
}

Register.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Register;

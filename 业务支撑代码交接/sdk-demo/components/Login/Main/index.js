/**
 * Created by karl.zheng on 2018/3/13.
 */
import React from 'react'
import {changeWin} from '../../../actions'
import {fbInit, fbLogin, reqRegister} from '../../../config/requires'
import md5 from '../../../config/md5'
import {server} from '../../../config/index'
import {Link} from 'react-router'
import 'whatwg-fetch'
require('./index.css')

class Main extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
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

    render(){
        return (
            <div className="content win-login">
                <h2 className="logo block">POCKET GAMES</h2>
                <a href="javascript:void(0);" className="btn-guest" onClick={this.register}>&gt;&gt;&gt; Đăng nhập khách &lt;&lt;&lt;</a>
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

export default Main;


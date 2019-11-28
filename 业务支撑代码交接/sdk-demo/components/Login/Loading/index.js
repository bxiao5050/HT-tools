/**
 * Created by karl.zheng on 2018/3/21.
 */
import React from 'react';
import { connect } from 'react-redux';
import { api } from '../../../config/index'
require('./index.css')

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clock: '',
        };
        this.unclock = this.unclock.bind(this);
    }

    componentDidMount() {
        let _this = this;
        this.setState({
            clock: setTimeout(function () {
                var browser = {
                    versions: function () {
                        var u = navigator.userAgent;
                        return {
                            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                            iPad: u.indexOf('iPad') > -1,
                            android: u.indexOf('Android') > -1
                        };
                    }(),
                };

                let paramsArray = [];
                let params = {
                    userId: _this.props.account.userId,
                    userName: _this.props.account.userName,
                    token: _this.props.account.token,
                    // debugger: 1,
                    ch: 'bookmark'
                    // activeTime: _this.props.account.activeTime,
                    // accountType: _this.props.account.accountType
                };
                // if(browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
                //     params.ch = "IOS";
                // } else if(browser.versions.android){
                //     params.ch = "Android";
                // } else {
                //     params.ch = "PC";
                // }

                var link = window.location.href;
                var temp = link.split(/[?#]/)[1];
                var data = {};
                if (temp) {
                    temp = temp.split("&");
                    temp.map(function (key) {
                        let str = key.split('=');
                        data[str[0]] = str[1];
                    });
                }

                var linkParam = JSON.parse(localStorage.getItem("linkParam"));
                // if(linkParam && link.length < 0){
                params = Object.assign(params, linkParam, data);
                // }

                Object.keys(params).forEach(key => {
                    if (key != "code") {
                        paramsArray.push(key + '=' + params[key])
                    }
                });
                // if(link.length > 1){
                //     link += "&"+ paramsArray.join('&');
                // }else{
                //     link += "?"+paramsArray.join('&');
                // }
                let url = api.redirect_uri + "?" + paramsArray.join('&');
                // console.log(url);
                if (params.userId && params.token) {
                    window.location.href = url;
                }
            }, 2000)
        });
    }

    componentWillUnmount() {
        this.unclock();
    }

    unclock() {
        clearTimeout(this.state.clock);
    }

    render() {
        return (
            <div className="content win-loading">
                <h2 className="logo block">IPOCKET GAMES</h2>
                <div className="info">
                    <p>Tài khoản:  <span>{this.props.account.userName}</span></p>
                    <p>Mật khẩu: <span>{(this.props.account.password ? this.props.account.password.substring(0, 10) : "") + '...'}</span></p>
                </div>
                <div className="loading">Đang đăng nhập</div>
                <div className="line"></div>
                <a href="javascript:void(0);" className="change" onClick={() => {
                    this.unclock();
                    this.context.router.push('/login/choose');
                }}>
                    <span className="switch">
                    </span>
                    <span>Đổi tài khoản</span>
                </a>
            </div>
        )
    }
}

Loading.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    account: state.user,
    query: state.query
})

const mapDispatchToProps = (dispatch) => ({
    change: (win) => {
        dispatch(changeWin(win));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading)

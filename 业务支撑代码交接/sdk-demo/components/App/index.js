/**
 * Created by karl.zheng on 2018/2/28.
 */
import React from 'react'
import { connect } from 'react-redux'
import { initAccounts, initUser } from '../../actions'
import FloatBall from './FloatBall'
import Dragger from './Dragger'
import AlertBox from './AlertBox'
import { winResize, resizefn, setUser, checkToken } from '../../config/requires'
import { api } from '../../config/index'
require('./index.css')

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            direct: "right"
        };
        // this.loadWin = this.loadWin.bind(this);
        this.onDrag = this.onDrag.bind(this);

    }

    componentWillMount() {

        /**
         * 添加debugger模式
         */
        if (~location.href.indexOf('debbuger')) {
            var js = document.createElement('script')
            js.src = "https://sdk-sg.pocketgamesol.com/jssdk/vconsole.min.js"
            js.onload = () => {
                new window.VConsole();
            }
            document.head.appendChild(js)
        }

        /**
         * 适配
         * */
        winResize();
        resizefn();

        let link = window.location.href.split(/[?#]/)[1];
        let params = link.split("&");
        let data = {};
        params.map(key => {
            let str = key.split('=');
            data[str[0]] = str[1];
        });

        if (data.code) {
            checkToken(data.code);
        } else {
            localStorage.setItem("linkParam", JSON.stringify(data));
        }

        var account = localStorage.account ? JSON.parse(localStorage.account) : {};
        if (data.token && data.token != "undefined" && account.token == data.token) {
            window.location = api.direct_uri;
        }

        if ((!data.token || data.token == "undefined") && window.location.href.indexOf(api.redirect_uri) > -1) {
            console.log("into undefined");
            window.location = api.login_uri;
        }

        let users = localStorage.users ? JSON.parse(localStorage.users) : [];
        let user = data.userId ? data : {};
        this.props.initUsers(users);
        this.props.initAccount(user);
        setUser(data.userId);
    }

    onDrag(e, x, y) {
        this.setState({
            x: x,
            y: y,
        })
    }

    render() {
        return (
            <div className="container">
                <div>
                    <Dragger style={{ x: 0, y: 200 }} onDrag={this.onDrag}>
                        <FloatBall />
                    </Dragger>
                </div>
                <AlertBox />

                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accounts,
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    initUsers: (users) => {
        dispatch(initAccounts(users));
    },
    initAccount: (account) => {
        dispatch(initUser(account))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

// const mapStateToProps = (state) => ({
//     win: state.win,
//     accounts: state.accounts
// })
//
// const mapDispatchToProps = (dispatch) => ({
//     initUsers: (users) => {
//         dispatch(initAccounts(users));
//     }
// })
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App);




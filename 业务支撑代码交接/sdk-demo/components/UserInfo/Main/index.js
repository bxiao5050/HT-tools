/**
 * Created by karl.zheng on 2018/4/9.
 */
import { server } from '../../../config/index'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { api } from '../../../config/index'
require('./index.css');

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var linkParam = JSON.parse(localStorage.getItem("linkParam"));
        return (
            <div className="info-main">
                <div className="info-account">
                    <div className="info-head"></div>
                    <div className="info-msg">
                        <p className="info-name">Account: {this.props.account.userName}</p>
                        <p className="info-id">
                            <span>UDID: {this.props.account.userId}</span>
                            {/*<span className="copy">Copy</span>*/}
                        </p>
                        <Link className="pay-his" to="/info/orders">Payment History</Link>
                    </div>
                </div>
                <div className="others">
                    <Link className="item-other" to="/info/pass">
                        <img src={require("../../../images/ui_setting.png")} />
                        <p>Change Password</p>
                        <img src={require("../../../images/ui_right_arrow.png")} className="right" />
                    </Link>
                    <Link className="item-other setting" >
                        <img src={require("../../../images/ui_email.png")} />
                        <p>Security Setting</p>
                        <img src={require("../../../images/ui_right_arrow.png")} className="right" />
                    </Link>
                    <a className="item-other" onClick={() => {
                        // alert(`${api.login_uri}?type=change&ch=${linkParam.ch}&advChannel=${linkParam.advChannel ? linkParam.advChannel : server.advChannel}`)
                        location.href = `${api.login_uri}?type=change&ch=${linkParam.ch}&advChannel=${linkParam.advChannel ? linkParam.advChannel : server.advChannel}`
                    }}>
                        <img src={require("../../../images/ui_switch_account.png")} />
                        <p>Change Account</p>
                        <img src={require("../../../images/ui_right_arrow.png")} className="right" />
                    </a>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    account: state.user
});

export default connect(
    mapStateToProps,
    {}
)(Main);



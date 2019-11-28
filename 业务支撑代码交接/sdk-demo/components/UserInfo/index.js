/**
 * Created by karl.zheng on 2018/4/9.
 */
import React from 'react'
import {Link} from 'react-router'
require('./index.css');

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.back = this.back.bind(this);
    }

    close(){
        this.context.router.push('/');
    }

    back(){
        this.context.router.goBack();
    }

    render(){
        return (
            <div className="userInfo">
                <div className="wrap"></div>

                <div className="wrap-info">
                    <div className="info-header">
                        <a href="javascript:void(0);" onClick={this.back} className="back">
                        </a>
                        <h2>Account</h2>
                        <a href="javascript:void(0);" onClick={this.close} className="close">
                        </a>
                    </div>

                    <div className="info-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

UserInfo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default UserInfo;



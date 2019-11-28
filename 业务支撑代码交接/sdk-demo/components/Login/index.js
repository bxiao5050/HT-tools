/**
 * Created by karl.zheng on 2018/3/31.
 */
import React from 'react'
import {Link} from 'react-router'
import {AutoLogin} from '../../config/requires'
import {connect} from 'react-redux'
import {initAccounts} from '../../actions'
require('./index.css')

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {error: false};
    }

    componentWillMount(){
        let users = localStorage.users?JSON.parse(localStorage.users):[];
        let links = window.location.href;
        if(users.length > 0 ){
            if(links.indexOf("type=change")>0){
                this.context.router.push('/login/choose');
            }else{
                AutoLogin(users[0]);
                // this.context.router.push('/login/loading');
            }
        }else{
            this.context.router.push('/login/main');
        }
    }

    render(){
        return (
            <div className="login">
                {/*<Link to="/"><div className="wrap"></div></Link>*/}
                <div className="wrap"></div>
                {this.props.children}
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    users: state.accounts
})

export default connect(
    mapStateToProps,
    {}
)(Login)
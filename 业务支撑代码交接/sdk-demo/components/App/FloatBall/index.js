/**
 * Created by karl.zheng on 2018/4/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {messager} from '../../../config/requires'

require('./index.css')

class FloatBall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flag: false,
            x: 0,
            y: 0
        };

        this.switchMenu = this.switchMenu.bind(this);
    }

    switchMenu(){
        var temp = !this.state.flag
        this.setState({
            flag: temp
        })
    }

    judge(){
        // var active = new Date().getTime();
        // active -= 1800000;
        return  (this.props.user.userId)
    }

    render(){
        return (
            <div className={"floatBall "+(this.judge()?"active":"")} onClick={this.switchMenu}>
                <div className="ball" ></div>
                <div className={"menu "+(this.state.flag&&this.judge()?"active ":"")}>
                    <Link className="icon-account" to="/info/main">
                    </Link>
                    <a className="icon-cs" onClick={messager}>
                    </a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(
    mapStateToProps,
    {}
)(FloatBall);
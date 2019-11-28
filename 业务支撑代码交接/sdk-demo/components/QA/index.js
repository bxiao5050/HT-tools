/**
 * Created by karl.zheng on 2018/4/10.
 */
import React from 'react'
import {Link} from 'react-router'
require('./index.css');

class QA extends React.Component{
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
                        <h2>Customer Service</h2>
                        <a href="javascript:void(0);" onClick={this.close} className="close">
                        </a>
                    </div>

                    <div className="info-content">
                        <ul className="qa-head">
                           <li>
                               <p>Q&A</p>
                           </li>
                        </ul>
                        <div className="box-qa">
                            <div className="qa-left">
                                <p>Q&A type</p>
                                <ul>

                                </ul>
                            </div>
                            <div className="qa-right">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

QA.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default QA;
/**
 * Created by karl.zheng on 2018/4/1.
 */
import React from 'react'
import {connect} from 'react-redux'
require('./index.css')

class Scale extends React.Component{
    render(){
        return (
            <div className="scale-box">
                <div className="scale-list">
                    <ul>
                        {
                            this.props.scales.map((key) => (
                                <li>{key.gameCoin + ' ' + key.gameCurrency + ' = '+ key.amount + ' ' + key.currency}</li>
                            ))
                        }
                    </ul>
                    <a href="javascript:void(0);" className="scale-close">close</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    scales: state.scales
})

export default connect(
    mapStateToProps,
    {}
)(Scale)


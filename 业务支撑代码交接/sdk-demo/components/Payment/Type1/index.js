/**
 * Created by karl.zheng on 2018/3/29.
 */
import React from 'react'
import { loadPay, payPoint, salert } from '../../../config/requires'
require('./index.css')

class Type1 extends React.Component {
	constructor(props) {
		super(props);
		this.pay = this.pay.bind(this);
		this.state = {
			isQuerying: false,
			isQueryingTxt: '.'
		}
		this.setInterval = undefined
	}



	setState(state) {
		if (state.hasOwnProperty('isQuerying')) {
			if (state.isQuerying === true) {
				if (this.setInterval === undefined) {
					var isQueryingTxt = this.state.isQueryingTxt
					this.setInterval = setInterval(() => {
						isQueryingTxt += '.'
						if (isQueryingTxt.length === 4) isQueryingTxt = '.';
						super.setState({
							isQueryingTxt: isQueryingTxt
						})
					}, 750)
				}
			} else {
				if (this.setInterval) {
					state.isQueryingTxt = '.'
					clearInterval(this.setInterval)
					this.setInterval = undefined
				}
			}
		}
		super.setState(state)
	}

	pay() {
		var payment = this.props.location.state;
		payment.exInfo = JSON.stringify({
			serialNo: this.refs.serial.value,
			pin: this.refs.pin.value,
		})
		loadPay(payment).then((res) => {
			if (res.code == 200) {
				try {
					this.context.router.push('/');
				} catch (e) {
					console.log(e)
				}
				payPoint();
			} else {
				console.log("load order fail");
			}
			salert(res.error_msg)
			this.state.isQuerying = false
			this.setState(this.state)
		})
		this.state.isQuerying = true
		this.setState(this.state)
	}

	render() {
		return (
			<div className="payment-nav">
				<h2 className="name">
					{this.props.location.state.name}
					<span className="exchange">Exchange rate</span>
				</h2>

				<img className="card-head" src={this.props.location.state.codeImg} />

				<div className="card-inputs Serial" id="serial">
					<span>Serial: </span>
					<input placeholder="Please enter Serial Number" ref="serial" />
				</div>
				<div className="card-inputs PIN" id="pin">
					<span>PIN: </span>
					<input placeholder="Please enter PIN" ref="pin" />
				</div>
				{this.state.isQuerying ? <a href="javascript:void(0);" className="btn-pay">Đang kiểm tra {this.state.isQueryingTxt}</a> : <a href="javascript:void(0);" className="btn-pay" onClick={this.pay}>Payment</a>}

			</div>
		)
	}
}

Type1.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default Type1;

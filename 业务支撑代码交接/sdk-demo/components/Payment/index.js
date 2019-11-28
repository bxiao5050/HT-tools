/**
 * Created by karl.zheng on 2018/3/26.
 */
import React from 'react'
import { Link } from 'react-router'
import { getPay, salert } from '../../config/requires'
import { connect } from 'react-redux'
import { initPayments } from '../../actions'
require('./index.css')

class Payment extends React.Component {
	constructor(props) {
		super(props);
		this.close = this.close.bind(this);
		this.back = this.back.bind(this);
	}

	componentWillMount() {
		if (this.props.order.gameOrderId) {
			getPay().then((res) => {
				if (res.code == 200) {
					this.props.initPay(res.payments);
				} else {
					salert("init pay fail");
				}
			})
		}
	}

	close() {
		this.context.router.push('/');
	}

	back() {
		this.context.router.goBack();
	}

	render() {
		return (
			<div className="payments">
				<div className="wrap"></div>

				<div className="wrap-payment">
					<div className="pay-header">
						<a href="javascript:void(0);" onClick={this.back} className="back">
						</a>
						<h2>Trung tâm nạp</h2>
						<a href="javascript:void(0);" onClick={this.close} className="close">
						</a>
					</div>

					<div className="payment-content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

Payment.contextTypes = {
	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
	initPay: (payments) => {
		dispatch(initPayments(payments));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Payment)

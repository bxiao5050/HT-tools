/**
 * Created by karl.zheng on 2018/3/26.
 */
import React from 'react'
import { connect } from 'react-redux'
import { initPay, initOrder } from '../../../actions'
require('./index.css')

class PaymentNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			isActive: 0
		};

		this.change = this.change.bind(this);
		this.close = this.close.bind(this);
		this.back = this.back.bind(this);
	}

	intoPay(payments) {
		if (payments.name == "SMS") {
			payments.showMethod = 5;
		}
		var path = {
			pathname: '/payment/type' + payments.showMethod,
			state: payments
		}
		this.context.router.push(path);
	}

	change(e) {
		var index = e.currentTarget.dataset.id;
		this.setState({
			isActive: index
		})
		this.props.initPay(this.props.allPay[index]);
		this.intoPay(this.props.allPay[index]);
	}

	close() {
		this.context.router.push('/');
	}

	back() {
		this.context.router.goBack();
	}

	render() {
		return (
			<ul className="payment-nav">
				{
					this.props.allPay.map((node, index) => (
						<li key={index} data-id={index} className={this.state.isActive == index ? "active" : ""}
							onClick={(e) => this.change(e)}>
							<p>{node.name}</p>
							<span></span>
						</li>
					))
				}
			</ul>
		);
	}
}

PaymentNav.contextTypes = {
	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	order: state.order,
	allPay: state.allPay
});

const mapDispatchToProps = (dispatch) => ({
	initPay: (payment) => {
		dispatch(initPay(payment));
	},
	initOrder: (order) => {
		dispatch(initOrder(order));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PaymentNav)

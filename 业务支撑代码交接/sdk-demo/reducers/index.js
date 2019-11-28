/**
 * Created by karl.zheng on 2018/3/31.
 */
import { combineReducers } from 'redux'
import accounts from './accounts'
import payments from './payments'
import order from './order'
import scales from './scales'
import query from './query'
import user from './user'
import alert from './alert'
import allPay from './allPay'
import orderList from './orderList'

const reducer = combineReducers({
	accounts,
	payments,
	allPay,
	order,
	scales,
	query,
	user,
	alert,
	orderList
})

export default reducer;
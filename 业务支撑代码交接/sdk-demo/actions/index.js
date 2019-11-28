/**
 * Created by karl.zheng on 2018/3/31.
 */
export const initAccounts = (accounts) => ({
    type: "INIT_ACCOUNT",
    accounts
})

export const insertAccount = (account) => ({
    type: "INSERT_ACCOUNT",
    account
})


export const deleteAccount = (userId) => ({
    type: "DELETE_ACCOUNT",
    userId
})

export const initPay = (payments) => ({
    type: "INIT_PAY",
    payments
})

export const initPayments = (payments) => ({
    type: "INIT_PAYMENTS",
    payments
})

export const initOrder = (order) => ({
    type: "INIT_ORDER",
    order
})

export const initScale = (scales) => ({
    type: "INIT_SCALE",
    scales
})

export const initQuery = (query) => ({
    type: "INIT_QUERY",
    query
})

export const logout = () => ({
    type: "LOGOUT_ACCOUNT"
})

export const initUser = (user) => ({
    type: "INIT_USER",
    user
})

export const showAlert = (msg) => ({
    type: "SHOW_ALERT",
    msg
})

export const closeAlert = () => ({
    type: "CLOSE_ALERT"
})

export const initList = (orderList) => ({
    type: "INIT_LIST",
    orderList
})
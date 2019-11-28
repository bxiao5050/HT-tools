/**
 * Created by karl.zheng on 2018/3/31.
 */
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const routeConfig = [
    {
        path: '/',
        component: require('../components/App').default,
        childRoutes: [
            {
                path: 'login',
                component: require('../components/Login').default,
                childRoutes: [
                    {
                        path: 'main',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Login/Main').default)
                            }, 'Login')
                        }
                    },
                    {
                        path: 'account',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Login/Account').default)
                            }, 'Login')
                        }
                    },
                    {
                        path: 'register',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Login/Register').default)
                            }, 'Login')
                        }
                    },
                    {
                        path: 'choose',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Login/Choose').default)
                            }, 'Login')
                        }
                    },
                    {
                        path: 'loading',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Login/Loading').default)
                            }, 'Login')
                        }
                    }
                ]
            },
            {
                path: 'pay',
                component: require('../components/Pay').default,
                childRoutes: [
                    {
                        path: 'type0',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Pay/Type0').default)
                            }, 'Pay')
                        }
                    },
                    {
                        path: 'type1',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Pay/Type1').default)
                            }, 'Pay')
                        }
                    },
                    {
                        path: 'type2',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Pay/Type2').default)
                            }, 'Pay')
                        }
                    },
                    {
                        path: 'type3',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Pay/Type3').default)
                            }, 'Pay')
                        }
                    },
                    {
                        path: 'type4',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Pay/Type4').default)
                            }, 'Pay')
                        }
                    },
                    {
                        path: 'type5',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Pay/Type5').default)
                            }, 'Pay')
                        }
                    }
                ]
            },
            {
                path: 'payment',
                component: require('../components/Payment').default,
                indexRoute: { component: require('../components/Payment/List').default },
                childRoutes: [
                    {
                        path: 'type0',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Payment/Type0').default)
                            }, 'Payment')
                        }
                    },
                    {
                        path: 'type1',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Payment/Type1').default)
                            }, 'Payment')
                        }
                    },
                    {
                        path: 'type2',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Payment/Type2').default)
                            }, 'Payment')
                        }
                    },
                    {
                        path: 'type3',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Payment/Type3').default)
                            }, 'Payment')
                        }
                    },
                    {
                        path: 'type4',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Payment/Type4').default)
                            }, 'Payment')
                        }
                    },
                    {
                        path: 'type5',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/Payment/Type5').default)
                            }, 'Payment')
                        }
                    }
                ]
            },
            {
                path: 'info',
                component: require('../components/UserInfo').default,
                childRoutes: [
                    {
                        path: 'main',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/UserInfo/Main').default)
                            }, 'Info')
                        }
                    },
                    {
                        path: 'pass',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/UserInfo/ChangePass').default)
                            }, 'Info')
                        }
                    },
                    {
                        path: 'orders',
                        getComponent(nextState, callback) {
                            require.ensure([], require => {
                                callback(null, require('../components/UserInfo/OrderList').default)
                            }, 'Info')
                        }
                    }

                ]
            }
        ]
    }
]

export default routeConfig
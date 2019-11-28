/**
 * 五分钟视图数据源
 * 
 */
const state={
    fiveMinData:[],
}

const mutations={
    setFiveMinData:(state,fivemindata)=>{
        state.fiveMinData=fivemindata;
    }
}

const actions={
    setFiveMinData:({commit},fivemindata)=>{
        commit("setFiveMinData",fivemindata)
    },
}

const getters={
    fiveMinData:state=>state.fiveMinData
}

export default{
    state,mutations,actions,getters
}
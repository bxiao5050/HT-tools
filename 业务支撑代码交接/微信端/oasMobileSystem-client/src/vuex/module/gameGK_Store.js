/**
 * 新用户留存数据源
 * 
 */
const state={
    keyIndexData:[],
    type:1,
}

const mutations={
    setKeyIndexData:(state,data)=>{
        state.keyIndexData=data;
    },
    setType:(state,type)=>{
        state.type=type;
    }
}

const actions={
    setKeyIndexData:({commit},data)=>{
        commit("setKeyIndexData",data)
    },
     setType:({commit},type)=>{
        commit("setType",type)
    }
}

const getters={
}

export default{
    state,mutations,actions,getters
}
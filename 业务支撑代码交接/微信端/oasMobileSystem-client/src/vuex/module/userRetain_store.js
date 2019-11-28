/**
 * 新用户留存数据源
 * 
 */
const state={
    newUserRetainData:[],
    drawChart:null
}

const mutations={
    setNewUserRetainData:(state,data)=>{
        state.newUserRetainData=data;
    },
    setDrawChart:(state,draw)=>{
        state.drawChart=draw;
    }
}

const actions={
    setNewUserRetainData:({commit},data)=>{
        commit("setNewUserRetainData",data)
    },
    setDrawChart:({commit},draw)=>{
        commit("setDrawChart",draw);
    }
}

const getters={
    newUserRetainData:state=>state.newUserRetainData
}

export default{
    state,mutations,actions,getters
}
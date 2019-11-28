/**
 * 五力模型数据源
 * 
 */
const state={
    fiveForceData:[],
    indexData:[],
    drawChart:null //五力模型画图方法
}

const mutations={
    set_5li_drawChart:(state,drawchart)=>{
        state.drawChart=drawchart;
    },
    setFiveForceData:(state,fiveforcedata)=>{
        state.fiveForceData=fiveforcedata;
    },
    setIndexData:(state,indexdata)=>{
        state.indexData=indexdata;
    }
}

const actions={
    setFiveForceData:({commit},fiveforcedata)=>{
        commit("setFiveForceData",fiveforcedata)
    },
    setIndexData:({commit},indexdata)=>{
        commit("setIndexData",indexdata)
    }
}

const getters={
    fiveForceData:state=>state.fiveForceData,
    indexData:state=>state.indexData
}

export default{
    state,mutations,actions,getters
}
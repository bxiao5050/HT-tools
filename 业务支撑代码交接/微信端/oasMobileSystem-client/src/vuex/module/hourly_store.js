/**
 * 五分钟视图数据源
 *
 */
const state={
  hourlyData:[],
}

const mutations={
  setHourlyData:(state,hourlyData)=>{
    state.hourlyData=hourlyData;
  }
}

const actions={
  setHourlyData:({commit},hourlyData)=>{
    commit("setHourlyData",hourlyData)
  },
}

const getters={
  hourlyData:state=>state.hourlyData
}

export default{
  state,mutations,actions,getters
}

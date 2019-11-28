
let state ={
  chartData:[],
  selectedIndex:0,
  catagory:[]
};
let mutations = {
  setSelectedIndex:(state,index)=>{
    state.selectedIndex = index;
  },
  setCatagory:(state,catagory)=>{
    state.catagory = catagory;
  },
  setChartData:(state,chartData)=>{
    state.chartData = chartData;
  }
};
let actions = {
  setSelectedIndex:({commit},selectedIndex)=>{
    commit('setSelectedIndex',selectedIndex);
  },
  setCatagory:({commit},catagory)=>{
    commit('setCatagory',catagory);
  },
  setChartData:({commit},chartData)=>{
    commit('setChartData',chartData);
  },
};
let getters = {
  chartData:state=>state.chartData,
  selectedIndex:state=>state.selectedIndex,
  catagory:state=>state.catagory
};

export default {
  state,
  mutations,
  actions,
  getters
};

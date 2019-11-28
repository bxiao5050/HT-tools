export default {
  nowOS:(state)=>{
    let result=[];
    if(state.OSList){
      state.OSList.forEach((item)=>{
        if(item.checked){
          result.push(item.id)
        }
      });
    }
    return result.join(',')
  }
}
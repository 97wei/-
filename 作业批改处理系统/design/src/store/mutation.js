
export const state = {
  // 存放用户信息
  user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
}
export const mutations = {
  changeUser(state,user){
    // 1.将用户信息存入到store中的state里
    state.user = user;
    if(user){
      // 2,将用户信息存入到sessionStorage中
      sessionStorage.setItem('user',JSON.stringify(user))
    }else{
      sessionStorage.removeItem('user')
    }
  }
}
export const getters = {
  user(state){
    return state.user
  }
}

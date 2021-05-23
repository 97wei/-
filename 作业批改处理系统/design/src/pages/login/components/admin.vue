<template>
         <div class="login-form">
              <p class="login-title">管理员登录</p>
              <v-com ref='info'></v-com>
              <button type="submit" @click="login">登陆</button>
     </div>
</template>

<script>
import { successAlert } from '../../../utils/alert'
import {adminLogin} from '../../../utils/request'
import {mapActions} from 'vuex'
import vCom from './common.vue'
export default {
   data(){
      return{
      
      }
   },
   components:{
      vCom
   },
   methods: {
            ...mapActions({
             "requestUser":'userActions'
          }),
            login(){
               var user = {
                  username:this.$refs.info.user.username,
                  password:this.$refs.info.user.password
               }
            adminLogin(user).then(res=>{
                  successAlert(res.data.msg)
                  this.requestUser(res.data.list)
                  this.$router.push('/adminIndex')
            })
            }
   }
}
</script>

<style>

</style>

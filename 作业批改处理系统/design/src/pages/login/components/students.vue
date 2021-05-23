<template>
         <div class="login-form">
              <p class="login-title">学生登录</p>
              <v-com ref="info"></v-com>
              <button type="submit" @click="login">登陆</button>
     </div>
</template>

<script>
import { successAlert } from '../../../utils/alert'
import {studentLogin} from '../../../utils/request'
import {mapActions} from 'vuex'
import vCom from './common.vue'
export default {
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
            studentLogin(user).then(res=>{
               console.log(res);
                  successAlert(res.data.msg)
                  this.requestUser(res.data.list)
                  this.$router.push('/StudentIndex')
            })
            }
   }
}
</script>

<style>

</style>

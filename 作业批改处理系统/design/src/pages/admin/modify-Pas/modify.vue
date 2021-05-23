<template>
  <div class="main">
 <el-form  status-icon  label-width="100px" class="demo-ruleForm">
   <el-form-item label="账号" prop="">
    <el-input type="text" :value='admin.username' autocomplete="off" disabled></el-input>
  </el-form-item>
  <el-form-item label="旧密码" prop="">
    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="">
    <el-input type="password" v-model="form.newpassword" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { successAlert } from '../../../utils/alert';
import { adminXGmm } from '../../../utils/request';
import {mapGetters} from 'vuex'
export default {
 data() {
      return {
        form: {
          password: '',
          newpassword: '',
          username: ''
        },
      };
    },
    computed: {
     ...mapGetters({
              "admin":"user"
     })
   },
    methods: {
      //重置表单
      resetForm(){
        this.form={
          password: '',
          newpassword: '',
          username: ''
        }
      },
      //提交密码修改
      submitForm(){
       this.form.username =  this.admin.username
       adminXGmm(this.form).then(res=>{
           successAlert(res.data.msg)
           this.resetForm()
       })
      }
    }
  }

</script>

<style scoped>
.main{
  margin: 0 auto;
  margin-top:20px;
  width: 60%;
}
</style>

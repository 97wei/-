<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
 <el-form ref="form" :model="form" label-width="80px">
 <el-form-item label="姓名">
    <el-input type="text" v-model="form.ncname" autocomplete="off"></el-input>
  </el-form-item>
 <el-form-item label="账号" >
    <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" >
    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="角色ID">
    <el-input type="text" v-model="form.roleid" autocomplete="off" readonly></el-input>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confrim" v-if='info.isAdd'>确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script>
import { successAlert } from '../../../../utils/alert';
import { adduser,oneInfo,updateAdmin } from '../../../../utils/request';
import{mapActions} from 'vuex'
export default {
     props:['info'],
    data() {
    return {
         form:{
          username:'',
          password:'',
          ncname:'',
          roleid:0,
         }
    };
  },
  mounted() {

  },
  methods: {
    //取消添加
     cancel(){
       this.info.isshow=false,
       this.form={
         username:'',
          password:'',
          ncname:'',
          roleid:0,
       }
     },
     //获取管理员列表
      ...mapActions({
      requestAdminList:'adminList/adminListActions'
      }),

      //确认添加管理员
      confrim(){
        adduser(this.form).then(res=>{
        //发起管理员列表请求
        this.requestAdminList()
        this.cancel()
      })
     },
     //获取一条管理员信息
     getoneAdmin(id){
       oneInfo({id}).then(res=>{
       this.form = res.data.list
       })
     },
     //修改管理员的信息
     update(){
        updateAdmin(this.form).then(res=>{
           successAlert(res.data.msg)
           this.requestAdminList()
           this.cancel()
        })
     }
  },
};
</script>


<style scoped>

</style>

<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
 <el-form ref="form" :model="form" label-width="80px">
 <el-form-item label="班级编号">
    <el-input type="text" v-model="form.uid" autocomplete="off"></el-input>
  </el-form-item>
 <el-form-item label="班级名称" >
    <el-input type="text" v-model="form.classname" autocomplete="off"></el-input>
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
import { classInfoAdd,getOneClass, updateClass} from '../../../../utils/request';
import{mapActions} from 'vuex'
export default {
     props:['info'],
    data() {
    return {
         form:{
           uid:'',
           classname:'',
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
           uid:'',
           classname:'',
       }
     },
     //获取管理员列表
      ...mapActions({
          requestClassList:'classList/classListActions',
          requestClassNum:'classList/ClassNumActions'
      }),

      //确认添加班级
      confrim(){
        classInfoAdd(this.form).then(res=>{
        //发起管理员列表请求
        this.requestClassList()
        this.requestClassNum()
        this.cancel()
      })
     },
     //获取一条管理员信息
     getoneClass(id){
       getOneClass({id}).then(res=>{
       this.form = res.data.list
       })
     },
     //修改管理员的信息
     update(){
        updateClass(this.form).then(res=>{
           successAlert(res.data.msg)
           this.requestClassList()
           this.cancel()
        })
     }
  },
};
</script>


<style scoped>

</style>

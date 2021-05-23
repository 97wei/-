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
   <el-form-item label="班级">
  <el-select v-model="form.Cclass">
   <el-option lable="请选择" value='' disabled>--请选择--</el-option>
    <el-option
      v-for="item in classname"
      :key="item.classname"
      :label="item.classname"
      :value="item.classname">
    </el-option>
  </el-select>
  </el-form-item>
 <el-form-item label="账号" >
    <el-input type="text" v-model="form.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="角色ID">
    <el-input type="text" v-model="form.roleid" autocomplete="off" readonly></el-input>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confrim" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script>
import { successAlert } from '../../../../utils/alert'
import { studentAdd,onestudentInfo,updateStudent } from '../../../../utils/request'
import {mapGetters,mapActions} from 'vuex'
export default {
     props:['info'],
    data() {
    return {
         form:{
          username:'',
          password:'',
          ncname:'',
          Cclass:'',
          roleid:2,
         }
    };
  },
  mounted() {
    // 获取班级信息选项
      this.requestClassList(1)
  },
  computed: {
    ...mapGetters({
        classname:'classList/classLists',
    })
  },
  methods: {
         ...mapActions({
        requestStudentList:'studentList/StudentListActions',
        requestStudentNum:'studentList/StudentNumActions',
        requestClassList:'classList/classListActions',
      }),
    //取消添加
     cancel(){
       this.info.isshow=false,
       this.form={
           username:'',
          password:'',
          ncname:'',
          Cclass:'',
          roleid:2,
       }
     },
     //获取学生信息
     getOneStudent(id){
        onestudentInfo({id}).then(res=>{
        this.form=res.data.list
        })
     },
     //修改学生信息按钮
     update(){
      updateStudent(this.form).then(res=>{
        successAlert(res.data.msg)
        this.requestStudentList()
        this.cancel()
      })
     },
     //确认添加学生按钮
     confrim(){
       console.log(this.form);
       studentAdd(this.form).then(res=>{
       successAlert(res.data.msg),
       this.requestStudentList()
       this.requestStudentNum()
       this.cancel()
       })
     }
  },
};
</script>


<style scoped>

</style>

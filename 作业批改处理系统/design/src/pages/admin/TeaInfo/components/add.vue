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
   <el-form-item label="授课班级">
  <el-select v-model="form.skclass">
    <el-option lable="请选择" value='' disabled>--请选择--</el-option>
    <el-option
      v-for="item in classname"
      :key="item.classname"
      :label="item.classname"
      :value="item.classname">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="授课内容">
    <el-select v-model="form.course">
    <el-option lable="请选择" value='' disabled>--请选择--</el-option>
    <el-option
      v-for="item in coursename"
      :key="item.coursename"
      :label="item.coursename"
      :value="item.coursename">
    </el-option>
  </el-select>
  </el-form-item>
 <el-form-item label="账号">
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
import { successAlert } from '../../../../utils/alert';
import { teacherAdd,oneteacherInfo,updateTeacher } from '../../../../utils/request';
import {mapActions,mapGetters} from  'vuex'
export default {
     props:['info'],
    data() {
    return {
         form:{
          username:'',
          password:'',
          ncname:'',
          skclass:'',
          course:'',
          roleid:1,
         },
      }
      
  },
  computed: {
    ...mapGetters({
        classname:'classList/classLists',
        coursename:'courseList/courseLists'
    })
  },
  mounted() {
      this.requestClassList(1)
      this.requestCourseList(1)

  },
  methods: {
    //发起教师列表请求
    ...mapActions({
       requestTeacherList:'teacherList/teacherListActions',
       requestClassList:'classList/classListActions',
       requestCourseList:'courseList/CourseListActions',
    }),
    //取消添加
     cancel(){
       this.info.isshow=false,
       this.form={
          username:'',
          password:'',
          ncname:'',
          skclass:'',
          course:'',
          roleid:1,
       }
     },
     //确认添加教师
     confrim(){
          teacherAdd(this.form).then(res=>{
          this.requestTeacherList()
          successAlert(res.data.msg)
      })
       this.cancel()
     },
     //获取需要编辑的教师信息
     oneteacher(id){
       oneteacherInfo({id}).then(res=>{
         this.form = res.data.list
       })
     },
     //更新教师信息
     update(){
       updateTeacher(this.form).then(res=>{
          this.requestTeacherList()
          successAlert(res.data.msg)
          this.cancel()
       })
     },
    
    
  },
};
</script>


<style scoped>

</style>

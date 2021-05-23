<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
 <el-form ref="form" :model="form" label-width="80px">
 <el-form-item label="课程编号">
    <el-input type="text" v-model="form.uid" autocomplete="off"></el-input>
  </el-form-item>
 <el-form-item label="课程名称" >
    <el-input type="text" v-model="form.coursename" autocomplete="off"></el-input>
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
import { courseInfoAdd,getOneCourse, updatecourse} from '../../../../utils/request';
import{mapActions} from 'vuex'
export default {
     props:['info'],
    data() {
    return {
         form:{
           uid:'',
           coursename:'',
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
           coursename:'',
       }
     },
     //获取课程列表
      ...mapActions({
          requestCourseList:'courseList/CourseListActions',
          requestCourseNum:'courseList/CourseNumActions'
      }),

      //确认添加课程
      confrim(){
        courseInfoAdd(this.form).then(res=>{
        //发起课程列表请求
        this.requestCourseList()
        this.requestCourseNum()
        this.cancel()
      })
     },
     //获取一条课程信息
     getoneCourse(id){
       getOneCourse({id}).then(res=>{
       this.form = res.data.list
       })
     },
     //修改课程的信息
     update(){
        updatecourse(this.form).then(res=>{
           successAlert(res.data.msg)
           this.requestCourseList()
           this.cancel()
        })
     }
  },
};
</script>


<style scoped>

</style>

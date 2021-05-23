<template>
  <div>
      <el-table :data="tableData"  border style="width: 100%" >
        <el-table-column prop="uid" label="课程编号"  ></el-table-column>
        <el-table-column prop="coursename" label="课程名称"></el-table-column>
        <el-table-column prop="cz" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
     <el-pagination
         background
         layout="prev, pager, next"
         :page-size="5"
         @current-change='Cpage'
         :total="counts">
      </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from  'vuex'
import {courseDelete} from '../../../../utils/request'
export default {

  data() {
    return {

    };
  },
  methods: {
       ...mapActions({
         requestCourseList:'courseList/CourseListActions',
          requestCourseNum:'courseList/CourseNumActions',
         requestPage:"courseList/pageActions"
       }),
      //  修改课程信息
      edit(e){
        this.$emit("edit",e)
       },
      // 删除课程信息
      del(id){
        courseDelete({id}).then(res=>{
             this.requestCourseList(),
             this.requestCourseNum()
        })
      },
        //发送页码数
      Cpage(page){
           this.requestPage(page)
           this.requestCourseList()
      }
  },
  computed: {
    ...mapGetters({
       tableData:'courseList/courseLists',
       counts:'courseList/courseCount'

    })
  },
  //挂载完成
  mounted() {
    //  发起课程列表请求
      this.requestCourseList()
      this.requestCourseNum()


  },
};
</script>

<style scoped>

</style>

<template>
  <div>
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column prop="username" label="账号"  ></el-table-column>
        <el-table-column prop="ncname" label="姓名"></el-table-column>
        <el-table-column prop="Cclass" label="班级"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
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
         :page-size="3"
         @current-change='Cpage'
         :total="counts">
      </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../../../utils/alert';
import{studentrDelete} from '../../../../utils/request'
export default {

  data() {
    return {
   
    };
  },
  methods: {
      ...mapActions({
        requestStudentList:'studentList/StudentListActions',
        requestStudentNum:'studentList/StudentNumActions',
        requestPage:"studentList/pageActions"
      }),
      //编辑学生信息
      edit(id){
        this.$emit('edit',id)
      },
      //删除学生信息
      del(id){
          studentrDelete({id}).then(res=>{
            successAlert(res.data.msg)
            this.requestStudentList()
           this.requestStudentNum()
          })
      },
      //发送页码数
      Cpage(page){
           this.requestPage(page)
           this.requestStudentList()
      }
  },
  computed: {
    ...mapGetters({
       tableData:'studentList/studentList',
       counts:'studentList/studentsCount'
    })
  },
  //元素挂载完成
  mounted() {
    //  发起学生列表请求
    this.requestStudentList()
    this.requestStudentNum()
  },
};
</script>

<style scoped>

</style>

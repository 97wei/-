<template>
  <div>
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column prop="username" label="账号"  ></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="ncname" label="姓名"></el-table-column>
        <el-table-column prop="skclass" label="授课班级"></el-table-column>
        <el-table-column prop="course" label="授课内容"></el-table-column>
        <el-table-column prop="cz" label="操作"> 
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {mapActions,mapGetters} from  'vuex'
import { successAlert } from '../../../../utils/alert';
import {teacherDelete} from '../../../../utils/request'
export default {

  data() {
    return {
   
    };
  },
  methods: {
       //发起教师列表请求
        ...mapActions({
          requestTeacherList:'teacherList/teacherListActions'
        }),
      //编辑按钮
        edit(id){
         this.$emit('edit',id)
        },
      //删除教师信息
      del(id){
         teacherDelete({id}).then(res=>{
           successAlert(res.data.msg)
           this.requestTeacherList()
         })
      }
      },
  computed: {
       ...mapGetters({
           tableData:'teacherList/teacherList'
       })
     },
//页面挂载完成后
  mounted(){
       this.requestTeacherList()
     }
};
</script>

<style scoped>

</style>

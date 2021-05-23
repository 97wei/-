<template>
  <div>
      <el-table :data="tableData" border style="width: 100%;margin-top:30px" >
        <el-table-column prop="username" label="学号"></el-table-column>
        <el-table-column prop="ncname" label="姓名"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="result" label="批改评语"></el-table-column>
        <el-table-column prop="reviewer" label="阅卷人"></el-table-column>
        <el-table-column prop="cz" label="操作"> 
          <template v-slot="prop">
            <el-button type="primary" @click="load(prop.row.id)">下载反馈文件</el-button>
           </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
 import {gradeOne} from '../../../../utils/request'
 import {mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../../../utils/alert';
export default { 
    methods: {
      ...mapActions({
          requestGradeList:"grade/gradeListActions"
      }),
         //下载批改反馈文件
        load(id){
        gradeOne({id}).then(res=>{
            window.location.href = this.$preImg+res.data.list.checkfile
        })
        },
    },
    computed: {
         ...mapGetters({
             tableData:'grade/gradelist',
             "student":'user'
         })  
    },
    mounted () {
        this.requestGradeList(this.student.ncname)
    }
};
</script>

<style scoped>

</style>

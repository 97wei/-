<template>
  <div>
      <el-table :data="tableData" border style="width: 100%;margin-top:30px" >
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="ncname" label="发布人"></el-table-column>
        <el-table-column prop="deadline" label="提交时间" >
          <template v-slot='timedata'>
      <el-date-picker
            v-model="timedata.row.deadline"
             value-format='timestamp'
            class="datetime"
            readonly
            size='mini'
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="操作"> 
          <template v-slot="prop">
            <el-button type="primary" @click="load(prop.row.id)">下载</el-button>
            <el-button type="danger"  @click="submit(prop.row.id)">提交作业</el-button>
             <!-- <el-button  type="success" @click="load">已提交不用重复提交</el-button> -->
           </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
 import {workInfo,delWork} from '../../../../utils/request'
 import {mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../../../utils/alert';
export default {

  data() {
    return {
        value:[],
        fileShow:true
    };
  },
  methods: {
    ...mapActions({
      requestCkzyList:'stuCkzy/ckzyListActions'
    }),
    //下载文件
     load(id){
      workInfo({id}).then(res=>{
        console.log(res.data.list.file);
        window.location.href = this.$preImg+res.data.list.file
       })
     },
     //提交作业
     submit(id){
       this.$emit('submit',id)
     },
     },
  computed: {
    ...mapGetters({
       tableData:'stuCkzy/ckzyLists',
       "student":'user'
    })
  },
    mounted() {
          this.requestCkzyList(this.student.Cclass)
          this.event.$on('SHOW',(e)=>{
            this.fileShow = e
          })
    },
    
    //上传时间
    updated () {
      for(let i = 0; i<this.tableData.length;i++){
         var  datas  = this.tableData[i].deadline.split(',')
         this.tableData[i].deadline = datas
      }
    }
};
</script>

<style scoped>
.datetime{
  width: 220px;
  border: 0;
}
.datetime >>>.el-input__icon{
  display: none;
}
</style>

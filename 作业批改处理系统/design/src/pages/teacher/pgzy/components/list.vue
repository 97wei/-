<template>
  <div>
     <el-input  v-model="values" placeholder="请输入要搜索的内容" @change="search" style="width:200px;margin:20px 0"></el-input>
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column prop="username" label="学号"  ></el-table-column>
        <el-table-column prop="ncname" label="姓名"  ></el-table-column>
        <el-table-column prop="title" label="作业题目"></el-table-column>
        <el-table-column prop="uploaddate" label="提交日期">
        <template v-slot='timedata'>
        <el-date-picker
            v-model="timedata.row.uploaddate"
             value-format='timestamp'
            class="datetime"
            readonly
            size='mini'
            type="datetime"
            start-placeholder="开始日期"
            >
          </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="cz" label="操作"> 
          <template v-slot="prop">
            <el-button type="primary" @click="load(prop.row.id)">下载</el-button>
            <el-button type="primary"  @click="check(prop.row.id)">批阅</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change='onChange'
        layout="prev, pager, next"
         :page-size="5"
        :total="count">
      </el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../../../utils/alert';
import {pgzyOne,delcheck} from '../../../../utils/request'
export default {

  data() {
    return {
       values:'',
       Cclass:"",
    };
  },
   
  methods: {
    ...mapActions({
      requestPgzyList:"PgzyList/PgzylistActions",
      requestPgzyCount:"PgzyList/PgzyCountActions",
      requestCurrentPage:"PgzyList/PgzyCurrentPagetActions",
      requestSearchList:"PgzyList/SearchListActions",

    }),
        //下载文件
     load(id){
      pgzyOne({id}).then(res=>{
        window.location.href = this.$preImg+res.data.list.file
       })
     },
     //点击页码显示对应列表
    onChange(e){
      this.requestCurrentPage(e)
      this.requestPgzyList(this.teacher.skclass)
    },
    //搜索内容
    search(e){
      console.log(e);
        this.requestSearchList(e)
    },
    //批阅作业
    check(id){
       this.$emit('check',id)
    },
    //删除作业
    del(id){
      delcheck({id}).then(res=>{
        successAlert(res.data.msg)
        this.requestPgzyList(this.teacher.skclass)
        this.requestPgzyCount(this.teacher.skclass)
      })
    }
  },
  computed: {
    ...mapGetters({
      "teacher":"user",
      "tableData":"PgzyList/pgzyList",
      "count":"PgzyList/pgzyCount",
    })
  },
  mounted() {
       //发起已交作业列表请求
       this.requestPgzyList(this.teacher.skclass)
       this.requestPgzyCount(this.teacher.skclass)
  },
};
</script>

<style scoped>
.datetime{
  width: 180px;
  /* border: 1px solid white;; */
  
}
.datetime >>>.el-input__icon{
  display: none;
}
</style>

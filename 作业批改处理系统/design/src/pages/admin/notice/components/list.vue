<template>
  <div>
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column prop="content" label="公告内容"></el-table-column>
        <el-table-column prop="data" label="发布时间"></el-table-column>
        <el-table-column prop="cd" label="操作"> 
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger"  @click="del(prop.row.id)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import{mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../../../utils/alert';
import {delNotice} from '../../../../utils/request'
export default {

  data() {
    return {
   
    };
  },
  methods: {
    ...mapActions({
      requestNoticList:'noticeList/noticeListActions'
    }),
    //编辑公告内容
    edit(id){
      this.$emit('edit',id)
    },
    //删除公告内容
    del(id){
      delNotice({id}).then(res=>{
        successAlert(res.data.msg)
        this.requestNoticList() 
      })
    }
  },
  computed: {
    ...mapGetters({
      tableData:'noticeList/NoticeList'
    })
  },
  mounted() {
     this.requestNoticList()
  },
};
</script>

<style scoped>

</style>

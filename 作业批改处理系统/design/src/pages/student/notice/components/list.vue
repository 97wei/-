<template>
  <div>
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column prop="content" label="公告内容"></el-table-column>
        <el-table-column prop="data" label="发布时间"></el-table-column>

      </el-table>
  </div>
</template>

<script>
import{mapGetters,mapActions} from 'vuex'
export default {

  data() {
    return {
   
    };
  },
  methods: {
     ...mapActions({
      requestNoticList:'noticeList/noticeListActions'
    }),
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

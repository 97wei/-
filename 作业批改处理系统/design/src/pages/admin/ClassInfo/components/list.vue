<template>
  <div>
      <el-table :data="tableData"  border style="width: 100%" >
        <el-table-column prop="uid" label="班级编号"  ></el-table-column>
        <el-table-column prop="classname" label="班级名称"></el-table-column>
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
import {classDelete} from '../../../../utils/request'
export default {

  data() {
    return {

    };
  },
  methods: {
       ...mapActions({
         requestClassList:'classList/classListActions',
         requestClassNum:'classList/ClassNumActions',
         requestPage:"classList/pageActions"
       }),
      //  修改管理员信息
      edit(e){
        this.$emit("edit",e)
       },
      // 删除管理员信息
      del(id){
        classDelete({id}).then(res=>{
             this.requestClassList(),
             this.requestClassNum()
        })
      },
        //发送页码数
      Cpage(page){
           this.requestPage(page)
           this.requestClassList()
      }
  },
  computed: {
    ...mapGetters({
       tableData:'classList/classLists',
       counts:'classList/classCount'

    })
  },
  //挂载完成
  mounted() {
    //  发起班级列表请求
      this.requestClassList()
       this.requestClassNum()

  },
};
</script>

<style scoped>

</style>

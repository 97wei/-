<template>
  <div>
      <el-table :data="tableData"  border style="width: 100%" >
        <el-table-column prop="username" label="账号"  ></el-table-column>
        <el-table-column prop="ncname" label="姓名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
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
import {mapGetters,mapActions} from  'vuex'
import {adminDelete} from '../../../../utils/request'
export default {

  data() {
    return {
   
    };
  },
  methods: {
       ...mapActions({
         requestAdminList:'adminList/adminListActions'
       }),
      //  修改管理员信息
      edit(e){
        this.$emit("edit",e)
       },
      // 删除管理员信息
      del(id){
        adminDelete({id}).then(res=>{
             this.requestAdminList()
        })
      }   
  },
  computed: {
    ...mapGetters({
    tableData:'adminList/RoleList'
    })
  }, 
  //挂载完成
  mounted() {
    //  发起管理员列表请求
      this.requestAdminList()
  },
};
</script>

<style scoped>

</style>

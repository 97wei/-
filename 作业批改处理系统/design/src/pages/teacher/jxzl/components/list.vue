<template>
  <div>
      <el-table :data="tableData" border style="width: 100%" >
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="file" label="文件"></el-table-column>
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
export default {

  data() {
    return {
   
    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped>

</style>

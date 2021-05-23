<template>
  <div>
    <el-button type="primary" @click="add" >添加课程</el-button>
    <v-add :info='info' ref="add"></v-add>
    <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'

export default {
  components:{
        vAdd,
        vList
  },
  data(){
    return {
         info:{
           isshow:false,
           title:'',
           isAdd:true,
         }
    };
  },
  mounted() {

  },
  methods: {
      add(){
        this.info={
          isshow:true,
          title:'添加课程',
          isAdd:true,
        }
      },
      edit(id){
        this.info={
          isshow:true,
          title:'编辑课程信息',
          isAdd:false,
        }
        this.$refs.add.getoneCourse(id)
      }
  },
};
</script>

<style  scoped>
.el-button{
  margin-top: 20px;
}
</style>

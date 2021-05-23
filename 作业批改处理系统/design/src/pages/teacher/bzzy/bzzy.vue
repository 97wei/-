<template>
  <div>
    <el-button type="primary" @click="add" plain >作业发布</el-button>
    <v-add :info='info'></v-add>
    <v-list></v-list>  
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
         }
    };
  },
  mounted() {

  },
  methods: {
      add(){
        this.info={
          isshow:true,
          title:'作业发布'
        }
      }
  },
};
</script>

<style  scoped>
.el-button{
  margin: 20px 0;
}
</style>

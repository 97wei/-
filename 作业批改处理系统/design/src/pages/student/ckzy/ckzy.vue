<template>
  <div>
    <v-add :info='info' ref="add"></v-add>
    <v-list @submit="submit($event)"></v-list>  
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
      submit(id){
         this.info={
          isshow:true,
          title:'提交作业'
        }
       this.$refs.add.onedetail(id)
      }
  },
};
</script>

<style  scoped>
.el-button{
  margin-top: 20px;
}
</style>

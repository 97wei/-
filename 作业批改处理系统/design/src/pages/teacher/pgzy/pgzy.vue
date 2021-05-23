<template>
  <div>
    <v-add :info='info' ref="add"></v-add>
    <v-list @check="check($event)"></v-list>  
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
      check(id){
         this.info={
          isshow:true,
          title:'批阅作业'
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

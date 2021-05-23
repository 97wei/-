<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
      <el-form>
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="text">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="text">
        <el-input  v-model="form.data"></el-input>
      </el-form-item>
  </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confrim" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>

      </span>
</el-dialog>
  </div>
</template>

<script>
import { successAlert } from '../../../../utils/alert';
import{mapGetters,mapActions} from 'vuex'
import {addNotice,onenotice,updateNotice} from '../../../../utils/request'
export default {
     props:['info'],
    data() {
    return {
         form:{
           content:'',
           title:'',
           data:''
         }
    };
  },
  mounted() {

  },
  methods: {
      ...mapActions({
      requestNoticList:'noticeList/noticeListActions'
    }),
    //取消添加
     cancel(){
       this.info.isshow=false,
       this.form={
          content:'',
          title:'',
          data:'',
       }
     },
     //获取一条公告信息
     getoneNotice(id){
         onenotice({id}).then(res=>{
           this.form =  res.data.list
            this.form.id=id
         })
     },
     //修改公告信息确认
     update(){
         updateNotice(this.form).then(res=>{
           successAlert(res.data.msg)
           this.requestNoticList()
           this.cancel()
         })
     },
     confrim(){
         addNotice(this.form).then(res=>{
            successAlert(res.data.msg)
            this.requestNoticList()
         })
        this.cancel()
     }
  },
};
</script>


<style scoped>

</style>

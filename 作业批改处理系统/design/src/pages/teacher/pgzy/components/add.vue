<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
 <el-form ref="form" :model="form" label-width="80px" >
   <el-form-item label="批阅文件" >
      <input type="file"
              ref="referenceUpload"
              name="file"
              accept=".txt,.doc,.docx"
               v-if="fileShow"
                 @change="upload">
      <el-button v-else type="success" @click="load">已批阅</el-button>
  </el-form-item>
   <el-form-item label="批阅评语">
    <el-input type="textarea" v-model="form.result"></el-input>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confrim">确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script>
 import {mapGetters,mapActions} from 'vuex'
import { successAlert,warningAlert} from '../../../../utils/alert';
import {checkResult,pgzyOne} from '../../../../utils/request'

export default {
     props:['info'],
    data() {
    return {
          form:{
          checkfile:'',
          result:''
         },
         fileShow:true
    };
  },
  mounted() {

  },
    computed: {
    ...mapGetters({
      "teacher":"user",
    })
  },
  methods: {
        ...mapActions({
      requestWorkList:'workList/workListActions'
    }),
       //改变文件时,获取文件路径及信息
     upload(e){
          var files = e.target.files[0];
          var ext = ['.doc','.docx','.pdf'];
          var extName = files.name.slice(files.name.lastIndexOf('.'));
          if(!ext.some(item=>item==extName)){
          warningAlert('上传文件格式不正确')
        return
      }
        this.form.checkfile = files
     },
     //下载批阅结果
      load(){
        var id = this.form.id
      pgzyOne({id}).then(res=>{
        window.location.href = this.$preImg+res.data.list.checkfile
       })
     },
    //获取一条作业详情
    onedetail(id){
      pgzyOne({id}).then(res=>{
       this.form.id=res.data.list.id
       this.form.result = res.data.list.result
       this.form.checkfile = res.data.list.checkfile
       if(res.data.list.checkfile==null){
         this.fileShow = true
       }else{
         this.fileShow = false
       }
      })
    },
    //取消添加
     cancel(){
       this.info.isshow=false
       this.form ={
          checkfile:'',
          result:''
         },
      this.fileShow=true
     },
     //确认按钮
      confrim(){
          this.form.reviewer=this.teacher.ncname;
        checkResult(this.form).then(res=>{
          successAlert(res.data.msg)
           this.cancel()
       })
      },
  },
};
</script>


<style scoped>
.el-input__inner{
    width: 220px;
}
.bo{
  border: none;
}
  .avatar-uploader>>>.el-upload {
    border: 1px dashed grey;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader>>>.el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

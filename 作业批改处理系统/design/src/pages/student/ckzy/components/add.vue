<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
    <el-form ref="form" :model="form" label-width="80px" >
    <el-form-item label="提交学号" >
      <el-input type="text" v-model="form.username" autocomplete="off"  readonly></el-input>
    </el-form-item>
    <el-form-item label="提交人">
      <el-input type="text" v-model="form.ncname" autocomplete="off" readonly></el-input>
    </el-form-item>
    <el-form-item label="作业名">
      <el-input type="text" v-model="form.title" autocomplete="off" readonly></el-input>
    </el-form-item>
   <el-form-item label="文件" >
      <input type="file" 
              ref="referenceUpload"
              name="file"
              accept=".txt,.doc,.docx"
               v-if="fileShow"
              @change="upload">
      <el-button v-else type="success" @click="load">已提交不用重复提交</el-button>
  </el-form-item>
</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confrim" v-show="fileShow">确 定</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script>
 import {mapGetters,mapActions} from 'vuex'
import { successAlert,warningAlert} from '../../../../utils/alert';
import {tjzyAdd,pgzyOne,workInfo,updateStatus} from '../../../../utils/request'

export default {
     props:['info'],
    data() {
    return {
          form:{
          username:"",
          ncname:"",
          title:"",
          uploaddate:"",
          file:'',
         },
         fileShow:true,
         id:'',
         forms:{

         }
    };
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
        this.form.file = files
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
      this.id = id
      workInfo({id}).then(res=>{
        this.form.username = this.student.username
        this.form.ncname = this.student.ncname
        this.form.title=res.data.list.title
        // if(res.data.list.status == 1){
        //     this.fileShow = false
        // }
        var forms={
              username:this.student.username,
              ncname:this.student.ncname,
              title:res.data.list.title
            }
          updateStatus(forms).then(res=>{
        if(res.data.list !== null){
              this.fileShow = false
        }else{
              this.fileShow = true

        }
          })
          })
    },
    //取消添加
     cancel(){
       this.info.isshow=false 
       this.fileShow=true
     },
     //确认提交作业
      confrim(){
        this.form.Cclass = this.student.Cclass
        if(this.form.file==''){
          warningAlert('请上传文件')
        }else{
             this.form.uploaddate = new  Date().getTime()
             tjzyAdd(this.form).then(res=>{
             successAlert(res.data.msg)
          this.cancel()
       })
        }
    
      },
  },
  computed: {
    ...mapGetters({
      "student":"user"
    })
  },
    mounted() {
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

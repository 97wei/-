<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
       >
 <el-form ref="form" :model="form" label-width="80px" >
 <el-form-item label="作业题目">
    <el-input type="text" v-model="form.title" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="作业文件" >
      <input type="file" 
                ref="referenceUpload"
                name="file"
                accept=".txt,.doc,.docx"
                 @change="upload">
  </el-form-item>
 <el-form-item label="期限">
    <el-date-picker
      value-format='timestamp'
      v-model="form.deadline"
      size='mini'
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
   <el-form-item label="备注">
    <el-input type="textarea" v-model="form.remark"></el-input>
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
import {workAdd} from '../../../../utils/request'

export default {
     props:['info'],
    data() {
    return {
          form:{
          title:'',
          file:'',
          deadline:'',
          remark:'',

         }
    };
  },
  mounted() {

  },
  methods: {
        ...mapActions({
      requestWorkList:'workList/workListActions'
    }),
       //改变图片时,获取图片路径及信息
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
    //取消添加
     cancel(){
       this.info.isshow=false,
       this.form={
          title:'',
          file:'',
          deadline:'',
       }
     },
     //确认发布作业确认按钮
      confrim(){
        this.form.ncname = this.teacher.ncname
        this.form.Cclass = this.teacher.skclass
       workAdd(this.form).then(res=>{
          successAlert(res.data.msg)
          this.requestWorkList(this.teacher.ncname)
          this.cancel()
       })
      },
  },
  computed: {
    ...mapGetters({
      "teacher":'user'
    })
  }
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

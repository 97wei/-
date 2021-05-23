<template>
  <div>
<el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      width="30%"
      :before-close="handleClose">
 <el-form ref="form" :model="form" label-width="80px">
 <el-form-item label="资料标题" prop="form.title">
    <el-input type="text" v-model="form.nicName" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="文件" prop="form.file">
   <input type="file">
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
import { successAlert } from '../../../../utils/alert';

export default {
     props:['info'],
    data() {
    return {
         form:{
          title:'',
          file:'',
         }
    };
  },
  mounted() {

  },
  methods: {
    //取消添加
     cancel(){
       this.info.isshow=false,
       this.form={
          title:'',
          file:'',
       }
     },
     confrim(){
       successAlert('添加成功'),
       this.cancel()
     }
  },
};
</script>


<style scoped>
.el-input__inner{
    width: 220px;
}
</style>

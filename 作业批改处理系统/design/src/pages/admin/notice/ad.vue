<template>
  <div>
    <el-carousel :interval="5000" arrow="always" height='300px'>
      <el-carousel-item v-for="item in info" :key="item.data">
          <h3> {{item.title}} </h3>
          <div class="text">{{item.content}}</div>
          <p class="foot_data">{{item.data}}</p>
      </el-carousel-item>
    </el-carousel> 
    
  </div>
</template>

<script>
import{mapGetters,mapActions} from 'vuex'

export default {
     data () {
         return {
         }
     },
     methods: {
         ...mapActions({
      requestNoticList:'noticeList/noticeListActions'
    })
     },
       computed: {
    ...mapGetters({
      info:'noticeList/NoticeList'
    })
  },
      mounted() {
        this.requestNoticList()
     },
}
</script>

<style scoped>
.el-carousel{
      background: white;
      width:1000px;
      margin:100px auto;
}
  .el-carousel__item h3 {
      color: black;
      font-size: 24px;
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
  }

  .text{
      margin: 50px 200px;
      font-size: 20px;
  } 
.foot_data{
      float: right;
      margin-top: 20px;
      margin-right: 60px;
}

</style>
<template>
  <div class="data-panel_">
    <section class="top">
      <img src="../assets/img/ld.jpg" alt="">
    </section>
    <div class="h1">
      <h1 v-if="type==1">谢谢您的参与</h1>
      <h1 v-else-if="type==2">您已评价</h1>
      <p style="color: rgb(170,68,33)">Thanks for your participation</p>
      <!--<p @click="go_home" class="goCenter" v-if="isweixn!=2">查看奖励</p>-->
    </div>
  </div>
</template>
<script>
  import {baseUrl} from '../api/api'
  import api from '../api/api'
  export default{
    data(){
      return{
        bgimg:'',
        type:0,
        storeid:'',storeUrl:'',isweixn:1
      }
    },
    created(){
      if(localStorage.isweixn==2){
        this.isweixn=2
      }
      this.type = this.$route.query.type
      this.storeid = this.$route.query.storeid
      this.storeUrl = this.$route.query.storeUrl

      // console.log(this.$route.query)
      // 将数据放在当前组件的数据内
    },
    mounted(){

    },
    methods:{
      go_home(){
        window.location.href = this.storeUrl
      }
    },
    watch: {
    }
  }
</script>
<style  lang="scss">
  .data-panel_{
    .goCenter{
      font-size: .14rem;
      text-align: center;
      border: 1px solid rgb(170,68,33);
      color: rgb(170,68,33);
      width: 1.3rem;
      height: .3rem;
      line-height: .3rem;
      border-radius: .2rem;
      font-weight: normal;
      margin:.1rem auto 0
    }
    .top{
      position: fixed;width: 100%;height: 3rem;right:0;top:0;
      img{
        width: 100%;height: 100%;
      }
    }
    .h1{
      height: 1rem;text-align: center;
      position: fixed;left:0;right:0;top:0;bottom:0;margin: auto;width: 100%;
      h1{
        font-size: .22rem;font-weight: normal;font-family: 'song';
      }
    }
    footer{
      width: 100%;height: 3.6rem;position: fixed;bottom: 0;left:0;
      img{
        width: 100%;height: 100%;
      }
    }
  }
</style>

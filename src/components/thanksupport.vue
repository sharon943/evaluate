<template>
  <div class="data-panel2">
    <section class="head" :style="{height:(sysWidth/2)+'px'}">
      <img :src=bgimg alt="">
    </section>
    <div class="lists" v-if="type==1">
      <h4>收到好评</h4>
      <h4>头不疼 眼也不花了</h4>
      <h4>又能继续干活</h4>
      <h4>谢谢亲的支持</h4>

    </div>
    <div class="lists" v-else>
      <h4>您的宝贵意见</h4>
      <h4>我一定会放在心里</h4>
      <h4>期待您下次砸个好评</h4>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {baseUrl} from '../api/api'
  import api from '../api/api'
  export default{
    data(){
      return{
        bgimg:'', alldata:{}, type:0, storeid:'',suggest:'',
        advertisementUrl:'',  goodarr:[],  badarr:[],
        storeUrl:'',star_num:0,list4:{},
      }
    },
    created(){
      this.sysWidth=document.body.clientWidth
      this.bgimg = localStorage.Img_path
      this.star_num=localStorage.star_num
      // 将数据放在当前组件的数据内
    },
    mounted(){
      if(this.star_num>2){
        this.type=1//展示好评
      }else if(this.star_num<3){
        this.type=2  //差评
      }
    },
    methods:{

    },
    watch:{

    }
  }
</script>
<style  lang="scss" scoped>
  .data-panel2{
    .head{
      width: 100%;
      img{
        width: 100%;height: 100%;
      }
    }
    .lists{
      padding:.1rem .3rem 0;
      h4{
        line-height: .5rem;text-align: center;
      }
      ul{
        display: flex;justify-content: space-between; margin-top: .1rem;
        li{
          list-style: none;border:1px solid #eee;border-radius: 10px;font-size: .14rem;width: .9rem;text-align: center; height:.3rem;padding:.05rem 0;
        }
        li.active{
          background: #ff4a4a;color:#fff
        }
      }
    }
    & > .lists:nth-last-of-type{
      margin-bottom: .6rem;
    }

  }
</style>

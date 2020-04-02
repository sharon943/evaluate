<template>
  <div class="header-container">
     <router-link class="left" :to="{name:'index'}">
        <img :src="logo_src" alt="" class="logo">
      	<h1 class="brand">{{name}}</h1>
      	<span style="font-size:14px">精确用户数据运营平台</span>
     </router-link>
     <section class="right">
       <router-link v-show="shop_view" :to="{name:'shopManage'}" :class="{active:activeindex==0}" @click="activeindex=0">门店管理</router-link>
       <router-link v-show="member_view" :to="{name:'memberManage'}" :class="{active:activeindex==1}" @click="activeindex=1">会员管理</router-link>
       <router-link v-show="Pic_view" :to="{name:'PicCenter'}" :class="{active:activeindex==2}" @click="activeindex=2">画像中心</router-link>
       <router-link v-show="market_view" :to="{name:'marketTool'}" :class="{active:activeindex==3}" @click="activeindex=3">营销中心</router-link>
       <router-link v-show="report_view" :to="{name:'monthReport'}" :class="{active:activeindex==4}" @click="activeindex=4">统计报表</router-link>
      <div @mouseleave="moreview=false">
       <router-link v-show="moreview&&more_view"  :to="{name:'more'}" :class="{active:activeindex==5}" @click="activeindex=5" style="position:absolute;top:55px;right:0;box-shadow: -1px 1px 1px 1px rgba(0,0,0,0.03);width: 160px;z-index: 99999;">系统设置</router-link>
       <router-link v-show="moreview&&goods_view" :to="{name:'goodsManage'}" :class="{active:activeindex==6}" @click="activeindex=6" style="position:absolute;top:110px;right:0;box-shadow: -1px 1px 1px 1px rgba(0,0,0,0.03);width: 160px;z-index: 99999">商品管理</router-link>
       <!-- <img @click="moreview=!moreview" class="more" src="../assets/img/_more.png" alt=""> -->
       <!--<img @click="moreview=!moreview" class="more" v-if="moreview" src="../assets/img/_more.png" alt="">-->
       <img @mouseenter="moreview=true" class="more" src="../assets/img/more.png" alt="">
      </div>
     </section>
   </div>
</template>
<script>
  import api from '../api/api'
  export default{
    data(){
       return{
         menu:['门店管理','会员管理','营销工具','统计报表'],shop_view:false,member_view:false,Pic_view:false,market_view:false,report_view:false,
         activeindex:'',moreview:false,name:'',logo_src:'',more_view:false,goods_view:false,
       }
    },
    mounted(){
    },
    created(){
    if(parseInt(localStorage.shop_view)>2){
      this.shop_view=true
    }
    if(parseInt(localStorage.member_view)>2){
      this.member_view=true
    }
    if(parseInt(localStorage.Pic_view)>2){
      this.Pic_view=true
    }
    if(parseInt(localStorage.market_view)>2){
      this.market_view=true
    }
    if(parseInt(localStorage.report_view)>2){
      this.report_view=true
    }
    if(parseInt(localStorage.more_view)>2){
      this.more_view=true
    }
    if(parseInt(localStorage.goods_view)>2){
      this.goods_view=true
    }
      this.name=localStorage.brand_name
      this.logo_src=localStorage.logo
    },
    methods:{

      more(){
        var box=document.getElementById('more')
        box.style.display='block'
        // this.$router.push('more')
      },
      q(c,o){
        console.log(c)
      }
    },
    watch: {
      activeindex: 'q'
    }
  }
</script>
<style scoped lang="scss">
.header-container{
	width:100%;
	height:55px;
	background-color:#FAFAFA;
  display: flex;
  justify-content: space-between;
	.left{
	height:100%;
	/*background:red;*/
	display:flex;
  justify-content: space-between;
    color: #9B9B9B;
    line-height: 55px;
    .logo{
      width:35px;
      height:35px;
      margin-top: 10px;
      margin-left: 20px;
      margin-right: 20px;
    }
    h1{
      font-size: 20px;
      color: #000;
      margin-right: 20px;font-family: "zy";font-weight: normal;
    }
    span{
      font-size: 14px;font-family: "zy";
    }
    }
    .right{
      width:auto;
	    height:100%;
	   /*background:blue;*/
      display:flex;
      justify-content: space-between;padding:0  0 0 20px;
      a{
        font-size: 14px;
        color: #9B9B9B;width:125px;
        line-height: 55px;font-family: "zy";text-align: center;display: block;
        background: #FAFAFA;
      }
      .router-link-active,.router-link-active:hover{
        background: #FF4A4A;
        color:white;
      }
      a:hover{
        background: #DCDCDC;
      }
      .more{
        width: 55px;
        height:55px;
        background: #77d04b;cursor: pointer;
      }
    }
}

</style>

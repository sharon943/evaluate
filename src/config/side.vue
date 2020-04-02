<template>
  <div class="side-container" ref="side" v-on:mouseover="visible" v-on:ouseout="display">
    <section class="top">
      <span v-for="(item,index) in top" :class="{active:activeindex===index}" @click="activeindex=index">{{item}}</span>
    </section>
    <section class="bottom">
      <!--<div class="person"></div>-->
      <!--<div class="mail"></div>-->
      <!--<div class="write"></div>-->
      <!--<div class="print"></div>-->
      <button>退出</button>
    </section>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        activeindex:0,
        top:['数据面板','123'],
        seen:true
      }
    },
    methods:{
      visible(){
        this.$refs.side.style.visibility='visible'
      },
      display(){
        this.$refs.side.style.visibility='hidden'
      }
    },
    mounted(){
        // this.$refs.side.style.opacity=0
      // this.$refs.side.onmouseenter()
    }
  }
</script>
<style scoped lang="scss">
  .side-container{
    visibility: hidden;
    float: right;
    width: 55px;
    height:calc(100% - 55px);
    background: #262626;
    text-align: center;
    position: relative;
    z-index: 9999;
    .top{
      width: 100%;
      height:40%;
      span{
        display: block;
        width: 100%;
        height:auto;
        word-wrap: break-word;
        letter-spacing: 20px;
        color:#fff;
        font-size: 20px;
        padding: 35px 17.5px;
      }
      .active{
        background: #FF4A4A;
      }
    }
    .bottom{
      position: absolute;
      bottom: 0;
      left:0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: 40px;
      height: 40%;
      padding-top: 50px;
      div{
        width: 40px;
        height: 40px;
        background: #77d04b;
        margin-top: 30px;
      }
    }
  }
  .side-container:hover{
    visibility: visible;
  }
</style>

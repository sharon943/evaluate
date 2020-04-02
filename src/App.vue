<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@font-face {
  font-family: 'xh';
  src: url('./assets/font/sy.otf');
}
@font-face {
  font-family: 'song';
  src: url('./assets/font/st.ttf');
}

*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
  font-size: .16rem;
  font-family: 'xh';
}
html,body{
  width: 100%;
}
.loading img{
  width: 100%;position: fixed;left:0;right:0;top:0;bottom: 0;margin:auto
}
.el-textarea__inner{
  resize:none!important;border-radius: 0;font-size: .12rem;min-height: .7rem!important;background: #FCFCFC;
}
.el-textarea__inner:focus{
border-color: #c0c4cc!important;
}
.el-rate__item {
  width: 30px!important;
}
.el-rate__icon {
  font-size: 22px!important;
}
  .el-radio{
    display: block!important;margin-bottom: .16rem!important;
  }
.el-radio+.el-radio {
  margin-left: 0!important;
}
.el-radio__input.is-checked+.el-radio__label {
  color: #A6937C!important;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #A6937C!important;
  background: #A6937C!important;
  box-shadow: none!important;
}
.LDbox .el-radio__input.is-checked .el-radio__inner {
  border-color: rgb(170,68,33)!important;
  background: rgb(170,68,33)!important;
  box-shadow: none!important;
}
.LDbox .el-radio__input.is-checked+.el-radio__label {
  color: rgb(170,68,33)!important;
}
  .class{
    width: 90% !important;
  }
</style>

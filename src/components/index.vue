<template>
  <div>
    <div v-if="pageone">
        <div style="height: 100%">
          <div v-if="loading" class="loading">
            <img src="../assets/img/loading.gif" alt="">
          </div>
          <div v-else-if="!loading&&kongbai" class="loading">

          </div>
          <div v-else class="box">
          <header :style="{height:sysWidth*0.6+'px'}">
            <img :src="data.evaluation.backgroundImg" alt="">
          </header>
          <section class="evaluate_service">
            <h3>俏凤凰感谢您的光临</h3>
            <h3>诚意邀您将体验感受反馈给我们</h3>
            <h3>我们将珍视您的评价</h3>
            <div>
              <h3>{{title}}:</h3>
              <el-rate  v-model="star_num" :colors="['#FF4A4A', '#A7D473', '#A7D473']" @change="valuechange($event)"></el-rate>
            </div>
            <span class="exptext">1星-2星为差评/3星-5星为好评</span>
            <p @click="go_view">下一步</p>
          </section>
          </div>
        </div>
    </div>
    <div v-else class="data-panelll">
      <section class="top">
        <img src="../assets/img/view.png" alt="">
      </section>
      <h1 v-if="type==1">谢谢您的评价</h1>
      <h1 v-else-if="type==2">您已评价完成</h1>
      <p @click="go_home" class="goCenter" v-if="isweixn==1">进入会员中心</p>
      <footer @click="go_url" :style="{height:sysWidth+'px'}">
        <img :src=bgimg alt="">
      </footer>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import api from '../api/api'
  import axios from 'axios'
  export default {
  name: 'index',
  data(){
    return {
       sysWidth:'',value1: null,value2: null,desc1:'',desc2:'',activeI:'',sttt:true,worclick:[],worclick_good:[],ff:true,
       labels:['分量少','有杂物','不新鲜','价格贵','分量不足','包装','分量不足','包装简陋'],data:{},transid:'',loading:true,problemAndLabelList:[],
       worse_env:[],good_env:[],award:'',kongbai:false,viviposSeq:'',pageone:true,isweixn:1,
      bgimg:'',star_num:0,title:'',
      type:0,
      storeid:'',
      advertisementUrl:'',
      storeUrl:'',
    }
  },
  components:{

  },
  created(){
    this.sysWidth=document.body.clientWidth
    this.UrlSearch()
    this.getdata()
  },
  mounted(){
  },
  methods: {

    go_home(){
      window.location.href = this.storeUrl
    },
    go_url(){
      window.location.href = this.advertisementUrl
    },
     UrlSearch() {
     var name,value;
     var str=location.href; //取得整个地址栏
     var num=str.indexOf("?")
     str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
         var arr=str.split("&"); //各个参数放到数组里
       console.log(arr)
         for(var i=0;i < arr.length;i++){
           num=arr[i].indexOf("=");
           if(num>0){
             name=arr[i].substring(0,num);
             value=arr[i].substr(num+1);
             this[name]=value;
           }
           if(this[name].indexOf('#')!=-1){
             var ss=this[name].indexOf('#')
             this[name]=this[name].substring(0,ss)
           }
         }

         if(this.isweixn==2){
           localStorage.isweixn=2
         }else{
           localStorage.isweixn=1
         }



   } ,
    valuechange(d){
      localStorage.star_num=d
      var box=document.getElementsByClassName('el-icon-star-on')
      for(var i=0;i<box.HTMLCollection.length;i++){
        console.log(box.HTMLCollection[i].attributes[1])
      }
    },
    go_view(){
         if(this.star_num<1){
           this.$message.error('请对总体满意度做一个评价');
           return
         }
         this.$router.push({
           name:'view',
         })
    },
    getdata(){
      if(this.transid==''||this.transid==null||this.transid==undefined){
        this.transid=null
      }
      if(this.viviposSeq==''||this.viviposSeq==null||this.viviposSeq==undefined){
        this.viviposSeq=null
      }
      fetch(api.baseUrl+'/webapi/v4/evaluation/get/'+this.transid+'/'+this.viviposSeq,{
        method:'GET',
        headers:{
          storeId:this.storeid,
        },
      }).then(r=>r.json()).then(d=>{
        console.log(d.data)
        if(d.code==200){
          this.loading=false
          this.data=d.data
          var lists4arr=[]
          this.transid=d.data.transId
          localStorage.obj=JSON.stringify(d)
          localStorage.Img_path=d.data.evaluation.backgroundImg
          localStorage.storeid=d.data.evaluation.parentId
          localStorage.transid=d.data.transId
          for(var i=0;i<d.data.problemAndLabelList.length;i++){
            if(d.data.problemAndLabelList[i].displayLevel==1){
              this.title=d.data.problemAndLabelList[i].problemName
              localStorage.title=d.data.problemAndLabelList[i].problemName
              localStorage.list1=JSON.stringify(d.data.problemAndLabelList[i])
            }else if(d.data.problemAndLabelList[i].displayLevel==3){
              localStorage.list3=JSON.stringify(d.data.problemAndLabelList[i])
            }else if(d.data.problemAndLabelList[i].displayLevel==4){
              lists4arr.push(d.data.problemAndLabelList[i])
            }
          }
          localStorage.list4=JSON.stringify(lists4arr)
          if(d.data.evaluation.template==2){
            this.$router.push({
              name:'home',
              query:{
                transid:this.transid,
                type:1,
              },
            })
          }else if(d.data.evaluation.template==3){
            this.$router.push({
              name:'LD',
              query:{
                transid:this.transid,
                type:1,
              },
            })
          }

        }else if(d.code==2018071909){
            this.loading=false
            if(d.data.evaluation.template==2){
              localStorage.obj=JSON.stringify(d)
              this.$router.push({
                name:'home',
                query:{
                  transid:this.transid,
                  type:2
                },
              })
            } else if(d.data.evaluation.template==3){
              localStorage.obj=JSON.stringify(d)
              this.$router.push({
                name:'LD',
                query:{
                  transid:this.transid,
                  type:2
                },
              })
            }else{
              this.pageone=false
              this.bgimg=d.data.evaluation.advertisementImg
              this.type=2
              this.storeid=d.data.evaluation.parentId
              this.advertisementUrl=d.data.evaluation.advertisementUrl
              this.storeUrl=d.data.storeUrl
              // this.$router.push({
              //   name:'view',
              //   query:{
              //     Img_path:d.data.evaluation.advertisementImg,
              //     type:2,
              //     storeid:d.data.evaluation.parentId,
              //     advertisementUrl:d.data.evaluation.advertisementUrl,
              //     storeUrl:d.data.storeUrl
              //   },
              // })
            }

        }else if(d.code==1089){
          this.loading=false
          this.kongbai=true
          this.$alert(d.message, '提示', {
            confirmButtonText: '确定',
            center: true,
            customClass:'class',
            callback: action => {

            }
          });
        }else{

          this.loading=false
          this.kongbai=true

          if(this.isweixn==2){
            this.$alert(d.message, '提示', {
              confirmButtonText: '确定',
              center: true,
              customClass:'class',
              callback: action => {


              }
            });
          }else{
            this.$alert(d.message+',点击确定去会员中心', '提示', {
              confirmButtonText: '确定',
              center: true,
              customClass:'class',
              callback: action => {
                window.location.href = d.data.storeUrl
              }
            });
          }

        }

      })

    },
    q(c,o){
      console.log(c)
    }

  },


}
</script>
<style scoped lang="scss">
.exptext{
  color:red;font-size: .12rem;text-align: center;width: 100%;display: block;margin-top: .05rem;
}
  header{
    width: 100%;
    img{
      width: 100%;height: 100%;
    }
  }

  .evaluate_service{
    padding: 0.2rem .12rem;background: #fff;
    & > h3{
      font-size: .16rem;color: #000;font-weight: normal;text-align: center;
    }
    & > div{
      display: flex;justify-content: space-between;width: 80%;margin:0.2rem auto 0;
       h3{
         text-align: left;
       }
      .el-rate{
        text-align: right;
      }
    }
     p{
       width: 120px;height:40px;line-height: 40px;left:0;right:0;margin-left:auto;margin-right:auto;text-align: center;background: yellow;position: fixed;bottom: .3rem;
     }
  }

  .data-panelll{
    .goCenter{
      position: fixed;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      top: 1.4rem;
      font-size: .16rem;
      text-align: center;
      border: 1px solid #c9c9c9;
      color: #a0a0a0;
      width: 1.3rem;
      height: .3rem;
      line-height: .3rem;
      border-radius: .08rem;
      font-weight: normal;
    }
    .top{
      position: fixed;width: 70px;height: 70px;left:0;right:0;margin-left: auto;margin-right: auto;top:.35rem;
      img{
        width: 100%;height: 100%;
      }
    }
    h1{
      position: fixed;left:0;right:0;margin-left: auto;margin-right: auto;top:1.1rem;font-size: .16rem;width: 100%;text-align: center;
    }
    footer{
      width: 100%;position: fixed;bottom: 0;left:0;
      img{
        width: 100%;height: 100%;
      }
    }
  }



</style>


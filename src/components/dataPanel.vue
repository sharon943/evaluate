<template>
   <div class="data-panelspe">
     <section class="head" :style="{height:(sysWidth/2)+'px'}">
       <img :src=bgimg alt="">
     </section>
      <section class="text">
        <h3>您好！谢谢您光临<span style="color:#ff4a4a">俏凤凰</span> </h3>
        <h3>请给本次餐厅用餐体验评分</h3>
        <div class="satisfaction">
          <h3>{{title}}:</h3>
          <el-rate v-model="star_num" :colors="['#FF4A4A', '#A7D473', '#A7D473']" @change="valuechange($event)"></el-rate>
        </div>
        <div class="lists" v-for="(item,index) in problemAndLabelList">
          <h4>{{item.problemName}}</h4>
          <ul v-show="type==1">
              <li v-for="(row,rows) in item.labelList" v-if="row.labelGrade>2" :class="{active:row.status==1}" @click="goodclick(row,item,index,rows)">{{row.name}}</li>
          </ul>
          <ul v-show="type==2">
              <li v-for="(row,rows) in item.labelList" :class="{active:row.status==1}" v-if="row.labelGrade<3" @click="badclick(row,item,index,rows)">{{row.name}}</li>
           </ul>

        </div>
        <textarea  class="textarea" placeholder="留言：我们期待您能对俏凤凰对成长提出建议或意见!" v-model="suggest"></textarea>
        <p @click="go_home" class="goCenter">确认提交</p>
      </section>
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
          advertisementUrl:'',problemAndLabelList:[],  goodarr:[],  badarr:[],
          storeUrl:'',star_num:0,listlength:0,list1:{},list3:{},title:''
       }
     },
    created(){
      this.alldata = JSON.parse(localStorage.obj).data
      this.sysWidth=document.body.clientWidth
      this.bgimg = localStorage.Img_path
      this.star_num = localStorage.star_num
      this.list1=JSON.parse(localStorage.list1)
      this.list3=JSON.parse(localStorage.list3)
      // 将数据放在当前组件的数据内
    },
     mounted(){
       this.title=localStorage.title

       this.problemAndLabelList=[]
         for(var k=0;k<this.alldata.problemAndLabelList.length;k++){
           if(this.alldata.problemAndLabelList[k].displayLevel==2){
             this.problemAndLabelList.push(this.alldata.problemAndLabelList[k])
           }
         }
       this.goodarr=[]
       this.badarr=[]
       if(this.star_num>2){
         this.type=1//展示好评页面

       }else if(this.star_num<3){
         this.type=2//展示差评页面
       }
       for(var i=0;i<this.problemAndLabelList.length;i++){
         for(var j=0;j<this.problemAndLabelList[i].labelList.length;j++){
           this.problemAndLabelList[i].labelList[j].status=0
         }

       }
     },
     methods:{
       goodclick(d,item,i,j){
         switch (d.status) {
           case 0:  this.problemAndLabelList[i].labelList[j].status=1;break;
           case 1:  this.problemAndLabelList[i].labelList[j].status=0;break;
         }

         var aa= this.problemAndLabelList[i]
        Vue.set(this.problemAndLabelList, i, aa)
        this.problemAndLabelList.splice(i, 1, aa)

       } ,
       badclick(d,item,i,j){
         switch (d.status) {
           case 0:  this.problemAndLabelList[i].labelList[j].status=1;break;
           case 1:  this.problemAndLabelList[i].labelList[j].status=0;break;
         }
         var aa= this.problemAndLabelList[i]
         Vue.set(this.problemAndLabelList, i, aa)
         this.problemAndLabelList.splice(i, 1, aa)

       } ,
       valuechange(d){
         if(d>2){
           this.type=1
           for(var t=0;t<this.problemAndLabelList.length;t++){
             for(var y=0;y<this.problemAndLabelList[t].labelList.length;y++){
               if(this.problemAndLabelList[t].labelList[y].labelGrade>2){
                 this.problemAndLabelList[t].labelList[y].status=0
               }
             }
           }
         }else if(d<3){
           this.type=2
           for(var t=0;t<this.problemAndLabelList.length;t++){
             for(var y=0;y<this.problemAndLabelList[t].labelList.length;y++){
               if(this.problemAndLabelList[t].labelList[y].labelGrade<3){
                 this.problemAndLabelList[t].labelList[y].status=0
               }
             }
           }
         }
       },
       go_home(){
          localStorage.star_num=this.star_num

         var lists=this.problemAndLabelList
         var flag=false
         for(var t=0;t<lists.length;t++){
           for(var y=0;y<lists[t].labelList.length;y++){
             if(lists[t].labelList[y].status==1){
               flag=true
             }
           }
         }
         if(!flag){
           this.$message.error('请选择标签！');
           return
         }

         var params=[]
         params.push({problemId:this.list1.problemId,problemName:this.list1.problemName,grade:this.star_num,text:this.list1.text,labelList:[],displayLevel:1})
         for(var i=0;i<lists.length;i++){
           var obj={problemId:'',problemName:'',grade:'',text:'',labelList:[]}
           obj.problemName=lists[i].problemName
           obj.problemId=lists[i].problemId
             obj.grade=lists[i].grade
           obj.text=lists[i].text
           obj.displayLevel=lists[i].displayLevel
           for(var j=0;j<lists[i].labelList.length;j++){
               var obj_={id:'',parentId:'',problemId:'',name:''}
               if(lists[i].labelList[j].status==1){
                 obj_.id=lists[i].labelList[j].id
                 obj_.parentId=lists[i].labelList[j].parentId
                 obj_.problemId=lists[i].labelList[j].problemId
                 obj_.name=lists[i].labelList[j].name
                 obj.labelList.push(obj_)
               }
             }


           params.push(obj)
         }
         params.push({problemId:this.list3.problemId,problemName:this.list3.problemName,grade:this.list3.grade,text:this.suggest,labelList:[],displayLevel:3})

         localStorage.paramsarr=JSON.stringify(params)
         this.$router.push({
           name:'viewA',
         })
       },

     },
      watch:{

      }
   }
</script>
<style  lang="scss" scoped>
.data-panelspe{
  .head{
    width: 100%;
    img{
      width: 100%;height: 100%;
    }
  }
  .goCenter{
    margin: 0 auto .5rem;display: block;
    font-size: .16rem;
    text-align: center;
   background: yellow;
    color: #000;
    width: 1.3rem;
    height: .3rem;
    line-height: .3rem;
    border-radius: .08rem;
    font-weight: normal;
  }
  .text{
    padding-top: .1rem;
    & >h3{
      font-size: .16rem;width: 100%;text-align: center;color: #000;font-weight: normal;
    }
    .textarea{
      resize:none;  padding:.1rem;
      width: 75%;height:.8rem;margin:0.1rem auto 0.7rem;display: block;border:1px solid #eee;   border-radius: 10px;        font-size: .13rem;

    }
    .textarea::placeholder{
      font-size: .13rem;
    }
     .textarea:focus{
       border:1px solid #eee;outline:none;
     }
    .satisfaction{
      display: flex;justify-content: space-between;width: 78%;margin:.1rem auto 0;border-top:1px solid #eee;padding-top: .1rem;
      h3{
        width: 40%;
      }
    }
    .lists{
      display: flex;justify-content: space-between; padding:0 .1rem;
      h4{
        line-height: .5rem;
      }
      ul{
        display: flex;justify-content: space-between;   width:85%; margin-top: .1rem;
        li{
          list-style: none;border:1px solid #eee;border-radius: 10px;font-size: .14rem;width: .9rem;text-align: center; height:.3rem;padding:.05rem 0;
        }
        li.active{
          background: #ff4a4a;color:#fff
        }
      }
    }
  }

}
</style>

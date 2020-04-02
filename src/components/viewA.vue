<template>
  <div class="data-panel1">
    <section class="head" :style="{height:(sysWidth/2)+'px'}">
      <img :src=bgimg alt="">
    </section>
      <div class="lists" v-for="(item,index) in list4">
        <h4>{{item.problemName}}</h4>
        <ul>
          <li v-for="(row,rows) in item.radioLabelList" :class="{active:row.status==1}" @click="goodclick(row,item,index,rows)">{{row.name}}</li>
        </ul>
      </div>
      <p @click="go_home" class="goCenter">完成评价</p>

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
      this.list4=JSON.parse(localStorage.list4)
      // 将数据放在当前组件的数据内
    },
    mounted(){
      for(var i=0;i<this.list4.length;i++){
        this.list4[k].labelflag=false
        for(var j=0;j<this.list4[i].radioLabelList.length;j++){
          this.list4[i].radioLabelList[j].status=0
        }
      }
    },
    methods:{
      goodclick(d,item,i,j){
        for(var k=0;k<this.list4.length;k++){
          for(var t=0;t<this.list4[k].radioLabelList.length;t++){
            if(k==i&&t==j&&this.list4[k].radioLabelList[t].status==0){
              this.list4[k].radioLabelList[t].status=1
              this.list4[k].labelflag=true
            }else{
              this.list4[k].radioLabelList[t].status=0
            }
          }
        }
        var aa= this.list4[i]
        Vue.set(this.list4, i, aa)
        this.list4.splice(i, 1, aa)

      } ,

      go_home(){
        var para=[]

        for(var i=0;i<this.list4.length;i++){
          if(!this.list4[i].labelflag){
            this.$message.error('请对'+this.list4[i].problemName+'作出选择');
            return
          }
          var obj={problemId:'',problemName:'',text:'',radioLabelList:[]}
          obj.problemName=this.list4[i].problemName
          obj.problemId=this.list4[i].problemId
          obj.text=this.list4[i].text
          obj.displayLevel=this.list4[i].displayLevel
          for(var j=0;j<this.list4[i].radioLabelList.length;j++){
            var obj_={id:'',parentId:'',problemId:'',labelGrade:'',name:''}
            if(this.list4[i].radioLabelList[j].status==1){
                obj_.id=this.list4[i].radioLabelList[j].id
                obj_.parentId=this.list4[i].radioLabelList[j].parentId
                obj_.problemId=this.list4[i].radioLabelList[j].problemId
                obj_.labelGrade=this.list4[i].radioLabelList[j].labelGrade
                obj_.name=this.list4[i].radioLabelList[j].name
                obj.radioLabelList.push(obj_)
            }
          }
          para.push(obj)

        }
        var paramsarr=JSON.parse(localStorage.paramsarr)
        for(var k=0;k<para.length;k++){
          paramsarr.push(para[k])
        }
       this.pushdata(paramsarr)
      },
      pushdata(d){
        fetch(api.baseUrl+'/webapi/v4/evaluation/add/'+localStorage.transid,{
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(d)
        }).then(r=>r.json()).then(d=>{
          if(d.code==200){
            this.$router.push({
              name:'thanksupport',
            })
          }else{
            this.$message.error(d.message);
          }
        })
      }
    },
    watch:{

    }
  }
</script>
<style  lang="scss" scoped>
  .data-panel1{
    .head{
      width: 100%;
      img{
        width: 100%;height: 100%;
      }
    }
    .goCenter{
      position: fixed;left:0;right:0;margin-left: auto;margin-right: auto;bottom:.5rem;
      display: block;
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

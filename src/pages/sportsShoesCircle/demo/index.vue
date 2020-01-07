<template>
  <div>
    <el-card class="box-card">
      <div>
        <i class="el-icon-location" style="float:left;"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:25px;">      
          <el-breadcrumb-item v-for="item in topPath" :key="item.path" style="cursor:pointer"><font color="#1C83B8">{{item.val}}</font></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>

     <el-card class="box-card">
      <el-collapse accordion>
        <i class="el-icon-info" style="float:left; margin-top:15px;"></i>
        <el-collapse-item title="基本信息" name="1" style="margin-left:25px;">
          <div>
            <label>当前位置：<font color="#1C83B8" style="cursor:pointer">{{topPath[topPath.length-1].val}}</font></label><br/>
            <label>品牌数目：<font color="#1C83B8">{{tableCategory.length}}</font></label>
          </div>
          <div>能用兴趣养活兴趣的兴趣才叫兴趣，否则就叫烧钱！</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

  
    <el-row>
      <el-col :span="5" v-for="(singeCategory, index) in tableCategory" :key="index" @click.native="jump2Brand(singeCategory)">       
          <el-card :body-style="{ padding: '1.5px', margin: '6.5px' }" shadow="hover" style="margin: 6.5px; cursor:pointer"  class="element-card">   
            <img :src="singeCategory.logo">            
            <div style="padding: 9px;" class="bottom clearfix">
              <span>{{singeCategory.categoryName}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
              </div>
            </div>
          </el-card>    
      </el-col>
    </el-row>
  
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  created() {
    this.getCategoryNameList();
  },
  data() {
    return {
      currentDate: new Date(),
      topPath: [
        {path: 'category', val: '主品牌', index: 0}            
      ],
      singeCategory: '',
      transferCategory: '',
      tableCategory: [],
    };
  },
  methods: {
    getCategoryNameList() {
      this.axios.get(`/list/categoryName`)
        .then(data => {
          this.tableCategory = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    jump2Brand(singeCategory){
      this.$router.push({
    　　path: '/sportsShoesCircle/demo/brand',
    　　query: {
          category: singeCategory,
　　    }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 18px;
    line-height: 18px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .element-card { 
      position:relative; 
      -webkit-transform-style:preserve-3d; 
      transform-style:preserve-3d; 
      -webkit-transform:rotatey(0deg) translatex(0px) translatey(0px); 
      transform:rotatey(0deg) translatex(0px) translatey(0px); 
      -webkit-transition:all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55); 
      transition:all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55); 
      box-shadow:4px 4px 20px rgba(0,0,0,0.4); 
      margin:5px; 
      cursor:pointer; 
  } 
  .element-card:hover { 
      -webkit-transform:rotatey(45deg) translatex(0px) translatey(0px); 
      transform:rotatey(45deg) translatex(0px) translatey(0px); 
  } 
  
</style>

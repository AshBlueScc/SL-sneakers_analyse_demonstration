<template>
  <div>
    <el-card class="box-card">
      <div>
        <i class="el-icon-location" style="float:left;"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:25px;">      
          <el-breadcrumb-item v-for="item in topPath" :key="item.path" style="cursor:pointer" @click.native="curClick(item)"><font color="#1C83B8">{{item.val}}</font></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>

     <el-card class="box-card">
      <el-collapse accordion>
        <i class="el-icon-info" style="float:left; margin-top:15px;"></i>
        <el-collapse-item title="基本信息" name="1" style="margin-left:25px;">
          <div>
            <label>当前位置：<font color="#1C83B8" style="cursor:pointer">{{topPath[topPath.length-1].val}}</font></label><br/>
            <label>品牌数目：<font color="#1C83B8">{{brands.length}}</font></label>
          </div>
          <div>能用兴趣养活兴趣的兴趣才叫兴趣，否则就叫烧钱！</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

  
    <el-row>
      <el-col :span="5" v-for="(singleBrand, index) in brands" :key="index" @click.native="jump2Product(singleBrand)">       
          <el-card :body-style="{ padding: '1.5px', margin: '6.5px' }" shadow="hover" style="margin: 6.5px; cursor:pointer;"  class="element-card">   
            <img :src="singleBrand.logo">            
            <div style="padding: 14px;" class="bottom clearfix">
              <span>{{singleBrand.brandName}}</span>
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
    this.getBrands();
  },
  data() {
    return{
      currentDate: new Date(),
      topPath: [
        {path: 'category', val: '主品牌', index: 0},
        {path: 'brand', val: '子品牌', index: 1}               
      ],
      brands: [],
      singleBrand: ''
    }
  },
  methods: {
    getBrands(){
      this.brands = this.$route.query.category.brands
    },
    jump2Product(singleBrand){
      this.$router.push({
    　　path: '/sportsShoesCircle/product',
    　　query: {
          brand: singleBrand,
          categoryName:  this.$route.query.category.categoryName,
          category: this.$route.query.category
　　    }
      })
    },
    jump2Category(){
      this.$router.push({
    　　path: '/sportsShoesCircle/index',
    　　query: {
　　    }
      })
    },
    curClick(item) {
      if(item.index == 0) {
        this.jump2Category();
      }
    }
  }
};
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

  img {
    height: 100%;
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

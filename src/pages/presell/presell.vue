<template>
    <div>
      <el-card class="box-card">
        <div>
          <div style="float: left; padding-bottom=:4px;">  
            <label style="top: 2px;">发售地区选择:</label>  
            <el-select v-model="regionValue" placeholder="请选择" style="bottom: 7.5px;" @change="getresellInfo(), changeSign()">
              <el-option
                v-for="item in regionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="float: right;">   
            <el-switch
              v-model="switchValue"
              active-text="显示所有预售"
              inactive-text="不显示过期预售" @change="getresellInfo()">
            </el-switch>
          </div>
        </div>
      </el-card>

      <el-row>
        <el-col :span="8" v-for="(item, index) in cardsData" :offset="0.5" :key="index" lazy>
          <el-card style="position: relative; width:450px; height:680px; float: left;">
            <!-- {{item}} -->
            <el-image :src="item.images[0]" :preview-src-list="item.images" lazy/>
            <!-- 名称 -->
            <span style="position: absolute; bottom: 500px; left: 150px;">{{item.name}}</span>
            <!-- 品牌名 -->
            <span style="position: absolute; bottom: 450px; left: 150px;">{{item.title}}</span>
            <div>
              <div style="float: left;width: 200px; margin-right: 0px;">
                <p>预售价格:{{sign}}{{item.price}}</p>      
                <p>预售时间:{{item.startSellDate | formatTime}}</p>             
              </div>
              <div style="float: right;width: 200px; margin-right: 0px;">
                <p>du价格:???</p>
                <p>数据更新时间:{{item.lastUpdatedDate | formatTime}}</p>
              </div>
              <div style="float: left;width: 400px; margin-right: 0px;">
                <label>尺码:</label>
                <el-select size="mini" v-model="item.sizeValue" placeholder="36" @change="hadnleChange(item)">
                  <el-option
                    v-for="entry in item.sizes"
                    :key="entry.localizedSize"
                    :label="entry.localizedSize"
                    :value="entry.localizedSize">
                  </el-option>
                </el-select>
                <br/>
                <el-tag      
                  v-for="(tag,index) in item.tags"
                  :key="index"
                  :disable-transitions="false">
                  {{tag}}
                </el-tag>
              </div>  
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import dateformat from 'dateformat'
import { dateTransfer } from 'src/utils/utils'
import { Loading } from 'element-ui';
  export default {
    created(){
      this.getresellInfo();
    },
    data(){
      return{
        cardsData: [],
        sizeValue: '',
        sizeToPrice: '',
        switchValue: false,
        regionValue: 'CN',
        sign: '￥',
        regionOptions:[{
            value:'CN',
            label:'中国区'
          },{
            value:'JP',
            label:'日本区'
          },{
            value:'UK',
            label:'英国区'
          },{
            value:'US',
            label:'美国区'
          }]
      };
    },
    methods: {
      getresellInfo(){
        let loadingInstance = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'  
        });
        this.axios.get(`/presellInfo?isAll=${this.switchValue}&region=${this.regionValue}`)
        .then(content => {
          this.cardsData = content.data
        })
        .catch(error => {
          console.log(error)
        })
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        })
      },

      hadnleChange(item) {
        // console.log(item.sizeValue)
        // sizeToPrice= item.sizes.find(x => x.localizedSize === sizeValue)
      },
      changeSign(){
        if(this.regionValue == 'CN'){
          this.sign = '￥'
        }else if(this.regionValue == 'JP'){
          this.sign = '円'
        }else if(this.regionValue == 'UK'){
          this.sign = '￡'
        }else if(this.regionValue == 'US'){
          this.sign = '$'
        }
      }
    },

    filters: {
      formatTime(t) {
        return dateTransfer(dateformat(t, 'yyyy-mm-dd HH:MM:ss'));
      }
    }
  }
</script>
<style lang="scss" scoped>

  p{margin: 15px auto}
  
  .el-image{
    width: 400px;
    height: 450px;
  }

  /*中间鞋子基础信息*/
  div.info{
    margin:0 0px;
    // height: 250px;
    background-color:white;
    float:left;
  }
</style>

<style lang="scss">
.el-image__error, .el-image__inner, .el-image__placeholder {
  width:100%;
  height:100%;
}
</style>
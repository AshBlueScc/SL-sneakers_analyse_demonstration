<template>
  <div class="index">
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
            <label>品牌数目：<font color="#1C83B8">{{1}}</font></label>
          </div>
          <div>能用兴趣养活兴趣的兴趣才叫兴趣，否则就叫烧钱！</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

     <div>
      <el-card class="box-card" >
        <div style="position: relative; width:450px; float: left;">
          <el-carousel height="300px" width="450px">
            <el-carousel-item v-for="item in detail.images.split(';').slice(0,-1)" :key="item">
              <el-image :src="item" style=""/>
              <span style="position: absolute; bottom: 20px; left: 10px;">{{detail.title}}</span>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="info">
          <template>       
            <div style="float: left; width: 400px; margin-right: 0;">
              <label>尺码:</label>
              <el-select size="mini" v-model="sizeValue" placeholder="36" @change="sizeToPrice= latestSizePrice.find(x => x.size === sizeValue), getLatestWeekPrice()">
                <!-- <template slot-scope="scope"> -->
                  <el-option
                    v-for="item in latestSizePrice"
                    :key="item.id"
                    :label="item.size"
                    :value="item.size">
                  </el-option>
                <!-- </template> -->
              </el-select>
              <p>品类:{{categoryName}}</p>
              <p>商标:{{brandName}}</p>
              <p>名称:<font color="wheat">{{detail.title}}</font></p>
              <p>发售日期:{{detail.sellDate}}</p>
              <p>货号:{{detail.articleNumber}}</p>
              <p>颜色:{{detail.color}}</p>
              <p>发售价:{{detail.authPrice/100}}</p>     
            </div>
            <div style="float: right;width: 400px; margin-right: 0px;">
              <p>现货出售技术服务费:{{detail.sellTitle}}</p>
              <p>立即出售技术服务费:{{detail.sellNowTitle}}</p>
              <p>销量:{{latestSoldNum.soldNum}}</p>
              <p>数据更新时间:{{dateTransfer(sizeToPrice.pdate)}}</p>
              <p>立即购买,现货出售价格:{{sizeToPrice.itemPrice/100}}</p>
              <p>闪电直发价格:{{sizeToPrice.consignItemPrice/100}}</p>
              <p>立即变现价格:{{sizeToPrice.buyerBiddingItemPrice/100}}</p>
              <p>面板显示价格:{{sizeToPrice.showItemPrice/100}}</p>
            </div>
          </template>
        </div>
      </el-card>

      <el-card>     
        <div class="line">
          <div class="line-list">
            <el-row style="margin-bottom: 16px;">
              <el-col :span="12" style="padding-right: 4px;">
                <el-card>
                  <div slot="header">一周价格趋势图</div>
                  <chart ref="A" :options="optionsA" style="width: 100%;"></chart>
                </el-card>
              </el-col>
              <el-col :span="12" style="padding-left: 4px;">
                <el-card>
                  <div slot="header">一周销量趋势图</div>
                  <chart ref="B" :options="optionsB" style="width: 100%;"></chart>
                </el-card>
              </el-col>
              <el-col :span="24" style="padding-top: 8px;">
                <el-card>
                  <div slot="header">一月销量价格趋势图</div>
                  <!-- <chart ref="C" :options="optionsC" style="width: 100%;"></chart> -->
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
  export default {   
    created() {
        this.getProductDetail();
        this.getDetailByProduct();
        this.getLatestSoldNumByProductId();
        this.getLineDataLatestWeekSoldNum();     
    },
    data() {
      return {
        topPath: [
            {path: 'category', val: '主品牌', index: 0},
            {path: 'brand', val: '子品牌', index: 1},    
            {path: 'product', val: '产品', index: 2},
            {path: 'detail', val: '详细信息', index: 3}      
        ],  
        categoryName: '',
        brandName: '',
        sizeToPrice: '',
        latestSizePrice: '',
        sizeValue: '',
        latestSoldNum: '',
        detail: '',
        optionsA: {
          title: {
            show: false,
            text: '一周价格趋势图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            bottom: 0,
            data: ['现货出售', '闪电直发', '立即变现', '显示价格']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: null
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}元'
              }
            }
          ],
          series: [
            {
              name: '现货出售',
              type: 'line',
              stack: '总量',
              data: null,
              itemStyle: {
                normal: {
                  color: '#2EC7C9'
                }
              }
            },
            {
              name: '闪电直发',
              type: 'line',
              stack: '总量',
              data: null,
              itemStyle: {
                normal: {
                  color: '#B6A2DE'
                }
              }
            },
            {
              name: '立即变现',
              type: 'line',
              stack: '总量',
              data: null,
              itemStyle: {
                normal: {
                  color: '#5AB1EF'
                }
              }
            },
            {
              name: '显示价格',
              type: 'line',
              stack: '总量',
              data: null,
              itemStyle: {
                normal: {
                  color: '#FFB980'
                }
              }
            }
          ]
        },
        optionsB: {
          title: {
            show: false,
            text: '一周销量趋势图（日销量）',
            subtext: '日销量'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            left: 0,
            data: ['日销量']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: null
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}件'
              }
            }
          ],
          series: [
            {
              name: '日销量',
              type: 'line',
              data: null,
              itemStyle: {
                normal: {
                  color: '#B6A2DE'
                }
              },
              markPoint: {
                data: [
                  {name: '日最低'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        },
      }
    },
    methods: {
        dateTransfer(date) {
            var d = new Date(date-8*60*60*1000);
            var d1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            return d1;
        },
        getProductDetail(){
            this.detail = this.$route.query.pdetail;    
            this.categoryName = this.$route.query.categoryName;
            this.brandName = this.$route.query.brandName;
        },
        getDetailByProduct() {
            this.axios.get(`/list/latestHistoryPrice?productId=${this.$route.query.pdetail.productId}`)
            .then(data => {
                this.latestSizePrice = data
                this.sizeToPrice = this.latestSizePrice[0]
            })
            .catch(error => {
                console.log(error)
            })
        },
        getLatestSoldNumByProductId() {
        this.axios.get(`/get/soldNum?productId=${this.$route.query.pdetail.productId}`)
          .then(data => {
            this.latestSoldNum = data;
          })
          .catch(error => {
            console.log(error)
          })
        },
        //后面等数据齐全需要修改为具体的productId
        getLineDataLatestWeekSoldNum() {
            this.axios.get(`/getLatestWeekSoldNum?productId=${this.$route.query.pdetail.productId}`)
            .then(data => {
                const options = data;        
                const chartB = this.$refs['B'];
                chartB.showLoading();

                Vue.nextTick(()=>{ 
                chartB.mergeOptions({
                    series: options.series,
                    xAxis: options.xAxis
                });

            })
            setTimeout(() => {
                chartB.hideLoading();
            }, 1000);
            }
            )
            .catch(error => {
                chartB.hideLoading();
                console.log(error);
            });
        },
        getLatestWeekPrice(){
            this.axios.get(`/getLatestWeekPrice?productId=${this.$route.query.pdetail.productId}&size=${this.sizeToPrice.size}`)
            .then(data => {
                const options = data
                const chartA = this.$refs['A']
                chartA.showLoading()

                Vue.nextTick(()=>{
                chartA.mergeOptions({
                    series: options.series,
                    xAxis: options.xAxis
                })
                });
                setTimeout(() => {
                chartA.hideLoading()
                }, 1000);
            })
            .catch(error => {
                chartA.hideLoading()
                console.log(error)
            })
        },
        jump2Brand(){
            this.$router.push({
    　　        path: '/sportsShoesCircle/brand',
        　　    query: {
                    category: this.$route.query.category,
    　　        }
            })
        },
        jump2Category() {
            this.$router.push({
    　　        path: '/sportsShoesCircle/index',
        　　    query: {
    　　        }
            })
        },
        jump2Product(singleBrand){
            this.$router.push({
            　　path: '/sportsShoesCircle/product',
            　　query: {
                    brand: this.$route.query.brand,
                    categoryName: this.$route.query.categoryName,                  
                    category: this.$route.query.category
        　　    }
            })  
        },    
        curClick(item) {
            if(item.index == 0){
                this.jump2Category();
            }
            if(item.index == 1) {
                this.jump2Brand();
            }
           if(item.index == 2) {
                this.jump2Product();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
  /*左边鞋图轮换*/
  .el-carousel__item {
    width:450px;
    height: 300px;
    float:left;
    background-color:white;
  }

  /*中间鞋子基础信息*/
  div.info{
    margin:0 0px;
    height: 250px;
    background-color:white;
  }
 
  div.el-carousel--horizontal{
    width: 450px;
  }  

  p{margin: 10px auto}
  
</style>
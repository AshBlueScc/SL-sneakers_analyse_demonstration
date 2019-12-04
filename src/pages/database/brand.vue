<%--
@Project Name: vue-admin
@Author: luichooy
@Date: 2017-11-17 16:03
@Email: luichooy@163.com
@Idea: WebStorm
--%>

<template>
  <div class="line">
    <div class="line-list">
      <el-row style="margin-bottom: 16px;">
        <el-col :span="12" style="padding-right: 4px;">
          <el-card>
            <!-- <div slot="header">一周价格趋势图</div>
            <chart ref="A" :options="optionsA" style="width: 100%;"></chart> -->
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
            <!-- <div slot="header">一月销量价格趋势图</div>
            <chart ref="C" :options="optionsC" style="width: 100%;"></chart> -->
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default { 
    mounted () {
      const chartB = this.$refs['B'];
      chartB.showLoading();
      this.axios.get('/thymeleaf/getLatestWeekSoldNum?productId=20')
      .then(data => {
          const options = data;
  
          chartB.mergeOptions({
            series: options.series,
            xAxis: options.xAxis
          });
   
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
    data () {
      return {   
        optionsB: {
          title: {
            show: false,
            text: '一周销量趋势图（每日销量）',
            subtext: '每日销量'
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
              },
              // min: 0,
              // max: 1000000,
              splitArea: {
                show: true
              },
              minInterval: 100,
              // boundaryGap : [ 0, 0 ],
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
                  {type: 'average', name: '平均值'},
                ]
              }
            }
          ]
        }   
      }
    }
  };
</script>
<style lang="scss" scoped>

</style>

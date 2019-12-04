<template>
<div class="main-content">
  <div class="filter-condition">
    <el-row>
      <el-col :span="20">
        <div class="condition-tags">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :closable="tag.closable"
            :type="tag.type">
            {{tag.name}}
          </el-tag>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="condition-date">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="selectDate"
            style="width: 100%;">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="report-cards">
    <el-row>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>区域（销量）</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>车型（销量）</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <div v-for="o in 20" :key="o" class="text item">
            {{'列表内容' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>渠道（销量）</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>转化 > 汇总</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>批售</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容'+ o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>库存</span>
            <el-button style="float: right; padding: 3px 0" type="text">隐藏</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        { name: '全国', type: '', closable: false},
        { name: '大东南区', type: '', closable: true },
        { name: '全车系', type: 'success', closable: false },
        { name: '新明锐', type: 'success', closable: true },
        { name: '全渠道', type: 'warning', closable: false },
        { name: 'DCC', type: 'warning', closable: true },
      ],
      selectDate: new Date()
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-card__header {
    padding: 5px 10px;
    background: #D9D9D9;
  }
  .el-card__body {
    // background: #F2F2F2;
    height: 80%;
    overflow-y: auto;
    // display: flex;
    // flex-direction: column;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-condition {
  background: #464B5D;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
.el-tag {
  margin-right: 10px;
}
.el-card {
  background: #F2F2F2;
  //margin: 5px 10px;
  margin: 5px 2px 2px 2px;
  height: 37vh;
}
</style>
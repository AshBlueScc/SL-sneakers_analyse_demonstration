<template>
  <div class='basic'>
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div slot="header">
            对品类(category)数据表进行操作
          </div>
          <div class="table-wrapper">
            <el-table
              v-loading="loading"
              element-loading-text="加载数据中"
              :data='tableData'
              border
              :row-class-name="addRowClass">
              <el-table-column label="数据库中识别id" prop="id" align="center" width="160"/>          
              <el-table-column label="毒数据库中品类id" align="center" width="160" >
                <template slot-scope="scope">
                  <label v-if="editing == null || editing.id != scope.row.id">{{scope.row.categoryId}}</label>
                  <el-input v-else type="number" v-model="categoryIdItem" :placeholder="Number(scope.row.categoryId)"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="毒数据库中品类名称" prop="categoryName" align="center" width="160">
                 <template slot-scope="scope">
                  <label v-if="editing == null || editing.id != scope.row.id">{{scope.row.categoryName}}</label>
                  <input v-else type="text" v-model="categoryNameItem" :placeholder="scope.row.categoryName"/>
                </template>
              </el-table-column>
              <el-table-column label="删除操作" align="center" width="160">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" @click="delete(scope.row.id)">删除</el-button>             
                </template>
              </el-table-column>
              <el-table-column label="修改操作" align="center" width="240">
                <template slot-scope="scope">
                  <el-button-group>                 
                    <el-button type="warning" icon="el-icon-edit" size="mini" round @click="editing = scope.row">修改</el-button>                    
                    <el-button type="primary" size="mini" round @click="editCancel">取消</el-button>     
                    <el-button type="success" icon="el-icon-check" size="mini" round @click="editSubmit(scope.row.id)">确定</el-button>           
                  </el-button-group>
                 </template>
              </el-table-column>  
            </el-table>
            <div v-if="addShow == 1" width="100%" height="40px">
              <el-col :span="6">
                <el-input type="number" placeholder="请输入内容" v-model="addCategoryId">
                  <template slot="prepend" width="160">(￣▽￣)产品品类id</template>
                </el-input>
              </el-col>
              <el-col :span="6">
                <el-input type="text" placeholder="请输入内容" v-model="addCategoryName">
                  <template slot="prepend" width="160">(￣▽￣)产品品类名称</template>
                </el-input>
              </el-col>
            </div>
            <div style="margin-top: 40px; text-align:left;">  
              <el-button-group>      
                <el-button type="warning" icon="el-icon-plus" style="margin-top: 0px; text-align:left;" @click="addShow = 1">增加</el-button> 
                <el-button type="primary" round @click="cancelAddCategory()">取消</el-button>     
                <el-button type="success" icon="el-icon-check" round @click="addSubmit()">确定</el-button>     
              </el-button-group>
              <el-pagination
                style="margin-top: -30px; text-align:right;"
                layout="total, sizes, prev, pager, next, jumper"
                :pager-count="7"
                :page-sizes="[5, 10, 15, 20]"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { formatDate } from 'src/utils/utils';

// const POSITIVE = 0;
const NEGATIVE = 1;
export default {
  created () {
    this.getListCategory();
  },
  data () {
    return {
      tableData: [],
      loading: true,
      pagesize: 10,
      currentpage: 1,
      total: 0,
      itemId: 1,
      editing: null,
      categoryIdItem: null,
      categoryNameItem: null,
      addCategoryId: null,
      addCategoryName: null,
      addShow: null
    }
  },
  methods: {
    getListCategory () {
      this.axios.get(`/thymeleaf/listCategory?per_page=${this.pagesize}&cur_page=${this.currentpage}`)
        .then(data => {
          this.tableData = data.data
          this.total = data.total
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    show (scope) {
      console.log(scope);
    },
    handleSizeChange (value) {
      this.pagesize = value;
      this.getListCategory();
    },
    handleCurrentChange (value) {
      this.currentpage = value;
      this.getListCategory();
    },
    addRowClass ({ row, rowIndex }) {
      if (row.rateType === NEGATIVE) {
        return 'warning-row';
      }
    },
    deleteItem(id) {
      this.axios.delete(`/thymeleaf/deleteCategory?id=${id}`)
        .then(
          this.getListCategory()
        )
        .catch(error => {
          console.log(error)
        });
    },
    delete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteItem(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    editCancel() {
      this.editing = null
      this.categoryIdItem = null
      this.categoryNameItem = null
    },
    editItem(id) {
      this.axios.put(`/thymeleaf/editCategory?id=${id}&categoryId=${this.categoryIdItem}&categoryName=${this.categoryNameItem}`)
        .then(
          this.getListCategory(),
          this.editCancel()
        )
        .catch(error => {
          console.log(error);
        });    
    },
    editSubmit(id) {
      // 出于修改状态可以点击确定提交
      if (this.editing != null) {
        // 判断提交的两个内容是否为空
        if (this.categoryIdItem != null && this.categoryNameItem != null) {
          this.$confirm('此操作将永久修改该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.editItem(id)
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }).catch(() => {
            this.editCancel();
            this.$message({
              type: 'info',
              message: '已取消修改！'
            });
          });
        } else {
          this.editCancel()
        }
      } else {
        this.editCancel()
      }
    },
    cancelAddCategory() {
      this.addShow = null
      this.addCategoryId = null
      this.addCategoryName = null
    },
    addCategory() {
      this.axios.post(`/thymeleaf/addCategory?categoryId=${this.addCategoryId}&categoryName=${this.addCategoryName}`)
        .then(
          this.getListCategory(),
          this.cancelAddCategory()
        )
        .catch(error => {
          console.log(error);
        });    
    },
    addSubmit() {
      // 处于add状态，可增加
      if (this.addShow === 1) {
        // categoryId和categoryName都不为空
        if (this.addCategoryId != null && this.addCategoryName != null) {
          this.$confirm('此操作将提交数据到数据库，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addCategory()
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
          }).catch(() => {
            this.cancelAddCategory()
            this.$message({
              type: 'info',
              message: '已取消提交！'
            });
          });
        } else {
          this.cancelAddCategory()
        }
      } else {
        this.cancelAddCategory()
      }
    }  
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  }
};
</script>
<style lang='scss'>
.basic {
  .el-table {
    .warning-row {
      background-color: oldlace;
    }
  }

  .recommend-tag {
    display: inline-block;
    margin: 4px 0;
    margin-right: 4px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

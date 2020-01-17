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
                <label>品牌数目：<font color="#1C83B8">{{tableProduct.length}}</font></label>
            </div>
            <div>能用兴趣养活兴趣的兴趣才叫兴趣，否则就叫烧钱！</div>
            </el-collapse-item>
        </el-collapse>
        </el-card>

        <el-card class="box-card">
            <el-table
            :stripe = "true"
            :data="tableProduct"
            :highlight-current-row= "true"
            style="width: 100%; height: 400;">
            <el-table-column label="子品牌名称" width="180">
                <el-badge :value="1" class="item" type="success" />{{brandName}}
            </el-table-column>
            <el-table-column prop="title" label="产品名称" width="600" />
            <el-table-column label="产品图片" width="200">
                <template slot-scope="scope">
                <el-image :src="scope.row.images.split(';')[0]" :lazy="true" style="width: 190px; height: 93.9px"/>
                </template>
            </el-table-column>
            <el-table-column label="( * ╹ ▽ ╹ * )查看详细产品" width="240">
                <template slot-scope="scope">
                <el-button type="success" icon="el-icon-search" size="mini" round @click="jump2ProductDetail(scope.row)" style="margin-left:90px">查看3</el-button> 
                </template>
            </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script>
import Vue from 'vue'
    export default {
        created(){
            this.getProductInfoByBrand();
            this.getBrandName();
        },
        data(){
            return {
                currentDate: new Date(),
                topPath: [
                    {path: 'category', val: '主品牌', index: 0},
                    {path: 'brand', val: '子品牌', index: 1},    
                    {path: 'product', val: '产品', index: 2}      
                ],    
                tableProduct: [],
                brandName: ''
            }    
        },
        methods: {
            getBrandName(){
                this.brandName = this.$route.query.brand.brandName;
            },
            getProductInfoByBrand() {
                this.axios.get(`/list/products?categoryId=${this.$route.query.brand.categoryId}&brandId=${this.$route.query.brand.brandId}`)
                .then(data => {
                    this.tableProduct = data
                })
                .catch(error => {
                    console.log(error)
                })
            },
            jump2ProductDetail(productDetail){
                this.$router.push({
                　　path: '/sportsShoesCircle/demo/productDetail',
                　　query: {
                        pdetail: productDetail,
                        brandName: this.brandName,

                        categoryName: this.$route.query.categoryName,
                        brand: this.$route.query.brand,
                        category: this.$route.query.category
            　　    }
                })
            },
            jump2Brand(){
                this.$router.push({
        　　        path: '/sportsShoesCircle/demo/brand',
            　　    query: {
                        category: this.$route.query.category,
        　　        }
                })
            },
            jump2Category() {
                this.$router.push({
        　　        path: '/sportsShoesCircle/demo/index',
            　　    query: {
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
            }
        }
    };
</script>
<style lang="scss" scoped>

</style>

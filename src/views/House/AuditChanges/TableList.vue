<template>
    <div class="table">
      <!-- 我的表格
      {{a}}
      <button @click="toFather">传给父{{isShowDetail}}</button> -->
      <el-button
            v-if="isShowDetail"
            type="text"
            size="small"
            class="operateBtn btn-judge"
            @click="back" style="width:83px !important;"
            >返回上一级</el-button>
        <div class="table-box">
            <el-table
                empty-text="暂无数据"
                :data="data"
                row-class-name="myRow"
                cell-class-name="myCell"
                style="width: 100%; height:100%;"
                >
                <el-table-column v-if="!isShowDetail" prop="name" label="申请人" min-width="300" />
                <el-table-column v-if="!isShowDetail" prop="test" label="申请内容" min-width="300" />
                <el-table-column v-if="!isShowDetail" prop="time" label="申请时间" min-width="300" />
                <el-table-column v-if="isShowDetail" prop="data.userHouseBuilding" label="楼栋" min-width="50" />
                <el-table-column v-if="isShowDetail" prop="data.userHouseUnit" label="单元" min-width="50" />
                <el-table-column v-if="isShowDetail" prop="data.userHouseNumber" label="门牌号" min-width="80" />
                <el-table-column v-if="isShowDetail" prop="data.Housingarea" label="房屋面积(m)" min-width="120" />
                <el-table-column v-if="isShowDetail" prop="data.typeName" label="房屋类型" min-width="80" />
                <el-table-column v-if="isShowDetail" prop="data.Price" label="物业费单价(元)" min-width="120" />
                <el-table-column v-if="isShowDetail" prop="data.state" label="房屋状态" min-width="80" />
                <el-table-column v-if="isShowDetail" prop="data.checktime" label="交房时间" min-width="120" />
                <el-table-column v-if="isShowDetail" prop="data.wuye_price" label="物业费到期时间" min-width="130" />
                <el-table-column v-if="isShowDetail" prop="data.centn" class-name="note" label="房屋备注"  min-width="120" />
                <el-table-column
                    v-if="!isShowDetail"
                    label="操作"
                    fixed="right"
                    min-width="180" 
                    >
                    <template slot-scope="scope" >
                        <el-button
                        v-if="!isShowDetail"
                        type="text"
                        size="small"
                        class="operateBtn btn-judge"
                        @click="handleJudgeClick(scope.row)" style="width:83px;"
                        >审核</el-button>
                        <el-button
                        v-if="!isShowDetail"
                        type="text"
                        size="small"
                        class="operateBtn btn-detail"
                        @click="handleDetailClick(scope.row)"
                        >房屋详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="isShowDetail"
                    label="操作"
                    fixed="right"
                    min-width="290" 
                    >
                    <template slot-scope="scope">
                        <!-- <el-button
                        type="text"
                        size="small"
                        class="operateBtn btn-detail"
                        @click="handleModifyClick(scope.row)"
                        >修改</el-button>
                        <el-button
                        type="text"
                        size="small"
                        class="operateBtn btn-judge"
                        @click="handleUserClick(scope.row)" style="width:67px !important;"
                        >住户信息</el-button>
                        <el-button
                        type="text"
                        size="small"
                        class="operateBtn btn-judge"
                        @click="handleCarClick(scope.row)" style="width:67px !important;"
                        >车位信息</el-button> -->
                        <el-button
                        type="text"
                        size="small"
                        class="operateBtn btn-judge"
                        @click="handleRecordClick(scope.row)" style="width:67px !important;"
                        >操作记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Table',
    props: ['data', 'isShowDetail'],
    // props: { // 可验证props
    //     data: String
    // },
    data () {
        return {
            a: 'aa'
        }
    },
    created() {
        console.log(this.data)
        
    },
    // watch: {
    //     'isShowDetail': {
    //         handler(n,o){
    //             console.log(n,o)
    //         },
    //         immediate: true
    //     }
    // },
    methods: {
        toFather() {
            this.$emit('bridge', '我是小二')
        },
        handleDetailClick(v) {
            this.$emit('fun1', v)
        },
        handleJudgeClick(v) {
            this.$emit('fun2', v)
        },
        handleModifyClick(v) {
            this.$emit('fun3', v)
        },
        handleUserClick(v) {
            this.$emit('fun4', v)
        },
        handleCarClick(v) {
            this.$emit('fun5', v)
        },
        handleRecordClick(v) {
            this.$emit('fun6', v)
        },
        back() {
            this.$emit('back')
        }

    }
    
}
</script>

<style lang='scss' scoped>
/deep/.btn-judge{
    width: 52px !important;
    background: #25bad9;
  }
  /deep/.btn-detail{
    background-color: #1FBBA6;
  }
  /deep/.operateBtn{
    color: #fff;
    display: inline-block;
    border-radius: 4px;
    height: 30px;
    padding: 4px;
    width:72px;
    font-size: 14px;
  }
</style>
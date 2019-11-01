<template>
  <div class="table">
      我的表格
      {{a}}
      <button @click="toFather">传给父</button>
      <div class="table-box">
        <el-table
            empty-text="暂无数据"
            :data="data"
            row-class-name="myRow"
            cell-class-name="myCell"
            style="width: 100%; height:100%;"
            >
            <el-table-column prop="name" label="申请人" min-width="300" />
            <el-table-column prop="test" label="申请内容" min-width="300" />
            <el-table-column prop="time" label="申请时间" min-width="300" />
            <el-table-column
            label="操作"
            fixed="right"
            min-width="180"
            >
            <template slot-scope="scope">
                <el-button
                type="text"
                size="small"
                class="operateBtn btn-detail"
                @click="handleDetailClick(scope.row)"
                >房屋详情</el-button>
                <el-button
                type="text"
                size="small"
                class="operateBtn btn-judge"
                @click="handleJudgeClick(scope.row)" style="width:83px;"
                >审核</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Table',
    props: ['data'],
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
    methods: {
        toFather() {
            this.$emit('bridge', '我是小二')
        },
        handleJudgeClick(v) {
            this.$emit('fun1', v)
        },
        handleDetailClick(v) {
            this.$emit('fun2', v)
        }
    }
    
}
</script>

<style lang='scss' scoped>
/deep/.btn-judge{
    width: 45px !important;
    background: #25bad9;
  }
  /deep/.btn-detail{
    background-color: #bfbfbf;
  }
  /deep/.operateBtn{
    color: #fff;
    display: inline-block;
    border-radius: 4px;
    height: 32px;
    padding: 4px;
    font-size: 14px;
  }
</style>
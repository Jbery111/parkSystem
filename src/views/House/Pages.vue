<template>
  <!-- 分页 -->
    <div class="block">
      <p
        class="record-data"
      >共{{ Math.ceil(pageInfo.total/pageInfo.listRows) }}页,{{ pageInfo.total }}条</p>
      <el-pagination
        background
        :page-size="pageInfo.listRows"
        layout="prev, pager, next, jumper"
        :total="pageInfo.total"
        :current-page="pageInfo.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @next-click="nextClickHandler"
      />
    </div>
</template>

<script>
export default {
    name: "Pages",
    props: ['pageInfo'],
    data () {
        return {

        }
    },
    created() {
        alert(this.pageInfo.total)
    },
    methods: {
        handleSizeChange() {
            this.$emit("handleSizeChange")
        },
        handleCurrentChange() {
            this.$emit("handleCurrentChange")
        },
        nextClickHandler() {
            this.$emit("nextClickHandler")
        }
    }
}
</script>

<style lang="scss" scoped>
    //分页器的样式
    .block {
        .record-data {
        cursor: pointer;
        display: inline-block;
        height: 20px;
        width: 1000px;
        // background-color: green;
        // float: right;
        padding-left: 4.5vw;
        margin-top: 15px;
        position: absolute;
        font-size: 0.8vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        }
        position: absolute;
        margin-right: 1.4vw;
        bottom: 8px;
        right: 2vw;
        height: 40px;
        width: 100%;
        // padding-left: 90px;
        .el-pagination {
        // background-color: green;
        position: absolute;
        bottom: 0px;
        right: 50px;
        height: 2.8vh !important;
        margin-right: -1.9vw !important;
        /deep/button {
            // background-color: #f00 !important;
            min-width: 1.6vw !important;
            height: 2.8vh;
            cursor: default;
        }
        /deep/.el-pagination__jump {
            // background-color: #f00;
            position: relative;
            margin-left: 0px;
            color: #fff;
            font-size: 0px;
            //input和ul是否居中
            margin-top: 0px;
            // &::before {
            //   content: "前往";
            //   color: #000;
            // }
            .el-input {
            // border: 1px solid;
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            outline: none;
            /deep/.el-input__inner {
                font-size: 10px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                display: inline-block;
                // background-color: #f00 !important;
                // border: 1px solid !important;
                width: 44px;
                height: 2.8vh !important;
                border: 1px solid rgba(239, 242, 245, 1) !important;
                border-radius: 2px;
                margin-left: 12px;
                outline: none;
            }
            &::before {
                content: "前往";
                color: rgba(102, 102, 102, 1);
                font-size: 0.8vw;
            }
            &:after {
                content: "页";
                padding-left: 0.5vw !important;
                font-size: 0.8vw;
            }
            }
        }
        /deep/.el-pager li {
            min-width: 1.6vw;
            height: 2.8vh;
            border-radius: 2px;
            font-size: 10px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 2.8vh;
        }
        }
        /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #5fafe4;
        color: rgba(255, 255, 255, 1);
        }
    }
</style>
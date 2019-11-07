<template>
  <div class="form-container">
      <div class="button">
          返回首页
      </div>
      <div class="searchBox">
        <span v-show="!isShowExcel" class="search-btn" @click="handleSearch"><svg-icon icon-class="search1" /></span>
        <el-input
          v-show="!isShowExcel"
          v-model="searchData"
          class="sreach-box"
          clearable
          placeholder="请输入搜索内容"
          @keyup.enter.native="handleSearch"
        />
      </div>
      form1
  </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    created () {
        
    },
    mounted () {

    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.form-container{
    position: relative;
    background-color: #f67;
    height: 100%;
    .button{
        width: 80px;
        height: 32px;
        background:rgba(37,186,217,1);
        border-radius:5px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }

    .searchBox{
        position: absolute;
        top: 0;
        right: 0;
    }
    .search-btn{
        position: absolute;
        right:0;
        top: 13px;
        height: 30px;
        background-color: #bfbfbf;
        border-radius: 0 3px 3px 0;
        margin-top: -13px;
        z-index: 9;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        padding: 0 5px;
        cursor: pointer;
      }
    .sreach-box{
      width: 200px;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #bfbfbf;
      /deep/.el-input__inner{
        height: 100% !important;
        padding-left: 7px !important;
      }
    }
}
</style>
<template>
  <div>
    <!-- 选择套餐 -->
    <div v-if="!isShowYear" class="wy-choice-container">
      <!-- 标题栏 -->
      <div class="wy-choice-container_title">
        <span class="dayu" @click="fanhui1()">
          <svg-icon icon-class="fanhui" />
        </span>
        <p v-show="isTost">
          {{ tostMsg }}
          <span v-show="isTost">17716136776</span>
        </p>
      </div>
      <div class="container-box">
        <div v-for="(item,index) in listData" :key="item.sort" class="choicetc-el-row">
          <div :class="actived===index ? 'bt1':'bt2'" class="btn1" @click="handlerOne(item,index)">
            <div class="card-title1">
              <p class="title1">{{ item.Setmeal_name }}</p>
              <p class="title2">{{ item.Setmeal_capacity }}</p>
            </div>
            <div class="card-title2">
              <p class="title1">
                <span style="color: red; font-size: 0.9vw">￥</span>
                {{ item.Setmeal_Prices }}
                <span
                  style="color:black;font-size: 0.9vw"
                >/年</span>
              </p>
              <del class="title2">
                <span v-show="item.Setmeal_Price">￥</span>
                {{ item.Setmeal_Price }}
                <span v-show="item.Setmeal_Price">/年</span>
              </del>
            </div>
            <!-- 推荐三角形 -->
            <div v-if="index===0" class="img-tuijian">
              <svg-icon icon-class="tuijian" />
            </div>
          </div>
        </div>
      </div>
      <div class="wy-choice-container-wrap">
        <div class="wy-choice-container-wrap_btn" @click="handleClickChoice()">确认</div>
      </div>
    </div>
    <!-- 选择年组件 -->
    <div v-else>
      <choice-year
        :get-year-lists="getYearLists"
        :is-show-year="isShowYear"
        @handlerFanhui="isShowYear = !isShowYear"
        @handlerIsToast="handlerIsToasts"
      />
    </div>
  </div>
</template>

<script>
// import { setmeal } from '@/api/pay'
import ChoiceYear from './ChoiceYear'
// import Bus from '@/utils/bus'
import { Message } from 'element-ui'
import { mapMutations, mapActions } from 'vuex'
import { getYears } from '@/api/pay'
export default {
  name: 'ChoiceTc',
  components: {
    ChoiceYear
  },
  data() {
    return {
      dialogVisible: false,
      isTost: false,
      listData: [],
      itemQueren: {},
      getYearLists: [],
      isShowYear: false,
      item1: {},
      actived: 0,
      tostMsg: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapMutations(['setMealInfoHandler']),
    ...mapActions(['getSetmealData']),
    // 点击某个套餐卡片
    handlerOne(item, index) {
      console.log('选择套餐，改变样式')
      this.actived = index
      this.item1 = item
      this.isTost = false
    },
    // 得到套餐的数据
    getData() {
      const typea = JSON.parse(localStorage.getItem('items')).typea
      this.getSetmealData({ typea })
        .then(resp => {
          console.log(resp.msg)
          this.listData = resp.msg
          const listData1 = resp.msg
          this.item1 = listData1[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击queren
    handleClickChoice() {
      const data = this.item1
      this.setMealInfoHandler(data)
      const Communityid = JSON.parse(localStorage.getItem('items')).id
      const { stade, Setmeal_id } = data
      const data1 = { stade, Setmeal_id, Communityid }
      // 传递数据到选择年接口
      this.itemQueren = data1
      this.getYearsData(data1)
    },
    fanhui1() {
      this.$router.push('/community')
    },
    // 获取年份套餐详情
    getYearsData(data) {
      console.log(data)
      getYears(data)
        .then(resp => {
          console.log('获取年份的套餐详情', resp.code)
          if (resp.code === 200) {
            this.getYearLists = resp.msg
            this.isTost = false
            this.respCode = resp.code
            this.isShowYear = !this.isShowYear
          } else if (resp.code === 401 || resp.code === 402) {
            // this.isShowYear = !this.isShowYear
            console.log(resp.msg)
            this.tostMsg = resp.msg
            this.isTost = true
            setTimeout(() => {
              this.isTost = !this.isTost
            }, 180000)
          } else if (resp.code === 400 || resp.code === 403) {
            Message(resp.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handlerIsToasts() {
      this.isTost = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wy-choice-container {
  // /deep/ .el-dialog {
  //   margin-top: 34vh !important;
  // }

  // /deep/ .v-modal {
  //   height: 50%;
  //   width: 50%;
  //   top: 25%;
  //   left: 25%;
  // }
  .chioce-container {
    height: 54vh;
  }
  .container-box {
    display: flex;
    margin: -1.8vh 0.4vw;
    justify-content: space-between;
  }

  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 11px;
  // margin: 4.7vh 1.7vw 4vh 1.7vw;
  &_title {
    display: flex;
    justify-content: space-between;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    // margin-bottom: 4.3vh;
    .dayu {
      cursor: pointer;
      font-size: 1.3vw;
    }
    p {
      font-size: 0.73vw;
      padding-top: 0.35vh;
      margin-right: 0.4vw;
      span {
        color: red;
      }
    }
  }
  &-wrap {
    width: 100%;
    height: 4vh;
    display: flex;
    justify-content: center;
    &_btn {
      width: 4.5vw;
      height: 4vh;
      background: rgba(248, 172, 89, 1);
      border-radius: 4px;
      line-height: 4vh;
      text-align: center;
      font-size: 0.85vw;
      color: white;
      margin-bottom: 3vh;
      cursor: pointer;
      position: absolute;
      bottom: -3vh;
    }
  }
}
.svg-icon {
  vertical-align: -0.11em !important;
}
.choicetc-el-row {
  cursor: pointer;
  margin-top: 4.3vh;
  margin-bottom: 5vh;
  display: flex;
  justify-content: space-between;
  .bt1 {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(248, 172, 89, 1);
    box-shadow: 0px 6px 5px 0px rgba(248, 172, 89, 0.15) !important;
    border-radius: 0px;
  }
  .bt2 {
    border: 1px solid rgba(243, 243, 243, 1);
    box-shadow: 0px 6px 5px 0px rgba(204, 204, 204, 0.15) !important;
    background: rgba(255, 255, 255, 1);
  }
  .btn1 {
    width: 9.8vw;
    height: 29.73vh;
    background: rgba(255, 255, 255, 1);
    // border:1px solid rgba(243,243,243,1);
    position: relative;
    .card-title1 {
      width: 100%;
      height: 45%;
      // background-color: #f00;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title1 {
        width: 100%;
        font-size: 1.2vw;
        text-align: center;
        margin-top: 6.7vh;
      }
      .title2 {
        width: 100%;
        // white-space: nowrap;
        text-align: center;
        font-size: 0.85vw;
        transform: scale(0.8);
        margin: 0 auto;
        margin-top: 1.6vh;
      }
    }
    .card-title2 {
      width: 100%;
      height: 50%;
      // background: blue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      .title1 {
        width: 100%;
        font-size: 1.3vw;
        color: red;
      }
      .title2 {
        width: 100%;
        font-size: 0.8vw;
        font-family: Microsoft YaHei;
        font-weight: 400;
        text-decoration: line-through;
        color: rgba(153, 153, 153, 1);
      }
    }
    .img-tuijian {
      font-size: 3.14vw;
      position: absolute;
      top: -1.1vh;
      right: 0;
    }
  }
}
</style>

<template>
  <div v-if="isShowYear" v-show="Visibles" class="wy-choice-container">
    <!-- 返回 -->
    <span class="fanhui" @click="hadlerFanhui">
      <svg-icon icon-class="fanhui" />
    </span>
    <!-- 卡片 -->
    <div class="wy-choice-container_row">
      <!-- 卡片last -->
      <div
        v-for="(item,index) in getYearLists"
        :key="item.year_id"
        class="btn1"
        :class="actived===index ? 'bt2':'bt1'"
        @click="handleClickYaerCard(item,index)"
      >
        <p class="year">{{ item.number }}年</p>
        <div class="price">
          <p class="new-price">
            <span style="font-size: 0.95vw;">￥</span>
            {{ item.year_Prices }}
          </p>
          <del class="old-price">
            <span v-show="item.year_Price" style="font-size: 0.8vw;">￥</span>
            {{ item.year_Price }}
            <span v-show="item.Setmeal_Price">/年</span>
          </del>
        </div>
        <!-- 推荐三角形 -->
        <div v-if="index===2" class="img-tuijian">
          <svg-icon icon-class="tuijian" />
        </div>
      </div>
    </div>
    <!-- 点击确认 -->
    <div class="submission">
      <el-button @click="handleClickQueren()">确认</el-button>

      <el-dialog
        :visible="show_cg"
        :show-close="false"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        center
      >
        <div style="text-align: center">
          <svg-icon icon-class="pay_success" />
        </div>
        <div style="text-align: center">支付成功</div>
      </el-dialog>
    </div>
    <!-- 支付方式 -->
    <PayWays
      v-if="openWindow"
      :open-window="openWindow"
      :get-wx-info="queryInfo"
      :query-info="queryInfo"
      @handleCloseWindow="showQr"
      @throwShowQr="showQr"
    />
  </div>
</template>

<script>
import PayWays from './PayWays'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'ChoiceTc',
  components: {
    PayWays

  },
  props: {
    getYearLists: {
      type: Array,
      default: () => {
        return []
      }
    },
    itemQueren: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShowYear: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      queryInfo: {},
      openWindow: false,
      openQrcode: false,
      centerDialogVisible: false,
      WeChatDialogVisible: false,
      show_cg: false,
      Visibles: true,
      item1: {},
      actived: 0
    }
  },
  computed: {
    ...mapState(['setMealInfo'])
  },
  created() {
    // console.log(this.getYearLists)
    const getYearListsData = this.getYearLists
    this.item1 = getYearListsData[0]
  },
  beforeDestroy() {
    this.Visibles = false
  },
  methods: {
    ...mapActions(['weixinErWeiMa']),
    ...mapMutations(['setYearInfo']),
    // 点击确认
    handleClickQueren() {
      this.Visibles = true // ggggggggggg
      const data = this.item1
      this.setYearInfo(data)
      // 微信二维码生成
      const {
        propertyId,
        Communityid: communityid
      } = JSON.parse(localStorage.getItem('userInfo')).data
      console.log(data)
      const { number, year_Prices } = data
      const money = year_Prices
      const name = this.setYearInfo.Setmeal_name
      this.queryInfo = {
        propertyId,
        communityid,
        number,
        money,
        name
      }
      this.weixinErWeiMa(this.queryInfo)
      this.openWindow = true
    },
    // 点击卡片
    handleClickYaerCard(item, index) {
      console.log('选择套餐，改变样式')
      console.log(item)
      this.actived = index
      this.item1 = item
      this.openWindow = false
      console.log(this.openWindow)
    },
    hadlerFanhui() {
      this.$emit('handlerIsToast')
      this.$emit('handlerFanhui')
    },
    handleClose() {
      this.centerDialogVisible = false
    },
    handleClose1() {
      this.WeChatDialogVisible = false
      this.centerDialogVisible = false
    },
    showQr() {
      this.openWindow = !this.openWindow
      this.openQrcode = !this.openQrcode
      // this.openWindow = !this.openWindow
    }
  }
}
</script>

<style lang="scss" scoped>
.wy-choice-container {
  // overflow: hidden;
  /deep/ .el-dialog {
    margin-top: 40vh !important;
    width: 19.6vw;
    height: 23vh;
    .el-dialog__header {
      padding: 4.5vh 1.5vw 1.3vh;
      text-align: center;
    }
    .el-dialog__body {
      padding: 0;
      width: 100%;
      height: 65%;
      padding: 2vh 3.2vw 6.4vh 3.2vw;
      .pay-image {
        width: 100%;
        height: 100%;
        background-color: #f00;
        font-size: 1vw;
        display: flex;
        justify-content: space-between;
        .weixin {
          width: 50%;
          height: 100%;
          background-color: #fff;
          img {
            display: inline-block;
            width: 2.4vw;
            height: 4.6vh;
            margin-left: 1vw;
          }
          span {
            font-size: 1vw;
            transform: scale(0.5);
          }
        }
        .zhifubao {
          width: 50%;
          height: 100%;
          background-color: #fff;
          img {
            display: inline-block;
            width: 2.4vw;
            height: 4.6vh;
            margin-left: 1vw;
          }
          span {
            font-size: 1vw;
            transform: scale(0.5);
          }
        }
      }
    }
  }

  /deep/ .v-modal {
    height: 50%;
    width: 50%;
    top: 25%;
    left: 25%;
    margin: 0 auto;
    border-radius: 11px;
  }
  .fanhui {
    cursor: pointer;
    font-size: 1.3vw;
  }
  width: 100%;
  height: 39.7vh;
  border-radius: 11px;
  position: relative;

  &_row {
    width: 100%;
    height: 100%;
    // background-color: green;
    padding: 3vh 2.4vw 3.2vh 2.4vw;
    display: flex;
    justify-content: space-between;
    // .bt2{
    //     background:rgba(255,255,255,1);
    //   border:1px solid rgba(248,172,89,1);
    //   box-shadow:0px 4px 5px 0px rgba(248,172,89,0.4);
    //   border-radius:4px;
    //     }
    .bt2 {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(248, 172, 89, 1);
      // box-shadow:0px 4px 5px 0px rgba(248,172,89,0.4);
      box-shadow: 0px 6px 5px 0px rgba(248, 172, 89, 0.15);
      border-radius: 0px;

      width: 9.4vw;
      height: 29vh;
      position: relative;
      cursor: pointer;
      .year {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5vw;
      }

      .price {
        width: 100%;
        height: 50%;
        text-align: center;
        .new-price {
          width: 100%;
          text-align: center;
          color: red;
        }
        .old-price {
          width: 100%;
          text-align: center;
          font-size: 0.9vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .btn1 {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(248, 172, 89, 1);
      // box-shadow:0px 4px 5px 0px rgba(248,172,89,0.4);
      box-shadow: 0px 6px 5px 0px rgba(248, 172, 89, 0.15);
      border-radius: 0px;

      width: 9.4vw;
      height: 29vh;
      position: relative;
      cursor: pointer;
      .year {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5vw;
      }

      .price {
        width: 100%;
        height: 50%;
        text-align: center;
        .new-price {
          width: 100%;
          text-align: center;
          color: red;
          font-size: 1.4vw;
        }
        .old-price {
          width: 100%;
          text-align: center;
          font-size: 0.9vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          text-decoration: line-through;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    //   }
    .bt1 {
      width: 9.4vw;
      height: 29vh;
      position: relative;
      cursor: pointer;
      border: 1px solid rgba(243, 243, 243, 1);
      box-shadow: 0px 4px 4px 0px rgba(204, 204, 204, 0.15);
      background: rgba(255, 255, 255, 1);
      .year {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5vw;
      }

      .price {
        width: 100%;
        height: 50%;
        text-align: center;
        .new-price {
          width: 100%;
          text-align: center;
          color: red;
        }
        .old-price {
          width: 100%;
          text-align: center;
        }
      }
    }
    .img-tuijian {
      font-size: 3.14vw;
      position: absolute;
      top: -1.3vh;
      right: 0;
    }
    .svg-icon {
      vertical-align: -0.14em !important;
    }
  }

  .el-button {
    width: 4.5vw;
    height: 4vh;
    border-color: #f8ac59;
    background: rgba(248, 172, 89, 1);
    border-radius: 4px;
    line-height: 0vh;
    font-size: 0.85vw;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin: 0 43.4vw;
    color: #fff;
    bottom: -0.2vh;
    text-align: center;
  }
  .kaipiao-btn {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    position: relative;
    .sb-btn {
      position: absolute;
      width: 5.2vw;
      height: 3vh;
      line-height: 3vh;
      text-align: center;
      bottom: 0px;
      border: 1px solid rgba(204, 204, 204, 1);
      font-size: 10px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
    }
    .quxiao-btn {
      left: -14px;
    }
    .quedin-btn {
      right: -14px;
      background: rgba(37, 186, 217, 1);
      color: #fff;
    }
  }
}
</style>

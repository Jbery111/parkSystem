<template>
  <div>
    <div v-if="openWindow">
      <el-dialog
        title="请支付"
        :modal-append-to-body="false"
        :visible.sync="openWindow"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <div class="container-box">
          <div class="pay-way wx-pay pay-way" @click="showQr">
            <div class="img">
              <svg-icon icon-class="weixin" />
            </div>

            <span>微信支付</span>
          </div>
          <div class="pay-way zfb-pay">
            <div class="img">
              <svg-icon icon-class="zhifubao" />
            </div>
            <span>支付宝支付</span>
          </div>
        </div>
        <!-- 支付二维码 -->
        <div v-if="openQrCodesWindow">
          <QrCodes
            :open-qrcode="openQrCodesWindow"
            :qr-code-info="qrCodeInfo"
            @closeWindow="closeWindowHandler"
            @openInoice="openInoiceHandler"
          />
        </div>
      </el-dialog>
    </div>
    <!-- 支付成功后是否开票-->
    <div v-if="Visibles" @openInoice="openInoiceHandler">
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="Visibles"
        center
        :modal-append-to-body="false"
        :show-close="false"
      >
        <span slot="title" />
        <div
          style="text-align:center;font-family:MicrosoftYaHei;font-weight:400;color:rgba(51,51,51,1);font-size:0.85vw;margin-top:2vh;"
        >是否需要开票？</div>
        <div class="kaipiao-btn1">
          <span class="sb-btn quxiao-btn" @click="quxiaoBtn()">取 消</span>
          <span class="sb-btn quedin-btn" @click="quedinBtn()">确 定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import QrCodes from './QrCodes'
import { mapState, mapActions, mapMutations } from 'vuex'
import { Message } from 'element-ui'

export default {
  components: {
    QrCodes
  },
  props: {
    // getWxInfo: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
    openWindow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openQrCodesWindow: false,
      queryInfo: {
        name: '',
        money: '',
        communityid: '',
        propertyId: '',
        number: ''
      },
      qrCodeInfo: {},
      Visibles: false
      // isShowType: true
    }
  },
  computed: {
    ...mapState(['setMealInfo', 'setYearInfo', 'userInfo'])
  },
  // watch: {
  //   // getWxInfo: {
  //   //   handler: function(val) {
  //   //     this.queryInfo = {
  //   //       ...this.queryInfo,
  //   //       ...val
  //   //     }
  //   //   },
  //   //   deep: true
  //   // }
  // },
  created() {
    // this.getName()
    const item2 = JSON.parse(localStorage.getItem('items'))
    console.log(item2.id)
    this.queryInfo.name = this.setMealInfo.Setmeal_name
    this.queryInfo.money = this.setYearInfo.year_Prices
    this.queryInfo.number = this.setYearInfo.number
    this.queryInfo.communityid = item2.id
    this.queryInfo.propertyId = this.userInfo.data.propertyId
    console.log('++++____+++++')
    console.log(this.queryInfo)
    this.getQrCode(this.queryInfo)
  },
  methods: {
    ...mapMutations(['setQrInfoHandler']),
    ...mapActions(['weixinErWeiMa']),
    //
    showQr() {
      // this.getQrCode(this.queryInfo)
      this.openQrCodesWindow = true
    },
    handleClose() {
      this.$emit('handleCloseWindow')
    },
    // 获取二维码信息
    getQrCode(data) {
      console.log(data)
      this.weixinErWeiMa(data).then(resp => {
        console.log(resp)
        this.qrCodeInfo = resp.msg
        console.log('获取二维码信息' + resp.msg)
        console.log(resp.msg)
        this.setQrInfoHandler(this.qrCodeInfo)
      })
    },
    handlerShowQr() {
      this.$emit('throwShowQr')
    },
    closeWindowHandler() {
      // this.isShowType = !this.isShowType
      this.openWindow = !this.openWindow
      this.openQrCodesWindow = !this.openQrCodesWindow
    },
    openInoiceHandler() {
      console.log('_____________________')
      console.log(this.Visibles)
      this.openWindow = !this.openWindow
      this.Visibles = !this.Visibles
    },
    // 确定开票
    quedinBtn() {
      this.$router.push('/wyinvoice')
    },
    // 取消开票
    quxiaoBtn() {
      Message('取消开票成功')
      setTimeout(() => {
        this.$router.push('/dashboard')
      }, 2000)
    }
  }
}
</script>

 <style lang='scss' scoped>
.container-box {
  display: flex;
  justify-content: space-between;
  padding: 0.2vh;

  .pay-way {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75vw;
    // margin-left: -1.6vw;
    justify-content: space-between;
    cursor: default;

    .img {
      font-size: 2.5vw;
      margin-bottom: 0.8vh;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.wy-choice-container {
  // overflow: hidden;
  /deep/ .el-dialog {
    margin-top: 40vh !important;
    width: 19.25vw !important;
    border-radius: 4px;
    height: 23.3vh !important;
    .el-dialog__header {
      // background-color: #f00;
      cursor: default;
      padding: 2vh 1.5vw 1.3vh !important;
      text-align: center;
      text-align: center;
      font-size: 0.95vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .el-dialog__title {
        cursor: default;
        font-size: 0.95vw;
        // margin-left: 7vw;
        text-align: center;
        // margin-top: 0.21vh !important;
        // line-height: 0;
        border-radius: 5px;
        el-dialog__headerbtn {
          top: 1.8vh !important;
        }
      }
      .el-dialog__close {
        // margin-top: -0.2vh;
        margin-right: -0.1vw;
      }
    }
    .el-dialog__body {
      padding: 0;
      // width: 19.25vw !important;
      height: 65%;
      padding: 3.2vh 4.5vw 6.4vh 4.5vw !important;
      /微信支付，支付宝支付/ .kaipiao {
        font-size: 0.95vw;
        text-align: center;
        margin-top: -2vh;
      }
      .pay-image {
        width: 100%;
        height: 100%;
        background-color: #f00;
        font-size: 1vw;
        display: flex;
        margin-top: 1.2vh;
        justify-content: space-between;
        .weixin {
          width: 50%;
          height: 100%;
          background-color: #fff;
          img {
            display: inline-block;
            width: 2.5vw;
            height: 4.6vh;
            // margin-left: 0.8vw;
          }
          span {
            font-size: 0.75vw !important;
            transform: scale(0.5);
          }
        }
        .zhifubao {
          width: 50%;
          height: 100%;
          background-color: #fff;
          img {
            display: inline-block;
            width: 2.5vw;
            height: 4.6vh;
            margin-left: 0.8vw;
          }
          span {
            font-size: 0.75vw;
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
  }
  width: 100%;
  height: 39.7vh;
  border-radius: 11px;
  position: relative;

  &_row {
    width: 100%;
    height: 100%;
    // background-color: green;
    padding: 3.7vh 2.4vw 3.2vh 2.4vw;
    display: flex;
    justify-content: space-between;
    .card {
      width: 10.4vw;
      height: 28vh;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(243, 243, 243, 1);
      box-shadow: 0px 6px 5px 0px rgba(204, 204, 204, 0.15);
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
        }
      }
    }
  }
  .el-button {
    width: 5.2vw;
    height: 4vh;
    background: rgba(248, 172, 89, 1);
    border-radius: 4px;
    line-height: 0vh;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 22.3vw;
    bottom: -3.25vh;
    text-align: center;
  }

  .kaipiao-btn {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    position: relative;
    // bottom: -30px;
    .sb-btn {
      position: absolute;
      width: 4vw;
      height: 3.5vh;
      line-height: 3.5vh;
      text-align: center;
      bottom: 0px;
      border-radius: 3px;
      border: 1px solid rgba(204, 204, 204, 1);
      font-size: 0.75vw;
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
      border-color: rgba(37, 186, 217, 1);
    }
  }

  .kaipiao-btn1 {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    position: relative;
    bottom: -3.9vh;
    .sb-btn {
      position: absolute;
      width: 4vw;
      height: 3.5vh;
      line-height: 3.5vh;
      text-align: center;
      border-radius: 3px;
      bottom: 0px;
      border: 1px solid rgba(204, 204, 204, 1);
      font-size: 0.8vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
    }
    .quxiao-btn {
      left: -1.8vh;
    }
    .quedin-btn {
      right: -1.8vh;
      background: rgba(37, 186, 217, 1);
      color: #fff;
      border-color: rgba(37, 186, 217, 1);
    }
  }
}
</style>
//  <style lang='scss'>
// //@import url (); 引入公共css类
// /deep/.el-dialog__header{
//   padding-top: 2vh !important;
//   text-align: center;
// }
// .el-dialog__title{
//   font-size: 0.95vw;
//   margin-left: 7vw;
//   text-align: center;
//   margin-top: 0.21vh !important;
//   border-radius: 5px;
// }
//   .container-box{
//     display: flex;
//     justify-content: space-between;
//     padding: 2.5vh 1.5vw;

//     .pay-way {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       font-size: 0.73vw;
//       justify-content: space-between;

//       .svg-icon{
//         font-size: 2.5vw;
//         margin-bottom: 1.3vh !important;
//       .span{
//       font-size: 1vw;
//     }
//       }
//     }
//   }
//
</style>

// //是否开票
// <style lang='scss' scoped>
// //@import url(); 引入公共css类
// /deep/

// .el-dialog__body {
//   padding: 0;
//   width: 100%;
//   height: 65%;
//   padding: 2.5vh 3.2vw 6.4vh 3.2vw;
//   position: relative;
//   .pay-svg {
//     width: 100%;
//     height: 100%;
//     background-color: #fff;
//     font-size: 1vw;
//     display: flex;
//     margin-top: 2.5vh;
//     margin-left: 1.45vw;
//     justify-content: space-between;
//     .weixin {
//       width: 50%;
//       height: 100%;
//       background-color: #fff;
//       .svg-icon {
//       display: inline-block;
//       font-size:2.5vw;
//       margin-left: 0.3vw;
//       margin-bottom: 0.8vh !important;

//     }
//     span {
//       font-size: 0.72vw;
//       transform: scale(0.5);
//       margin-left: 0.1vw;
//     }
//     }
//     .qr-code {
//       width: 50%;
//       height: 100%;
//       background-color: #fff;
//       img {
//       display: inline-block;
//       width: 2.4vw;
//       height: 4.6vh;
//       margin-left: 0.2vw;
//     }
//     canvas {
//       width: 6.8vw !important;
//       height: 13.4vh !important;
//       position: relative;
//       top: -2.8vh;
//       right: 1.3vw;
//     }
//     span {
//       font-size: 0.73vw;
//       transform: scale(0.5);
//     }
//     }
//   }
// }
//
</style>

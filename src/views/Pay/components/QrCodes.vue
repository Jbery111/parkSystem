<template>
  <div>
    <el-dialog
      title="请支付"
      :modal-append-to-body="false"
      :visible.sync="openQrcode"
      :show-close="false"
      :close-on-click-modal="false"
      center
    >
      <div class="pay-image">
        <div class="weixin">
          <div class="img">
            <svg-icon icon-class="weixin" />
          </div>
          <span>微信支付</span>
        </div>
        <div class="qr-code">
          <canvas ref="box" />
        </div>
      </div>
      <p class="closeBtn" @click="closeBtnHandler()">
        <svg-icon icon-class="quxiao" />
      </p>
    </el-dialog>

    <!-- 支付成功 -->

    <el-dialog
      :visible.sync="show_cg"
      :show-close="false"
      :modal-append-to-body="false"
      center
      :close-on-click-modal="false"
    >
      <div style="text-align: center; font-size: 3.5vw;margin-bottom:1.5vh;">
        <svg-icon icon-class="pay_success" />
      </div>
      <div
        style="text-align: center;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);"
      >支付成功</div>
    </el-dialog>
    <!-- 支付失败 -->
    <!-- <el-dialog
      :visible.sync="show_fail"
      :show-close="false"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      center
    >
      <div style="text-align: center;font-size: 40px;"><svg-icon icon-class="pay_failed" /></div>
      <div style="text-align: center"> 支付失败</div>
    </el-dialog>-->
    <!-- 取消支付 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="show_fail"
      :show-close="false"
      :modal-append-to-body="false"
      center
    >
      <div style="text-align: center; font-size: 3.5vw;margin-bottom:1.5vh;padding-top: 0px;">
        <svg-icon icon-class="forgive_pay" />
      </div>
      <div
        style="text-align: center;font-family:Microsoft YaHei;font-weight:400;color:rgba(51,51,51,1);"
      >取消支付</div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Q from 'qrcode'
import { setmeals } from '@/api/pay'

export default {
  props: {
    qrCodeInfo: {
      type: Object,
      default: () => ({})
    },
    openQrcode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      qrCodeUrl: '',
      changeVal: null,
      timer: null,
      show_cg: false,
      show_fail: false
    }
  },
  computed: {
    ...mapState(['setQrInfo'])
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    show_cg: function(newQuestion, oldQuestion) {
      console.log('// 如果 `question` 发生改变，这个函数就会运行')
      console.log(newQuestion)
      if (newQuestion) {
        setTimeout(() => {
          // this.openQrcode = false
          this.$emit('openInoice')
          this.show_fail = false
          this.show_cg = false
          this.$emit('closeWindow')
        }, 3000)
      }
    }
  },
  created() {
    this.qrCodeUrl = this.setQrInfo.code_url
    console.log(this.qrCodeUrl)
  },
  mounted() {
    this.useqrcode()
    console.log('二维码页面')
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 关闭前的回调
    closeBtnHandler() {
      console.log('回调回调')
      this.show_fail = true
      // this.openQrcode = false
      setTimeout(() => {
        this.openQrcode = false
        this.show_fail = false
        this.show_cg = false
        this.$emit('closeWindow')
      }, 1000)
    },
    // 生成支付二维码
    useqrcode() {
      this.$nextTick(() => {
        var canvas = this.$refs.box
        Q.toCanvas(canvas, this.qrCodeUrl, (error) => {
          if (error) console.error(error)
          this.queryStatus()
          console.log('chen')
        })
      })
    },
    // 查询订单支付状态
    //
    queryStatus() {
      const { out_trade_no } = this.qrCodeInfo
      this.timer = setInterval(() => {
        console.log(out_trade_no)
        setmeals({ out_trade_no })
          .then(resp => {
            console.log(resp)
            if (resp.code === 400) {
              console.log('订单未完成')
              // this.show_cg = !this.show_cg
              // this.openQrcode = !this.openQrcode
              // this.Visibles = !this.Visibles
              // this.show_fail = !this.show_fail
              // this.$alert(resp.msg, '系统提示')
              // // this.openQrcode = !this.openQrcode
              // this.show_cg = true

              // this.openQrcode = false
              // setTimeout(() => {

              // }, 6000)
            } else if (resp.code === 200) {
              // this.openQrcode = !this.openQrcode
              // this.Visibles = !this.Visibles
              this.show_cg = true
              this.openQrcode = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }, 1000)
    }
  }

}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.el-dialog__body {
  overflow: hidden;
  padding: 0;
  width: 100%;
  height: 65%;
  // padding: 2.4vh 4.5vw 6.4vh 4.5vw;
  position: relative;
  .closeBtn {
    position: absolute;
    top: 2vh;
    right: 1vw;
    cursor: pointer;
  }
  .pay-image {
    width: 100%;
    height: 100%;
    background-color: #f00;
    font-size: 1vw;
    display: flex;
    text-align: center;
    justify-content: space-between;
    .weixin {
      width: 50%;
      height: 100%;
      background-color: #fff;
      .img {
        font-size: 2.5vw;
        // margin-left: 1vw;
        // text-align: left;
        cursor: default;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        // width: 4.3vw;
        height: 6vh;
      }
      span {
        font-size: 0.75vw;
        transform: scale(0.5);
        cursor: default;
      }
    }
    .qr-code {
      width: 100%;
      height: 100%;
      background-color: #fff;
      position: relative;
      img {
        display: inline-block;
        width: 2.4vw;
        height: 4.6vh;
        margin-left: 1vw;
        span {
          font-size: 1.1vw !important;
        }
      }
      canvas {
        position: absolute;
        top: 0;
        width: 6.6vw !important;
        height: 13.5vh !important;
        position: relative;
        top: -1.3vw;
        left: 30px;
      }
      span {
        font-size: 1vw;
        transform: scale(0.5);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.wy-choice-container {
  // overflow: hidden;
  /deep/ .el-dialog {
    margin-top: 40vh !important;
    // width: 19.6vw;
    // height: 23.3vh;
    overflow: hidden;
    .el-dialog__header {
      background-color: #f00;
      padding: 3.5vh 1.5vw 1.3vh;
    }
    .el-dialog__body {
      padding: 0;
      width: 100%;
      height: 65%;
      padding: 3.2vh 4.5vw 6.4vh 4.5vw !important;
      overflow: hidden;
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
            margin-left: 1vw !important;
          }
          span {
            font-size: 0.75vw;
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
    width: 5.19vw;
    height: 3.9vh;
    background: rgba(248, 172, 89, 1);
    border-radius: 4px;
    line-height: 0vh;
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: 22.3vw;
    bottom: -3.25vh;
    text-align: center;
    border: none !important;
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

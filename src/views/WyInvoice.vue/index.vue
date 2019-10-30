<template>
  <!-- eslint-disable -->
  <div class="choice-container">
    <div class="wy-login-nav">
      <span class="logo" style="cursor: default;">宅-物业操作系统1.0</span>
      <ul style="cursor: pointer;">
        <li>关于我们</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px"></div>
        <li>客服服务</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px"></div>
        <li>反馈建议</li>
        <div style="height:1.56vh;border:1px solid white;margin-top:3px"></div>
        <li>隐私政策</li>
      </ul>
    </div>

    <!-- 开票组件-->
    <div class="wy-invoice-container">
      <div class="wy-invoice-container_title" style="cursor:default;">请提供开票信息</div>
      <div class="wy-form">
        <div v-for="list in lists" :key="list.id" class="form-item">
          <label for="male">{{ list.name }}</label>
          <input v-model="list.value" type="text" />
          <br />
        </div>
        <div class="wy-invoice-container_btn" @click="invoiceHandler()">确认</div>
      </div>
    </div>
    <p class="wy-login-bottom">成都同享社圈智慧科技有限公司版权所有</p>
  </div>
</template>

<script>
import { postInvoices, postInvoicesSuccess } from '../../api/user'
import { Message } from 'element-ui'
export default {
  name: 'WyInvoice',
  data() {
    return {
      labelPosition: 'right',
      lists: [
        { value: '', name: '公司名称 :', id: 1 },
        { value: '', name: '公司税号 :', id: 2 },
        { value: '', name: '地  址 :', id: 3 },
        { value: '', name: '开户银行 :', id: 4 },
        { value: '', name: '账  号 :', id: 5 },
        { value: '', name: '收票地址 :', id: 6 },
        { value: '', name: '收 票 人 :', id: 7 },
        { value: '', name: '联系电话 :', id: 8 }
      ],
      propertyId: '',
      queryInfo: {}
    }
  },
  created() {
    this.getInvoiceData()
  },
  methods: {
    getInvoiceData() {
      const propertyId = JSON.parse(localStorage.getItem('replcaeData')).propertyId
      const data = { propertyId }
      console.log(data)
      postInvoices(data).then(resp => {
        if (resp.code === 400) {
          Message(resp.msg)
        } else {
          this.lists[0].value = resp.msg.company_name
          this.lists[1].value = resp.msg.company_paragraph
          this.lists[2].value = resp.msg.company_address
          this.lists[3].value = resp.msg.company_Bank
          this.lists[4].value = resp.msg.company_user
          this.lists[5].value = resp.msg.Invoice_Address
          this.lists[6].value = resp.msg.Invoice_user
          this.lists[7].value = resp.msg.Invoice_phone
          // const { company_name, company_paragraph, company_address, company_Bank, company_user, Invoice_Address, Invoice_user, Invoice_phone } = resp.msg
          // this.queryInfo = { company_name, company_paragraph, company_address, company_Bank, company_user, Invoice_Address, Invoice_user, Invoice_phone, propertyId, Communityid, uname }
          // console.log(this.queryInfo)
        }
      })
    },
    invoiceHandler() {
      localStorage.setItem('isRefresh', true)
      const Communityid = JSON.parse(localStorage.getItem('userInfo')).data.Communityid
      const user = JSON.parse(localStorage.getItem('userInfo')).data.uname
      const propertyId = JSON.parse(localStorage.getItem('replcaeData')).propertyId
      const data2 = {
        Communityid,
        user,
        propertyId,
        company_name: this.lists[0].value,
        company_paragraph: this.lists[1].value,
        company_address: this.lists[2].value,
        company_Bank: this.lists[3].value,
        company_user: this.lists[4].value,
        Invoice_Address: this.lists[5].value,
        Invoice_user: this.lists[6].value,
        Invoice_phone: this.lists[7].value

      }
      postInvoicesSuccess(data2).then(resp => {
        if (resp.code === 200) {
          console.log(resp)
          Message(resp.msg)
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 2000)
        } else {
          Message(resp.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wy-invoice-container {
  width: 30vw;
  height: 67vh;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: 3.6vh 3.8vw 2.7vh;
  border-radius: 11px;
  &_title {
    font-size: 1.2vw;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 3.6vh;
    text-align: center;
  }
  .wy-form {
    font-size: 0.85vw;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(102, 102, 102, 1);
    label {
      width: 5.3vw;
      display: inline-block;
      padding-right: 1vw;
      text-align: right;
    }
    input {
      width: 15vw;
      margin-bottom: 3.8vh;
      outline: none;
      border: none;
      padding-left: 0.58vw;
      font-size: 0.85vw;
      margin-right: 1.5vw;
      border-bottom: 1px solid rgba(51, 51, 51, 1);
      // text-align: center;
    }
    .wy-invoice-container_btn {
      border: 1px solid;
      width: 4.5vw;
      height: 4vh;
      line-height: 3.6vh;
      margin-top: 1vh;
      text-align: center;
      margin: 0 auto;
      background: rgba(248, 172, 89, 1);
      border-radius: 4px;
      font-size: 0.85vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss" scoped>
// .choice-container {
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(
//     -45deg,
//     rgba(95, 126, 255, 1) 0%,
//     rgba(88, 199, 255, 1) 100%
//   );
//   position: relative;
//   .wy-login-nav {
//     color: rgba(255, 255, 255, 1);
//     display: flex;
//     justify-content: space-between;
//     padding: 16px 39px 0px 39px;
//     font-family: MicrosoftYaHei;
//     font-weight: 400;
//     span {
//       font-size: 1.3vw;
//     }
//     ul {
//       display: flex;
//       li {
//         height: 1vw;
//         border-right: 1px solid white;
//         padding: 0px 10px 0 10px;
//         font-size: 1vw;
//         font-family: MicrosoftYaHei;
//         font-weight: 400;
//       }
//     }
//   }
//   .choice-main {
//     width: 50vw;
//     height: 50vh;
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     margin: auto;
//     overflow: hidden;
//     padding: 4.7vh 1.7vw 4vh 1.7vw;
//     // background-color: #fff;
//     background: rgba(255, 255, 255, 1);
//     border-radius: 11px;
//     .el-col {
//       margin-top: 30px;
//       // cursor: pointer;
//     }
//   }
//   .wy-login-bottom {
//     position: absolute;
//     bottom: 7px;
//     right: 43vw;
//     color: rgba(255, 255, 255, 1);
//     font-size: 1vw;
//     font-family: MicrosoftYaHei;
//     font-weight: 400;
//   }
// }

.choice-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(95, 126, 255, 1) 0%,
    rgba(88, 199, 255, 1) 100%
  );
  position: relative;
  .wy-login-nav {
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    padding: 3.1vh 2.9vw 0 4vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    span {
      font-size: 1vw;
    }
    ul {
      display: flex;
      padding-top: 0.3vh;

      li {
        // height: 0.8vw;
        // border-right: 1px solid white;
        padding: 0 1vw 0 0.8vw;
        font-size: 0.8vw;
        font-family: MicrosoftYaHei;
        font-weight: 400;
      }
    }
  }
  .choice-main {
    width: 50vw;
    height: 50vh;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
    padding: 4.7vh 1.7vw 4vh 1.7vw;
    // background-color: #fff;
    background: rgb(247, 169, 169);
    border-radius: 11px;
    .el-col {
      margin-top: 30px;
      // cursor: pointer;
    }
  }
  .wy-login-bottom {
    cursor: default;
    position: absolute;
    bottom: 1.3vh;
    right: 43vw;
    color: rgba(255, 255, 255, 1);
    font-size: 0.8vw;
    font-family: MicrosoftYaHei;
    font-weight: 400;
  }
}
</style>

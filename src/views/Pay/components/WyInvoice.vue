<template>
  <div class="wy-invoice-container">
    <div class="wy-invoice-container_title">请提供开票信息</div>
    <div class="wy-form">
      <div v-for="list in lists" :key="list.id" class="form-item">
        <label for="male">{{ list.name }}</label>
        <input v-model="list.value" type="text">
        <br>
      </div>
      <div class="wy-invoice-container_btn">提交</div>
    </div>
  </div>
</template>

<script>
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
      ]
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
    text-align: right;

    label {
      width: 5.3vw;
      display: inline-block;
      padding-right: 1vw;
    }
    input {
      width: 15vw;
      margin-bottom: 3.8vh;
      outline: none;
      border: none;
      margin-right: 1.5vw;
      border-bottom: 1px solid rgba(51, 51, 51, 1);
    }
    .wy-invoice-container_btn {
      border: 1px solid;
      width: 5.2vw;
      height: 3.9vh;
      line-height: 3.6vh;
      text-align: center;
      margin-top: 1vh;
      margin: 0 auto;
      background: rgba(248, 172, 89, 1);
      border-radius: 4px;
      font-size: 0.8vw;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

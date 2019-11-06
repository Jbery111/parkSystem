<template>
  <div class="card-container">
      <div class="icon">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="txt">
          <span class="title">15565415</span>
          <span class="describ">住户认证(待处理)</span>
      </div>
      <div class="button">审核</div>
  </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.card-container{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 500px;
    height: 150px;
    background-color: #fff;
    padding: 40px;
    .icon{
        width: 70px;
        height: 70px;
        background-color: #ddd;
        border-radius: 4px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .txt{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .title{
            font-size: 26px;
            color: #FD3D3D;
        }
        .describ{
            font-size: 12px;
            color: #666666;
        }
    }
    .button{
        margin: auto 0;
        width: 90px;
        height: 32px;
        color: #fff;
        background-color: #5FAFE4;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        border-radius: 15px;
    }
}

</style>
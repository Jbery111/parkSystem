<template>
  <div class="wy-homepage">
    <MyCard />
    <Form />
  </div>
</template>

<script>
import MyCard from '@/components/MyCard'
import Form from './Form'
export default {
  components: {
    MyCard,
    Form,
  },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
  .wy-homepage{
    background-color: #cdcdcd;
    height: 100%;
    padding-bottom: 20px;
    padding-right: 46px;
    padding-left: 30px;
    padding-top: 30px;
  }
</style>
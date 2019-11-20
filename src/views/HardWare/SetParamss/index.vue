<template>
  <div class="hard-setparamClass">
    <div class="setparam-container">
      <el-collapse v-model="activeNames" @change="handleChange">
        <!-- 基础设置 -->
        <el-collapse-item title="基础设置" name="1">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="详细地址:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场详细地址" />
                </el-form-item>
                <el-form-item label="车位总数:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车位数量" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <!-- 开闸管理 -->
        <el-collapse-item title="开闸管理" name="2">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                    <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="radio">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <!-- 收费设置 -->
        <el-collapse-item title="收费设置" name="3">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="显示屏设置" name="4">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="button-class">
        <span class="button">确认</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      activeNames: ['1', '2', '3', '4'], // 展开列
      labelPosition: 'top',
      radio: 3, // 开闸管理
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  computed: {},
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang='scss' scoped>
.hard-setparamClass {
  height: 555px;
  overflow: auto;
}
.setparam-container {
  position: relative;
  // height: 2000px;
  // background-color: green;
  width: 100%;
  .sum-class {
    display: flex;
    // height: ;
    margin: 0px 20px;
    .left-class {
      margin-right: 100px;
      margin-left: 78px;
      box-sizing: border-box;
    }
    // .right-class {
    //   margin-right: ;
    // }
  }
}
/deep/.el-input__inner {
  border: 1px solid #dcdfe6ff !important;
  width: 400px !important;
  height: 32px !important;
}
.sumbox {
  width: 50%;
  height: 100%;
}
/deep/.el-form--label-top .el-form-item__label {
  padding: 0px !important;
  height: 27px;
}
.button-class {
  position: absolute;
  height: 30px;
  bottom: -150px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  box-sizing: border-box;
  .button {
    background-color: #f00;
    border: none;
    width: 72px;
    height: 30px;
    background: rgba(252, 176, 72, 1);
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 254, 254, 1);
  }
}
</style>

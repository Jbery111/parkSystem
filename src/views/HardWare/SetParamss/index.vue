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
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="负责人:">
                  <el-input v-model="formLabelAlign.basis_name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="联系电话:">
                  <el-input v-model="formLabelAlign.basis_phone" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="详细地址:">
                  <el-input v-model="formLabelAlign.basis_address" placeholder="请输入停车场详细地址" />
                </el-form-item>
                <el-form-item label="车位总数:">
                  <el-input v-model="formLabelAlign.basis_number" placeholder="请输入停车位数量" />
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
              <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                  <el-radio-group v-model="formLabelAlign.car_number">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="长租车辆是否自动抬杆:">
                  <el-radio-group v-model="formLabelAlign.car_rent">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="出口是否无条件开闸:">
                  <el-radio-group v-model="formLabelAlign.car_export">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="同一道口，重复识别车牌间隔时间（秒）:">
                  <el-input v-model="formLabelAlign.car_endtime" />
                </el-form-item>
                <!-- TODOS: -->
                <el-form-item label="支付后多少分钟内需要离场（分钟）:">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否允许抬杆放行:">
                  <el-radio-group v-model="formLabelAlign.car_double">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="黄牌车指定通道:">
                  <el-radio-group v-model="formLabelAlign.car_yellow">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- //请选择门岗 -->
                <el-select v-model="ChoiceDoor_value" placeholder="请选择门岗">
                  <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                  <el-option
                    v-for="item in options_ChoiceDoor"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-form-item label="军警车是否自动开闸:">
                  <el-radio-group v-model="formLabelAlign.car_police">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否检测有无物业欠费情况:">
                  <el-radio-group v-model="formLabelAlign.car_wuye">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="物业费欠费时是否不放行:" v-if="formLabelAlign.car_wuye === 1 ? true : false">
                  <el-radio-group v-model="formLabelAlign.car_wuye_release" >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                  <el-input v-model="formContent.myself_msg" placeholder="请自定义提示语" v-if="formLabelAlign.car_wuye_release === 1 ? true : false"/>
                </el-form-item>
                <el-form-item label="使用APP或公众号申请绑定车辆时，是否需要后台操作人员审核:">
                  <el-radio-group v-model="formLabelAlign.car_app">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
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
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="免费停车时间（分钟）:">
                  <el-input v-model="formLabelAlign.car_time"  />
                </el-form-item>
                <el-form-item label="基本收费时长（小时）:">
                  <el-input v-model="formLabelAlign.car_price_time" />
                </el-form-item>
                <el-form-item label="基本收费费用（元）:">
                  <el-input v-model="formLabelAlign.car_price	"  />
                </el-form-item>
                <el-form-item label="超时后收费计时单位（小时）:">
                  <el-input v-model="formLabelAlign.time_out"  />
                </el-form-item>
                <el-form-item label="超时后收费单价（元）:">
                  <el-input v-model="formLabelAlign.time_out_price" />
                </el-form-item>
                <p>若上方四个值分别为:2，3，2，3，则超过免费时长后2小时内收费3元,超过2个小时,每2个小时收费3元</p>
                <el-form-item label="单日收费最高限制（元）:">
                  <el-input v-model="formLabelAlign.max_price"  />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="单日结算周期:">
                  <el-select v-model="formLabelAlign.cycle" placeholder="请选择门岗">
                  <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                  <el-option
                    v-for="item in options_ondayCycle"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="单次停车是否有最高收费限制:">
                  <!-- //single_max -->
                  <el-radio-group v-model="formLabelAlign.single_max">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                  <el-input v-model="formLabelAlign.single_max_price" placeholder="请输入最高收费金额" />
                </el-form-item>
                <el-form-item label="一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否持续计费:">
                  <el-radio-group v-model="formLabelAlign.car_double_price">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="一位多车情况下，当车位所剩车辆和车位数量相符时是否停止收费:">
                  <el-radio-group v-model="formLabelAlign.car_double_price_2">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="长租车欠费缓冲时长（天）:">
                  <el-input v-model="formLabelAlign.car_rent_price" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="长租车出场时若租期已满，是否从过期时间计算费用:">
                  <el-radio-group v-model="formLabelAlign.car_rent_price_2">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <!-- 显示屏设置 -->
        <el-collapse-item title="显示屏设置" name="4">
          <!-- 总 -->
          <div class="sum-class">
            <!-- 左部分 -->
            <div class="sumbox left-class">
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="显示屏显示行数:">
                  <!-- //下拉框 -->
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="长租车,入场时显示屏显示的信息:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="临停车,入场时显示屏显示的信息:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="无车时,入口显示屏显示的内容信息:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="长租车提前提示车位到期时间（天）:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="长租车提前提示车位到期时间（天）:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
              </el-form>
            </div>
            <!-- 右部分 -->
            <div class="sumbox right-class">
              <el-form :label-position="labelPosition" label-width="80px" >
                <el-form-item label="长租车,出场时显示屏显示的信息:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="临停车,出场时显示屏显示的信息:">
                  <el-input v-model="formLabelAlign.region" placeholder="请输入停车场负责人联系电话" />
                </el-form-item>
                <el-form-item label="无车时,出口显示屏显示的内容信息:">
                  <el-input v-model="formLabelAlign.name" placeholder="请输入停车场负责人" />
                </el-form-item>
                <el-form-item label="车辆通过时，显示屏重复显示信息的时间（秒）:">
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
        basis_name:'',//负责人
        basis_phone:'',//联系电话
        basis_address:'',//详细地址
        basis_number:'',//车位总数
        // 开闸管理
        car_number:2,//是否匹配车牌地域名称（例：京、川）:
        car_rent:1,//长租车辆是否自动抬杆:
        car_export:2,//出口是否无条件开闸:
        car_endtime:60,//同一道口，重复识别车牌间隔时间（秒）:
        car_double: 2,//一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否允许抬杆放行
        car_yellow:2,//黄牌车指定通道
        car_police:1,//军警车是否自动开闸
        car_wuye:2,//是否检测有无物业欠费情况
        car_wuye_release:2,//物业费欠费时是否不放行
        car_app:1,//使用APP或公众号申请绑定车辆时，是否需要后台操作人员审核
        //收费设置
        car_time: '15',//免费停车时间（分钟）
        car_price_time: '',//基本收费时长（小时）
        car_price: '',//基本收费费用（元）
        time_out: '',//超时后收费计时单位（小时）
        time_out_price: '2,3,2,3',//超时后收费单价（元）
        max_price: '',//单日收费最高限制（元）
        cycle: '1',//单日结算周期
        single_max: 2,//单次停车是否有最高收费限制
        single_max_price: '',//请输入最高收费金额
        car_double_price: 1,//一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否持续计费
        car_double_price_2: 2,//一位多车情况下，当车位所剩车辆和车位数量相符时是否停止收费
        car_rent_price: '0',//长租车欠费缓冲时长（天）
        car_rent_price_2: 2,//长租车出场时若租期已满，是否从过期时间计算费用


      },
      formContent: {
        myself_msg:'',//自定义提示语
      },
      options_ChoiceDoor: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      ChoiceDoor_value:'',//选择门岗的值//TODOS是否填在formLabelAlign
      options_ondayCycle: [
        {
          value: '1',
          label: '凌晨12点'
        }, {
          value: '2',
          label: '24小时'
        }
      ],
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
  height: 100%;
  // overflow: auto;
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
/deep/ .el-form-item {
  height: 75px !important;
}
</style>

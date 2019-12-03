<template>
  <div class="modify-main" style="position:relative;">
    <div class="card-main">
      <span id="newadd" @click="isExit">返回上一级</span>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <!-- 基础设置 -->
      <el-collapse-item title="基础设置" name="1">
        <!-- 总 -->
        <div class="sum-class">
          <!-- 左部分 -->
          <div class="sumbox left-class">
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
              <el-form-item label="内场名称:">
                <el-input v-model="formLabelAlign.name" placeholder="请输入内场名称" />
              </el-form-item>
            </el-form>
          </div>
          <!-- 右部分 -->
          <div class="sumbox right-class">
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
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
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
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
                <el-input v-model="formLabelAlign.end_time" />
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
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
              <el-form-item label="黄牌车指定通道:">
                <el-radio-group v-model="car_yellow1">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- //请选择门岗 -->
              <el-select v-model="ChoiceDoor_value" v-if="car_yellow1 === 1">
                <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                <el-option
                  v-for="item in options_ChoiceDoor"
                  :key="item.id"
                  :label="item.door_post_name"
                  :value="item.door_post_name"
                >
                  <span
                    class="chenp"
                    @click="hanPoid_DoorType(item.id)"
                    style="display:block;"
                  >{{ item.door_post_name }}</span>
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
              <el-form-item
                label="物业费欠费时是否不放行:"
                v-if="formLabelAlign.car_wuye === 1 ? true : false"
              >
                <el-radio-group v-model="formLabelAlign.car_wuye_release">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
                <el-input
                  v-model="formContent.myself_msg"
                  placeholder="请自定义提示语"
                  v-if="formLabelAlign.car_wuye_release === 1 ? true : false"
                />
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
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
              <el-form-item label="免费停车时间（分钟）:">
                <el-input v-model="formLabelAlign.car_time" />
              </el-form-item>
              <el-form-item label="基本收费时长（小时）:">
                <el-input v-model="formLabelAlign.car_price_time" />
              </el-form-item>
              <el-form-item label="基本收费费用（元）:">
                <el-input v-model="formLabelAlign.car_price	" />
              </el-form-item>
              <el-form-item label="超时后收费计时单位（小时）:">
                <el-input v-model="formLabelAlign.time_out" />
              </el-form-item>
              <el-form-item label="超时后收费单价（元）:">
                <el-input v-model="formLabelAlign.time_out_price" />
              </el-form-item>
              <p>若上方四个值分别为:2，3，2，3，则超过免费时长后2小时内收费3元,超过2个小时,每2个小时收费3元</p>
              <el-form-item label="单日收费最高限制（元）:">
                <el-input v-model="formLabelAlign.max_price" />
              </el-form-item>
            </el-form>
          </div>
          <!-- 右部分 -->
          <div class="sumbox right-class">
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
              <el-form-item label="单日结算周期:">
                <el-select v-model="formLabelAlign.cycle">
                  <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                  <el-option
                    v-for="item in options_ondayCycle"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="单次停车是否有最高收费限制:">
                <!-- //single_max -->
                <el-radio-group v-model="formLabelAlign.single_max">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
                <el-input
                  v-model="formLabelAlign.single_max_price"
                  placeholder="请输入最高收费金额"
                  v-if="formLabelAlign.single_max === 1"
                />
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
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
              <el-form-item label="显示屏显示行数:">
                <!-- //下拉框 -->
                <el-select v-model="formLabelAlign.led_number" placeholder="请选择显示屏显示行数">
                  <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                  <el-option
                    v-for="item in options_screenNum"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息: -->
              <el-form-item
                label="长租车,入场时显示屏显示的信息:"
                v-if="formLabelAlign.led_number === 2 || formLabelAlign.led_number === 4 || formLabelAlign.led_number === 6"
              >
                <!-- //下拉框 -->
                <div>
                  <span>第一行</span>
                  <el-select
                    filterable
                    v-model="car_rent_admission1[0]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_rent_admission1"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第二行</span>
                  <el-select
                    v-model="car_rent_admission1[1]"
                    filterable
                    popper-class="selectClass"
                    reserve-keyword
                    default-first-option
                    :allow-create="true"
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_admission2"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                v-if="formLabelAlign.led_number === 6 || formLabelAlign.led_number === 4 "
              >
                <!-- //下拉框 -->
                <div>
                  <span>第三行</span>
                  <el-select
                    filterable
                    v-model="car_rent_admission1[2]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_admission3"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第四行</span>
                  <el-select
                    filterable
                    v-model="car_rent_admission1[3]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_rent_admission4"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="formLabelAlign.led_number === 6">
                <!-- //下拉框 -->
                <div>
                  <span>第五行</span>
                  <el-select
                    filterable
                    v-model="car_rent_admission1[4]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_admission5"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第六行</span>
                  <el-select
                    filterable
                    v-model="car_rent_admission1[5]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_admission6"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <!-- 临停车,入场时显示屏显示的信息:临停车,入场时显示屏显示的信息:临停车,入场时显示屏显示的信息:临停车,入场时显示屏显示的信息: -->
              <el-form-item
                label="临停车,入场时显示屏显示的信息:"
                v-if="formLabelAlign.led_number === 2 || formLabelAlign.led_number === 4 || formLabelAlign.led_number === 6"
              >
                <!-- //下拉框 -->
                <div>
                  <span>第一行</span>
                  <el-select
                    filterable
                    v-model="car_stop_admission1[0]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_stop_admission1"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第二行</span>
                  <el-select
                    v-model="car_stop_admission1[1]"
                    filterable
                    popper-class="selectClass"
                    reserve-keyword
                    default-first-option
                    :allow-create="true"
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_admission2"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                v-if="formLabelAlign.led_number === 6 || formLabelAlign.led_number === 4 "
              >
                <!-- //下拉框 -->
                <div>
                  <span>第三行</span>
                  <el-select
                    filterable
                    v-model="car_stop_admission1[2]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_admission3"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第四行</span>
                  <el-select
                    filterable
                    v-model="car_stop_admission1[3]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_stop_admission4"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="formLabelAlign.led_number === 6">
                <!-- //下拉框 -->
                <div>
                  <span>第五行</span>
                  <el-select
                    filterable
                    v-model="car_stop_admission1[4]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_admission5"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第六行</span>
                  <el-select
                    filterable
                    v-model="car_stop_admission1[5]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_admission6"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <!-- 无车时,入口显示屏显示的内容信息无车时,入口显示屏显示的内容信息无车时,入口显示屏显示的内容信息无车时,入口显示屏显示的内容信息无车时,入口显示屏显示的内容信息 -->
              <el-form-item
                label="无车时,入口显示屏显示的内容信息:"
                v-if="formLabelAlign.led_number === 2 || formLabelAlign.led_number === 4 || formLabelAlign.led_number === 6"
              >
                <!-- //下拉框 -->
                <div>
                  <span>第一行</span>
                  <el-select
                    filterable
                    v-model="car_no_admission1[0]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_no_admission1"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第二行</span>
                  <el-select
                    v-model="car_no_admission1[1]"
                    filterable
                    popper-class="selectClass"
                    reserve-keyword
                    default-first-option
                    :allow-create="true"
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_admission2"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                v-if="formLabelAlign.led_number === 6 || formLabelAlign.led_number === 4 "
              >
                <!-- //下拉框 -->
                <div>
                  <span>第三行</span>
                  <el-select
                    filterable
                    v-model="car_no_admission1[2]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_admission3"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第四行</span>
                  <el-select
                    filterable
                    v-model="car_no_admission1[3]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_no_admission4"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="formLabelAlign.led_number === 6">
                <!-- //下拉框 -->
                <div>
                  <span>第五行</span>
                  <el-select
                    filterable
                    v-model="car_no_admission1[4]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_admission5"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第六行</span>
                  <el-select
                    filterable
                    v-model="car_no_admission1[5]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_admission6"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="长租车提前提示车位到期时间（天）:">
                <el-input v-model="formLabelAlign.car_rent_day" />
              </el-form-item>
              <el-form-item label="扬声器声音大小(0-10):">
                <!-- <span>扬声器{{formLabelAlign.sound}}</span> -->
                <div class="block">
                  <el-slider max="10" v-model="formLabelAlign.sound" step="1" show-stops></el-slider>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <!-- 右部分 -->
          <div class="sumbox right-class">
            <el-form :label-position="labelPosition" label-width="80px" :disabled="disableShow">
              <!-- 长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息: -->
              <el-form-item
                label="长租车,出场时显示屏显示的信息:"
                v-if="formLabelAlign.led_number === 2 || formLabelAlign.led_number === 4 || formLabelAlign.led_number === 6"
              >
                <!-- //下拉框 -->
                <div>
                  <span>第一行</span>
                  <el-select
                    filterable
                    v-model="car_rent_appearance1[0]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_rent_appearance1"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第二行</span>
                  <el-select
                    v-model="car_rent_appearance1[1]"
                    filterable
                    popper-class="selectClass"
                    reserve-keyword
                    default-first-option
                    :allow-create="true"
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_appearance2"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                v-if="formLabelAlign.led_number === 6 || formLabelAlign.led_number === 4 "
              >
                <!-- //下拉框 -->
                <div>
                  <span>第三行</span>
                  <el-select
                    filterable
                    v-model="car_rent_appearance1[2]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_appearance3"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第四行</span>
                  <el-select
                    filterable
                    v-model="car_rent_appearance1[3]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_rent_appearance4"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="formLabelAlign.led_number === 6">
                <!-- //下拉框 -->
                <div>
                  <span>第五行</span>
                  <el-select
                    filterable
                    v-model="car_rent_appearance1[4]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_appearance5"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第六行</span>
                  <el-select
                    filterable
                    v-model="car_rent_appearance1[5]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_rent_appearance6"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <!-- 临停车,入场时显示屏显示的信息:临停车,入场时显示屏显示的信息:临停车,入场时显示屏显示的信息:临停车,入场时显示屏显示的信息: -->
              <el-form-item
                label="临停车,出场时显示屏显示的信息:"
                v-if="formLabelAlign.led_number === 2 || formLabelAlign.led_number === 4 || formLabelAlign.led_number === 6"
              >
                <!-- //下拉框 -->
                <div>
                  <span>第一行</span>
                  <el-select
                    filterable
                    v-model="car_stop_appearance1[0]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_stop_appearance1"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第二行</span>
                  <el-select
                    v-model="car_stop_appearance1[1]"
                    filterable
                    popper-class="selectClass"
                    reserve-keyword
                    default-first-option
                    :allow-create="true"
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_appearance2"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                v-if="formLabelAlign.led_number === 6 || formLabelAlign.led_number === 4 "
              >
                <!-- //下拉框 -->
                <div>
                  <span>第三行</span>
                  <el-select
                    filterable
                    v-model="car_stop_appearance1[2]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_appearance3"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第四行</span>
                  <el-select
                    filterable
                    v-model="car_stop_appearance1[3]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_stop_appearance4"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="formLabelAlign.led_number === 6">
                <!-- //下拉框 -->
                <div>
                  <span>第五行</span>
                  <el-select
                    filterable
                    v-model="car_stop_appearance1[4]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_appearance5"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第六行</span>
                  <el-select
                    filterable
                    v-model="car_stop_appearance1[5]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_stop_appearance6"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                label="无车时,出口显示屏显示的内容信息:"
                v-if="formLabelAlign.led_number === 2 || formLabelAlign.led_number === 4 || formLabelAlign.led_number === 6"
              >
                <!-- //下拉框 -->
                <div>
                  <span>第一行</span>
                  <el-select
                    filterable
                    v-model="car_no_appearance1[0]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_no_appearance1"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第二行</span>
                  <el-select
                    v-model="car_no_appearance1[1]"
                    filterable
                    popper-class="selectClass"
                    reserve-keyword
                    default-first-option
                    :allow-create="true"
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_appearance2"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item
                v-if="formLabelAlign.led_number === 6 || formLabelAlign.led_number === 4 "
              >
                <!-- //下拉框 -->
                <div>
                  <span>第三行</span>
                  <el-select
                    filterable
                    v-model="car_no_appearance1[2]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_appearance3"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第四行</span>
                  <el-select
                    filterable
                    v-model="car_no_appearance1[3]"
                    popper-class="selectClass"
                    :allow-create="true"
                    default-first-option
                    reserve-keyword
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <span slot="empty" class="select-dropdown__empty">没有此选项</span>
                    <div v-if="selectShow">
                      <el-option
                        v-for="(item,index) in screenConten.car_no_appearance4"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </div>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item v-if="formLabelAlign.led_number === 6">
                <!-- //下拉框 -->
                <div>
                  <span>第五行</span>
                  <el-select
                    filterable
                    v-model="car_no_appearance1[4]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_appearance5"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <!-- //下拉框 -->
                <div>
                  <span>第六行</span>
                  <el-select
                    filterable
                    v-model="car_no_appearance1[5]"
                    popper-class="selectClass"
                    :allow-create="true"
                    reserve-keyword
                    default-first-option
                  >
                    <!-- v-model="value"中'value"的值为el-option的value属性值 -->
                    <el-option
                      v-for="(item,index) in screenConten.car_no_appearance6"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="车辆通过时，显示屏重复显示信息的时间（秒）:">
                <el-input v-model="formLabelAlign.time" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="button-class">
      <span class="button" @click="addSetting">确认</span>
    </div>
  </div>
</template>

<script>
import { postDoorListId, postSettingadd, postMonthly, postMonthlyOut, postNonMonthly, postNonMonthlyOut } from '@/api/hardware'
import { Message } from 'element-ui'
// data数据
export default {
  components: {},
  data () {
    return {
      disableShow: false,
      centerDialogVisible1: false, // 新增门岗
      isShowCard2: true,
      setModifyVisble: true,//判断是否为设置参数还是修改参数
      selectShow: true,//当显示屏的下拉框变成输入框时对应的下拉框是否消失
      activeNames: ['1', '2', '3', '4'], // 展开列
      labelPosition: 'top',
      radio: 3, // 开闸管理
      formLabelAlign: {
        name: '',//负责人
        basis_number: null,//车位总数
        // 开闸管理
        car_number: 2,//是否匹配车牌地域名称（例：京、川）:
        car_rent: 1,//长租车辆是否自动抬杆:
        car_export: 2,//出口是否无条件开闸:
        car_endtime: 60,//同一道口，重复识别车牌间隔时间（秒）:
        car_double: 2,//一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否允许抬杆放行
        car_yellow: 0,//黄牌车指定通道
        car_police: 1,//军警车是否自动开闸
        car_wuye: 2,//是否检测有无物业欠费情况
        car_wuye_release: 2,//物业费欠费时是否不放行
        end_time: null,
        car_app: 1,//使用APP或公众号申请绑定车辆时，是否需要后台操作人员审核
        //收费设置
        car_time: 15,//免费停车时间（分钟）
        car_price_time: null,//基本收费时长（小时）
        car_price: null,//基本收费费用（元）
        time_out: null,//超时后收费计时单位（小时）
        time_out_price: '2,3,2,3',//超时后收费单价（元）
        max_price: null,//单日收费最高限制（元）
        cycle: 1,//单日结算周期
        single_max: 2,//单次停车是否有最高收费限制
        single_max_price: 0,//请输入最高收费金额
        car_double_price: 1,//一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否持续计费
        car_double_price_2: 2,//一位多车情况下，当车位所剩车辆和车位数量相符时是否停止收费
        car_rent_price: 0,//长租车欠费缓冲时长（天）
        car_rent_price_2: 2,//长租车出场时若租期已满，是否从过期时间计算费用
        //显示屏
        led_number: 2,//下拉选择行数
        car_rent_day: null,//长租车提前提示车位到期时间（天）
        car_rent_admission: '',
        car_stop_admission: '',
        car_no_admission: '',
        car_rent_appearance: '',
        car_stop_appearance: '',
        car_no_appearance: '',
        sound: 0,//扬声器声音大小(0-10)
        time: null,//车辆通过时，显示屏重复显示信息的时间（秒）
        state: 2,
        pid: 0,
        parkid: null
      },
      car_yellow1: 0,//黄牌车指定通道
      formContent: {
        myself_msg: '',//自定义提示语
      },
      options_ChoiceDoor: [],//门岗类型
      ChoiceDoor_value: '',//选择门岗的值//TODOS是否填在formLabelAlign
      //下拉选择显示屏幕行数
      options_screenNum: [
        {
          value: 2,
          label: 2
        }, {
          value: 4,
          label: 4
        }, {
          value: 6,
          label: 6
        }

      ],
      //显示屏下拉框的数据
      screenConten: {
        //长租车入场
        car_rent_admission1: {},
        car_rent_admission2: {},
        car_rent_admission3: {},
        car_rent_admission4: {},
        car_rent_admission5: {},
        car_rent_admission6: {},
        //临停车入场
        car_stop_admission1: {},
        car_stop_admission2: {},
        car_stop_admission3: {},
        car_stop_admission4: {},
        car_stop_admission5: {},
        car_stop_admission6: {},
        //无车时入场
        car_no_admission1: {},
        car_no_admission2: {},
        car_no_admission3: {},
        car_no_admission4: {},
        car_no_admission5: {},
        car_no_admission6: {},
        //长租车出厂
        car_rent_appearance1: {},
        car_rent_appearance2: {},
        car_rent_appearance3: {},
        car_rent_appearance4: {},
        car_rent_appearance5: {},
        car_rent_appearance6: {},
        //临停车出厂
        car_stop_appearance1: {},
        car_stop_appearance2: {},
        car_stop_appearance3: {},
        car_stop_appearance4: {},
        car_stop_appearance5: {},
        car_stop_appearance6: {},
        //无车时出厂
        car_no_appearance1: {},
        car_no_appearance2: {},
        car_no_appearance3: {},
        car_no_appearance4: {},
        car_no_appearance5: {},
        car_no_appearance6: {},

      },
      //显示屏用户输入的数据
      car_rent_admission1: [],
      car_stop_admission1: [],
      car_no_admission1: [],
      car_rent_appearance1: [],
      car_stop_appearance1: [],
      car_no_appearance1: [],
      options_ondayCycle: [
        {
          value: 1,
          label: '凌晨12点'
        }, {
          value: 2,
          label: '24小时'
        }
      ],
      parkid: null,
      userInfoList: {},//localStorage的userInfo
    }
  },
  computed: {},
  watch: {

  },
  created () {
    console.log('创建新增内场')
    const isSetParams = JSON.parse(localStorage.getItem('items')).state_type
    const setParamState = JSON.parse(localStorage.getItem('setParamState'))
    console.log(setParamState, 'setParamStatesetParamStatesetParamState')
    if (isSetParams === 2) {
      this.setModifyVisble = false
    } else {
      if (setParamState === 1) {
        this.setModifyVisble = false
      }
    }
    this.userInfoList = JSON.parse(localStorage.getItem('userInfo'))
    this.parkid = JSON.parse(localStorage.getItem('items')).id
    // alert('新增门岗')
    postDoorListId({ parkid: this.parkid }).then(resp => {
      // console.log(resp,'门岗类型列表')
      this.options_ChoiceDoor = resp.data
    })
    //led下拉提示语
    postMonthly({}).then(resp => {
      console.log(resp, 'resp提示语')
      this.screenConten.car_rent_admission1 = resp.data
      this.screenConten.car_rent_admission2 = resp.data
      this.screenConten.car_rent_admission3 = resp.data
      this.screenConten.car_rent_admission4 = resp.data
      this.screenConten.car_rent_admission5 = resp.data
      this.screenConten.car_rent_admission6 = resp.data
    })
    postMonthlyOut({}).then(resp => {
      this.screenConten.car_rent_appearance1 = resp.data
      this.screenConten.car_rent_appearance2 = resp.data
      this.screenConten.car_rent_appearance3 = resp.data
      this.screenConten.car_rent_appearance4 = resp.data
      this.screenConten.car_rent_appearance5 = resp.data
      this.screenConten.car_rent_appearance6 = resp.data
    })
    postNonMonthly({}).then(resp => {
      this.screenConten.car_stop_admission1 = resp.data
      this.screenConten.car_stop_admission2 = resp.data
      this.screenConten.car_stop_admission3 = resp.data
      this.screenConten.car_stop_admission4 = resp.data
      this.screenConten.car_stop_admission5 = resp.data
      this.screenConten.car_stop_admission6 = resp.data
      //无车时
      this.screenConten.car_no_admission1 = resp.data
      this.screenConten.car_no_admission2 = resp.data
      this.screenConten.car_no_admission3 = resp.data
      this.screenConten.car_no_admission4 = resp.data
      this.screenConten.car_no_admission5 = resp.data
      this.screenConten.car_no_admission6 = resp.data
    })
    postNonMonthlyOut({}).then(resp => {
      this.screenConten.car_stop_appearance1 = resp.data
      this.screenConten.car_stop_appearance2 = resp.data
      this.screenConten.car_stop_appearance3 = resp.data
      this.screenConten.car_stop_appearance4 = resp.data
      this.screenConten.car_stop_appearance5 = resp.data
      this.screenConten.car_stop_appearance6 = resp.data
      //无车时
      this.screenConten.car_no_appearance1 = resp.data
      this.screenConten.car_no_appearance2 = resp.data
      this.screenConten.car_no_appearance3 = resp.data
      this.screenConten.car_no_appearance4 = resp.data
      this.screenConten.car_no_appearance5 = resp.data
      this.screenConten.car_no_appearance6 = resp.data
    })
    console.log(this.screenConten, 'this.screenContenthis.screenConten ')
  },
  mounted () {

  },
  methods: {
    //子组件像父组件传值
    isExit () {
      this.$emit('isShowCardFunc1', this.isShowCard2)
    },
    selectFacus () {

    },
    handleChange (val) {
      console.log(val)
    },
    hanPoid_DoorType (id) {
      console.log(id, 'hanPoid_DoorTypeididididid')
      this.formLabelAlign.car_yellow = id
    },
    addSetting () {
      this.formLabelAlign.car_rent_admission = this.car_rent_admission1.join(',')
      this.formLabelAlign.car_stop_admission = this.car_stop_admission1.join(',')
      this.formLabelAlign.car_no_admission = this.car_no_admission1.join(',')
      this.formLabelAlign.car_rent_appearance = this.car_rent_appearance1.join(',')
      this.formLabelAlign.car_stop_appearance = this.car_stop_appearance1.join(',')
      this.formLabelAlign.car_no_appearance = this.car_no_appearance1.join(',')
      this.formLabelAlign.car_price = Number(this.formLabelAlign.car_price)
      this.formLabelAlign.car_price_time = Number(this.formLabelAlign.car_price_time)
      this.formLabelAlign.car_rent_day = Number(this.formLabelAlign.car_rent_day)
      this.formLabelAlign.car_rent_price = Number(this.formLabelAlign.car_rent_price)
      this.formLabelAlign.max_price = Number(this.formLabelAlign.max_price)
      this.formLabelAlign.end_time = Number(this.formLabelAlign.end_time)
      this.formLabelAlign.time = Number(this.formLabelAlign.time)
      this.formLabelAlign.time_out = Number(this.formLabelAlign.time_out)
      this.formLabelAlign.car_time = Number(this.formLabelAlign.car_time)
      this.formLabelAlign.parkid = this.parkid
      console.log(this.formLabelAlign, 'formLabelAlignformLabelAlignformLabelAlign')
      postSettingadd(this.formLabelAlign).then(resp => {
        // console.log(resp, 'postSettingadd')
        Message(resp.data)

        if (resp.data === '参数添加成功') {
          this.disableShow = true
        }
        localStorage.setItem('setParamState', 1)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
//卡片的样式
/deep/.createJobDialog .el-dialog .el-dialog--center {
  background-color: #f44 !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  min-height: 775px;
  position: relative;
  width: 100%;
  box-shadow: none;
  border: none;
  /deep/.el-card__header {
    border: none;
    border-bottom: none;
    padding: 20px !important;
    .el-table--striped .el-table__body tr.el-table__row--striped td {
      background-color: #eff2f5 !important;
    }
    .el-table thead {
      color: #909399 !important;
    }
    .el-table td {
      padding: 15px 0 !important;
      z-index: 222;
    }
    .el-table th {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
    /deep/.el-table .cell {
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      white-space: nowrap;
      cursor: default;
      width: 400px;
      height: 30px !important;
      line-height: 30px;
      font-size: 14px;
      padding: 0 0 0 65px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      span {
        width: 100%;
        p {
          text-overflow: ellipsis !important;
          overflow: hidden !important;
          white-space: nowrap;
        }
      }
      .el-button--mini {
        width: 52px;
        height: 30px;
        background: rgba(37, 186, 217, 1);
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        border: none;
        padding: 0px;
        line-height: 30px;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .el-btn2 {
        background-color: #bfbfbf;
      }
    }
  }
}
//表格行样式
.tableRowStyle {
  color: #f00 !important;
  background: #f00 !important;
}

/deep/ .el-dialog {
  background-color: #fff;
  margin-top: 0% !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  min-width: 380px;
  border-radius: 5px;
  .el-dialog__wrapper {
    overflow: auto;
  }
  .el-dialog__header {
    padding: 12px 0 10px 16px;
    text-align: left;
    border-bottom: 1px solid #eff2f5;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .el-dialog__title {
      text-align: left;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    button {
      position: absolute;
      top: 14px;
    }
  }
  /deep/.el-dialog__body {
    overflow: hidden;
    padding: 20px 50px 6px 48px !important;
    .form-item {
      height: 60px;
      .zhiwei {
        margin-bottom: 0px;
        .el-form-item__label {
          display: inline-block;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          padding: 0 !important;
          white-space: nowrap;
          color: rgba(102, 102, 102, 1);
          text-align: right !important;
        }
        .el-form-item__content {
          input {
            width: 87% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
      }
      .el-form-item {
        margin-bottom: 0px;
        margin-top: 1px;
        text-align: center;
        &__label {
          height: 30px;
          display: inline-block;
          font-size: 14px;
          padding: 0 !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        &__content {
          input {
            position: relative;
            height: 30px;
            width: 87% !important;
            border: 1px solid rgba(210, 210, 210, 1);
            border-radius: 3px;
            outline: none;
            color: #333333;
            padding-left: 8px;
          }
        }
      }

      .mistack-message {
        position: relative;
        top: -13px;
        text-align: left;
        margin-left: 5px;
        box-sizing: border-box;
        font-size: 14px;
        transform: scale(0.9);
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 0, 0, 1);
      }
    }
  }
  .el-dialog__footer {
    padding-top: 0px;
    button {
      width: 62px;
      height: 30px;
      line-height: 0;
      outline: none;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      background: rgba(248, 172, 89, 1);
      border-radius: 3px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 254, 254, 1);
      margin-bottom: 4px;
    }
  }
}

.chen {
  /deep/.el-dialog {
    background-color: #fff !important;
    width: 18.23%;
    height: 210px;
    /deep/.el-dialog__header {
      button {
        z-index: 19999;
      }
    }
    .el-dialog--center {
      text-align: left;
    }
    .el-dialog__body {
      background-color: #fff;
      height: 110px !important;
      position: relative;
      div {
        width: 100%;
        height: 110px;
        line-height: 78px;
        font-size: 16px;
        text-align: center;
      }
    }
    .el-dialog__footer {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      span {
        width: 100%;
        display: flex;
        justify-content: space-around;
        button {
          width: 72px;
          height: 30px;
          font-size: 14px;
          border-radius: 3px !important;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 254, 254, 1);
        }
      }
      .quxiao1 {
        color: rgba(153, 153, 153, 1);
        background-color: #fff;
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 3px;
      }
    }
    .el button {
      color: #999999 !important;
    }
    .el-button--primary {
      color: #ffffff;
      background-color: #25bad9;
    }
  }
}
/deep/.el-tree-node {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(108, 108, 108, 1);
  .el-tree-node__label {
    font-size: 14px !important;
  }
  .el-tree-node__content {
    height: 30px !important;
  }
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
    color: #fff !important;
    cursor: default !important;
    &::after {
      color: #fff !important;
      cursor: default !important;
    }
  }
}
/deep/.el-checkbox__inner::after {
  height: 10px;
  left: 6px;
  top: 2px;
  width: 4px;
}
/deep/.el-pagination.is-background .btn-next:disabled {
  cursor: default;
}
/deep/.el-pagination.is-background .btn-prev:disabled {
  cursor: default;
}

.total-class {
  position: relative;

  .div-class {
    width: 100px;
    height: 100px;
    position: absolute;
    background: green !important;
    top: -10px;
    z-index: 25633333334444444444655555555555555555555566666666666612789;
  }
}
/deep/.el-popover {
  top: 0px !important;
  left: 10px !important;
  z-index: 56789356345554555;
}

#newadd {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 72px;
  height: 30px;
  line-height: 30px;
  background: rgba(37, 186, 217, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
/deep/.el-pagination__editor {
  background-color: #5fafe4 !important;
  height: 20px;
  width: 30px;
  color: white;
  cursor: pointer;
}
.hard-setparamClass {
  height: 100%;
  overflow: auto;
}
.setparam-container {
  // height: 2000px;
  // background-color: green;
  position: relative;
  width: 100%;
  .card-main {
    //   background-color: #f00;
    margin: 20px;
  }
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
    cursor: pointer;
    color: rgba(255, 254, 254, 1);
  }
}
/deep/.el-table .cell {
  height: 30px !important;
}
</style>

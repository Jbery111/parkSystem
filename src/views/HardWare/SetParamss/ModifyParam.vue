<template>
  <div>
    <div class="modify-all">
      <span class="modify-all_span" @click="modifyAllHandler">
        <i class="el-icon-edit"></i>修改全部
      </span>
    </div>
    <div class="hard-setparamClass">
      <div class="setparam-container">
        <el-collapse v-model="activeNames" @change="handleChange" :disabled="true">
          <!-- 基础设置 -->
          <el-collapse-item title="基础设置" name="1">
            <!-- 总 -->
            <div class="sum-class">
              <!-- 左部分 -->
              <div class="sumbox left-class">
                <el-form :label-position="labelPosition" label-width="80px">
                  <el-form-item label="负责人:">
                    <el-input
                      v-model="formLabelAlign.basisinfo.basis_name"
                      :disabled="basisDisable"
                      placeholder="请输入停车场负责人"
                    />
                  </el-form-item>
                  <el-form-item label="联系电话:">
                    <el-input
                      v-model="formLabelAlign.basisinfo.basis_phone"
                      :disabled="basisDisable"
                      placeholder="请输入停车场负责人联系电话"
                    />
                  </el-form-item>
                </el-form>
              </div>
              <!-- 右部分 -->
              <div class="sumbox right-class">
                <el-form :label-position="labelPosition" label-width="80px">
                  <el-form-item label="详细地址:">
                    <el-input
                      v-model="formLabelAlign.basisinfo.basis_address"
                      :disabled="basisDisable"
                      placeholder="请输入停车场详细地址"
                    />
                  </el-form-item>
                  <el-form-item label="车位总数:">
                    <el-input
                      v-model="formLabelAlign.basisinfo.basis_number"
                      :disabled="basisDisable"
                      placeholder="请输入停车位数量"
                    />
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 修改 -->
            <div class="modify-some">
              <span class="modify-some_span" @click="modifybasis">
                <i class="el-icon-edit"></i>修改
              </span>
            </div>
          </el-collapse-item>
          <!-- 开闸管理 -->
          <el-collapse-item title="开闸管理" name="2">
            <!-- 总 -->
            <div class="sum-class">
              <!-- 左部分 -->
              <div class="sumbox left-class">
                <el-form
                  :label-position="labelPosition"
                  label-width="80px"
                  :disabled="brakeDisable"
                >
                  <el-form-item label="是否匹配车牌地域名称（例：京、川）:">
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_number">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="长租车辆是否自动抬杆:">
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_rent">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出口是否无条件开闸:">
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_export">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="同一道口，重复识别车牌间隔时间（秒）:">
                    <el-input v-model="formLabelAlign.brakeinfo.car_endtime" />
                  </el-form-item>
                  <!-- TODOS: -->
                  <el-form-item label="支付后多少分钟内需要离场（分钟）:">
                    <el-input v-model="formLabelAlign.brakeinfo.end_time" />
                  </el-form-item>
                  <el-form-item label="一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否允许抬杆放行:">
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_double">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
              <!-- 右部分 -->
              <div class="sumbox left-class">
                <el-form
                  :label-position="labelPosition"
                  label-width="80px"
                  :disabled="brakeDisable"
                >
                  <el-form-item label="黄牌车指定通道:">
                    <el-radio-group v-model="car_yellow1">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- //请选择门岗 -->
                  <el-select v-model="ChoiceDoor_value" v-if="car_yellow1 === 1">
                    <!--  v-model="value"中'value"的值为el-option的value属性值 -->
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
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_police">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否检测有无物业欠费情况:">
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_wuye">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    label="物业费欠费时是否不放行:"
                    v-if="formLabelAlign.brakeinfo.car_wuye === 1 ? true : false"
                  >
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_wuye_release">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                    <el-input
                      v-model="formContent.myself_msg"
                      placeholder="请自定义提示语"
                      v-if="formLabelAlign.brakeinfo.car_wuye_release === 1 ? true : false"
                    />
                  </el-form-item>
                  <el-form-item label="使用APP或公众号申请绑定车辆时，是否需要后台操作人员审核:">
                    <el-radio-group v-model="formLabelAlign.brakeinfo.car_app">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 修改 -->
            <div class="modify-some">
              <span class="modify-some_span" @click="modifybrake">
                <i class="el-icon-edit"></i>修改
              </span>
            </div>
          </el-collapse-item>
          <!-- 收费设置 -->
          <el-collapse-item title="收费设置" name="3">
            <!-- 总 -->
            <div class="sum-class">
              <!-- 左部分 -->
              <div class="sumbox left-class">
                <el-form
                  :label-position="labelPosition"
                  label-width="80px"
                  :disabled="priceDisable"
                >
                  <el-form-item label="免费停车时间（分钟）:">
                    <el-input v-model="formLabelAlign.priceinfo.car_time" />
                  </el-form-item>
                  <el-form-item label="基本收费时长（小时）:">
                    <el-input v-model="formLabelAlign.priceinfo.car_price_time" />
                  </el-form-item>
                  <el-form-item label="基本收费费用（元）:">
                    <el-input v-model="formLabelAlign.priceinfo.car_price	" />
                  </el-form-item>
                  <el-form-item label="超时后收费计时单位（小时）:">
                    <el-input v-model="formLabelAlign.priceinfo.time_out" />
                  </el-form-item>
                  <el-form-item label="超时后收费单价（元）:">
                    <el-input v-model="formLabelAlign.priceinfo.time_out_price" />
                  </el-form-item>
                  <p>若上方四个值分别为:2，3，2，3，则超过免费时长后2小时内收费3元,超过2个小时,每2个小时收费3元</p>
                  <el-form-item label="单日收费最高限制（元）:">
                    <el-input v-model="formLabelAlign.priceinfo.max_price" />
                  </el-form-item>
                </el-form>
              </div>
              <!-- 右部分 -->
              <div class="sumbox right-class">
                <el-form
                  :label-position="labelPosition"
                  label-width="80px"
                  :disabled="priceDisable"
                >
                  <el-form-item label="单日结算周期:">
                    <el-select v-model="formLabelAlign.priceinfo.cycle">
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
                    <el-radio-group v-model="formLabelAlign.priceinfo.single_max">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                    <el-input
                      v-model="formLabelAlign.priceinfo.single_max_price"
                      placeholder="请输入最高收费金额"
                      v-if="formLabelAlign.priceinfo.single_max === 1"
                    />
                  </el-form-item>
                  <el-form-item label="一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否持续计费:">
                    <el-radio-group v-model="formLabelAlign.priceinfo.car_double_price">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="一位多车情况下，当车位所剩车辆和车位数量相符时是否停止收费:">
                    <el-radio-group v-model="formLabelAlign.priceinfo.car_double_price_2">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="长租车欠费缓冲时长（天）:">
                    <el-input
                      v-model="formLabelAlign.priceinfo.car_rent_price"
                      placeholder="请输入停车场负责人"
                    />
                  </el-form-item>
                  <el-form-item label="长租车出场时若租期已满，是否从过期时间计算费用:">
                    <el-radio-group v-model="formLabelAlign.priceinfo.car_rent_price_2">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 修改 -->
            <div class="modify-some">
              <span class="modify-some_span" @click="modifyprice">
                <i class="el-icon-edit"></i>修改
              </span>
            </div>
          </el-collapse-item>
          <!-- 显示屏设置 -->
          <el-collapse-item title="显示屏设置" name="4">
            <!-- 总 -->
            <div class="sum-class">
              <!-- 左部分 -->
              <div class="sumbox left-class">
                <el-form :label-position="labelPosition" label-width="80px" :disabled="ledDisable">
                  <el-form-item label="显示屏显示行数:">
                    <!-- //下拉框 -->
                    <el-select v-model="formLabelAlign.ledinfo.led_number" placeholder="请选择显示屏显示行数">
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
                    v-if="formLabelAlign.ledinfo.led_number === 2 || formLabelAlign.ledinfo.led_number === 4 || formLabelAlign.ledinfo.led_number === 6"
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
                    v-if="formLabelAlign.ledinfo.led_number === 6 || formLabelAlign.ledinfo.led_number === 4 "
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
                  <el-form-item v-if="formLabelAlign.ledinfo.led_number === 6">
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
                    v-if="formLabelAlign.ledinfo.led_number === 2 || formLabelAlign.ledinfo.led_number === 4 || formLabelAlign.ledinfo.led_number === 6"
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
                    v-if="formLabelAlign.ledinfo.led_number === 6 || formLabelAlign.ledinfo.led_number === 4 "
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
                  <el-form-item v-if="formLabelAlign.ledinfo.led_number === 6">
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
                    v-if="formLabelAlign.ledinfo.led_number === 2 || formLabelAlign.ledinfo.led_number === 4 || formLabelAlign.ledinfo.led_number === 6"
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
                    v-if="formLabelAlign.ledinfo.led_number === 6 || formLabelAlign.ledinfo.led_number === 4 "
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
                  <el-form-item v-if="formLabelAlign.ledinfo.led_number === 6">
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
                    <el-input v-model="formLabelAlign.ledinfo.car_rent_day" />
                  </el-form-item>
                  <el-form-item label="扬声器声音大小(0-10):">
                    <!-- <span>扬声器{{formLabelAlign.ledinfo.sound}}</span> -->
                    <div class="block">
                      <el-slider
                        max="10"
                        v-model="formLabelAlign.ledinfo.sound"
                        step="1"
                        show-stops
                      ></el-slider>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <!-- 右部分 -->
              <div class="sumbox right-class">
                <el-form :label-position="labelPosition" label-width="80px" :disabled="ledDisable">
                  <!-- 长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息:长租车,入场时显示屏显示的信息: -->
                  <el-form-item
                    label="长租车,出场时显示屏显示的信息:"
                    v-if="formLabelAlign.ledinfo.led_number === 2 || formLabelAlign.ledinfo.led_number === 4 || formLabelAlign.ledinfo.led_number === 6"
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
                    v-if="formLabelAlign.ledinfo.led_number === 6 || formLabelAlign.ledinfo.led_number === 4 "
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
                  <el-form-item v-if="formLabelAlign.ledinfo.led_number === 6">
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
                    v-if="formLabelAlign.ledinfo.led_number === 2 || formLabelAlign.ledinfo.led_number === 4 || formLabelAlign.ledinfo.led_number === 6"
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
                    v-if="formLabelAlign.ledinfo.led_number === 6 || formLabelAlign.ledinfo.led_number === 4 "
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
                  <el-form-item v-if="formLabelAlign.ledinfo.led_number === 6">
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
                    v-if="formLabelAlign.ledinfo.led_number === 2 || formLabelAlign.ledinfo.led_number === 4 || formLabelAlign.ledinfo.led_number === 6"
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
                    v-if="formLabelAlign.ledinfo.led_number === 6 || formLabelAlign.ledinfo.led_number === 4 "
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
                  <el-form-item v-if="formLabelAlign.ledinfo.led_number === 6">
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
                    <el-input v-model="formLabelAlign.ledinfo.time" />
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <!-- 修改 -->
            <div class="modify-some">
              <span class="modify-some_span" @click="modifyLed">
                <i class="el-icon-edit"></i>修改
              </span>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="button-class" v-if="querenVisible">
          <span class="button" @click="addSetting">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postDoorListId, postSettingadd, postSetInfo, postSetupdateAll, postSetupdateBasis, postSetupdateBrake, postSetupdatePrice, postMonthly, postMonthlyOut, postNonMonthly, postNonMonthlyOut, postSetupdateLed } from '@/api/hardware'
import { Message } from 'element-ui'
import ModifyParam from './ModifyParam.vue'
export default {
  components: {
    ModifyParam
  },
  // data数据
  data () {
    return {
      querenVisible: false,//确认按钮是否显示
      selectShow: true,//当显示屏的下拉框变成输入框时对应的下拉框是否消失
      activeNames: [], // 展开列
      labelPosition: 'top',
      radio: 3, // 开闸管理
      formLabelAlign: {
        basisinfo: {
          basis_name: '',//负责人
          basis_phone: '',//联系电话
          basis_address: '',//详细地址
          basis_number: '',//车位总数
        },
        // 开闸管理
        brakeinfo: {
          car_number: 2,//是否匹配车牌地域名称（例：京、川）:
          car_rent: 1,//长租车辆是否自动抬杆:
          car_export: 2,//出口是否无条件开闸:
          car_endtime: 60,//同一道口，重复识别车牌间隔时间（秒）:
          car_double: 2,//一位多车情况下，当车位已有停放车辆时，所属车位下其他车辆入场是否允许抬杆放行
          car_yellow: 0,//黄牌车指定通道
          car_police: 1,//军警车是否自动开闸
          car_wuye: 2,//是否检测有无物业欠费情况
          car_wuye_release: 2,//物业费欠费时是否不放行
          car_app: 1,//使用APP或公众号申请绑定车辆时，是否需要后台操作人员审核
          end_time: null,//支付后多少分钟内需要离场（分钟）
        },
        //收费设置
        priceinfo: {
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
          car_rent_price: null,//长租车欠费缓冲时长（天）
          car_rent_price_2: 2,//长租车出场时若租期已满，是否从过期时间计算费用
        },
        //显示屏
        ledinfo: {
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
        },
        state: 1,
        pid: 0,
        parkid: null,
      },
      modifyNum: 0,//判断为修改全部还是修改其他单独四项,0代表修改全部,1(修改基础设置),2(开闸管理),3(收费设置),4(led)
      //控制四个个模块disabled
      basisDisable: true,
      brakeDisable: true,
      ledDisable: true,
      priceDisable: true,
      car_yellow1: 0,//黄牌车指定通道
      formContent: {
        myself_msg: '',//自定义提示语
      },
      options_ChoiceDoor: [],//门岗类型
      ChoiceDoor_value: '',//选择门岗的值//TODOS是否填在formLabelAlign.ledinfo
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
      outId: null,//最外层Id
      inID: null,//内层ID
      //修改全部时需要的参数
      // priceQuery: {},
      // ledQuery: {},
      // brakeQuery: {},
      // basisQuery: {}


    }
  },
  computed: {},
  watch: {
  },
  created () {
    console.log(this.screenConten.car_rent_admission, 'screenConten.car_rent_admission')
    this.parkid = JSON.parse(localStorage.getItem('items')).id
    this.setInfoHandler()
    //显示屏下拉提示语
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
  },
  mounted () {

  },
  methods: {
    //参数数据回显
    setInfoHandler () {
      postSetInfo({ parkid: this.parkid, type: 1 }).then(resp => {
        console.log(resp, '参数数据回显')
        this.outId = resp.data.id
        this.formLabelAlign.basisinfo = resp.data.basisinfo,
          this.formLabelAlign.brakeinfo = resp.data.brakeinfo,
          this.formLabelAlign.ledinfo = resp.data.ledinfo,
          this.formLabelAlign.priceinfo = resp.data.priceinfo,
          // console.log(this.formLabelAlign, 'this.formLabelAlign')
          // this.formLabelAlign
          this.car_rent_admission1 = resp.data.ledinfo.car_rent_admission
        this.car_stop_admission1 = resp.data.ledinfo.car_stop_admission
        this.car_no_admission1 = resp.data.ledinfo.car_no_admission
        this.car_rent_appearance1 = resp.data.ledinfo.car_rent_appearance
        this.car_stop_appearance1 = resp.data.ledinfo.car_stop_appearance
        this.car_no_appearance1 = resp.data.ledinfo.car_no_appearance
      })
    },
    selectFacus () {

      console.log(this.screenConten.car_rent_admission1, '121212')
    },
    handleChange (val) {
      console.log(val)
    },
    hanPoid_DoorType (id) {
      console.log(id, 'hanPoid_DoorTypeididididid')
      this.formLabelAlign.car_yellow = id
    },

    //修改全部
    modifyAllHandler () {
      // alert('修改全部')
      //折叠栏全部展开
      this.activeNames = ['1', '2', '3', '4']
      //四项全部可编辑
      this.basisDisable = false
      this.brakeDisable = false
      this.ledDisable = false
      this.priceDisable = false
      //确认按钮出现
      this.querenVisible = true
      this.modifyNum = 0
    },
    //修改基础设置
    modifybasis () {
      //折叠栏全部展开
      this.activeNames = ['1']
      //基础设置可编辑
      this.basisDisable = false
      //确认按钮出现
      this.querenVisible = true
      this.modifyNum = 1
    },
    //修改开闸管理
    modifybrake () {
      //折叠栏全部展开
      this.activeNames = ['2']
      //开闸管理可编辑
      this.brakeDisable = false
      //确认按钮出现
      this.querenVisible = true
      this.modifyNum = 2
    },
    //修改收费设置
    modifyprice () {
      //折叠栏全部展开
      this.activeNames = ['3']
      //收费设置可编辑
      this.priceDisable = false
      //确认按钮出现
      this.querenVisible = true
      this.modifyNum = 3
    },
    //修改LED
    modifyLed () {
      //折叠栏全部展开
      this.activeNames = ['4']
      //LED可编辑
      this.ledDisable = false
      //确认按钮出现
      this.querenVisible = true
      this.modifyNum = 4
    },
    // 点击确认
    addSetting () {
      if (this.modifyNum === 1) {
        // alert(this.modifyNum)
        var basisQuery = {}
        basisQuery.basis_name = this.formLabelAlign.basisinfo.basis_name
        basisQuery.basis_phone = this.formLabelAlign.basisinfo.basis_phone
        basisQuery.basis_address = this.formLabelAlign.basisinfo.basis_address
        basisQuery.basis_number = this.formLabelAlign.basisinfo.basis_number
        basisQuery.id = this.outId
        basisQuery.parkid = this.parkid
        // basisQuery.basis_name = this.formLabelAlign.basisinfo.basis_name
        // console.log(basisQuery, '1428')
        this.basisQuery = basisQuery
        postSetupdateBasis(basisQuery).then(resp => {
          console.log(resp, 'resp')
          if (resp.data = '修改成功') {
            Message(resp.data)
            this.setInfoHandler()
          }
        })
      } else if (this.modifyNum === 2) {
        // console.log(this.formLabelAlign, '222222222222222222222222222222')
        var brakeQuery = {}
        brakeQuery.car_app = this.formLabelAlign.brakeinfo.car_app
        brakeQuery.end_time = this.formLabelAlign.brakeinfo.end_time
        brakeQuery.id = this.formLabelAlign.brakeinfo.id
        brakeQuery.car_number = this.formLabelAlign.brakeinfo.car_number
        brakeQuery.car_rent = this.formLabelAlign.brakeinfo.car_rent
        brakeQuery.car_export = this.formLabelAlign.brakeinfo.car_export
        brakeQuery.car_endtime = this.formLabelAlign.brakeinfo.car_endtime
        brakeQuery.car_double = this.formLabelAlign.brakeinfo.car_double
        brakeQuery.car_yellow = this.formLabelAlign.brakeinfo.car_yellow
        brakeQuery.car_police = this.formLabelAlign.brakeinfo.car_police
        brakeQuery.car_wuye = this.formLabelAlign.brakeinfo.car_wuye
        brakeQuery.car_wuye_release = this.formLabelAlign.brakeinfo.car_wuye_release
        brakeQuery.parkid = this.parkid
        console.log(brakeQuery, 'brakeQuery')
        this.brakeQuery = brakeQuery
        postSetupdateBrake(brakeQuery).then(resp => {
          console.log(resp, 'resp1455')
          if (resp.data = '修改成功') {
            Message(resp.data)
            this.setInfoHandler()
          }
        })

      } else if (this.modifyNum === 3) {
        // console.log(this.formLabelAlign, '222222222收费设置222222222222222222222')
        var priceQuery = {}

        priceQuery.car_time = this.formLabelAlign.priceinfo.car_time
        priceQuery.car_price_time = this.formLabelAlign.priceinfo.car_price_time
        priceQuery.car_price = this.formLabelAlign.priceinfo.car_price
        priceQuery.time_out = this.formLabelAlign.priceinfo.time_out
        priceQuery.time_out_price = this.formLabelAlign.priceinfo.time_out_price
        priceQuery.max_price = this.formLabelAlign.priceinfo.max_price
        priceQuery.cycle = this.formLabelAlign.priceinfo.cycle
        priceQuery.single_max = this.formLabelAlign.priceinfo.single_max
        priceQuery.single_max_price = this.formLabelAlign.priceinfo.single_max_price
        priceQuery.car_double_price = this.formLabelAlign.priceinfo.car_double_price
        priceQuery.car_double_price_2 = this.formLabelAlign.priceinfo.car_double_price_2
        priceQuery.car_rent_price = this.formLabelAlign.priceinfo.car_rent_price
        priceQuery.car_rent_price_2 = this.formLabelAlign.priceinfo.car_rent_price_2
        priceQuery.id = this.formLabelAlign.priceinfo.id
        priceQuery.parkid = this.parkid
        console.log(priceQuery, 'priceQuery2222222')
        this.priceQuery = priceQuery
        postSetupdatePrice(priceQuery).then(resp => {
          console.log(resp, 'respprice')
          if (resp.data = '修改成功') {
            Message(resp.data)
            this.setInfoHandler()
          }
        })
      } else if (this.modifyNum === 4) {
        //显示屏修改
        console.log(this.formLabelAlign, '222222222收费设置222222222222222222222')
        var ledQuery = {}
        ledQuery.car_rent_admission = this.car_rent_admission1.join(',')
        ledQuery.car_rent_appearance = this.car_rent_appearance1.join(',')
        ledQuery.car_stop_admission = this.car_stop_admission1.join(',')
        ledQuery.car_stop_appearance = this.car_stop_appearance1.join(',')
        ledQuery.car_no_admission = this.car_no_admission1.join(',')
        ledQuery.car_no_appearance = this.car_no_appearance1.join(',')
        ledQuery.led_number = this.formLabelAlign.ledinfo.led_number
        ledQuery.car_rent_day = this.formLabelAlign.ledinfo.car_rent_day
        ledQuery.sound = this.formLabelAlign.ledinfo.sound
        ledQuery.time = this.formLabelAlign.ledinfo.time
        ledQuery.id = this.formLabelAlign.ledinfo.id
        ledQuery.parkid = this.parkid
        console.log(ledQuery, 'ledQuery2222222')
        this.ledQuery = ledQuery
        postSetupdateLed(ledQuery).then(resp => {
          console.log(resp, 'ledresp')
          if (resp.data = '修改成功') {
            Message(resp.data)
            this.setInfoHandler()
          }
        })
      } else if (this.modifyNum === 0) {
        // console.log(this.ledQuery
        var modifyAllQuery = {}
        modifyAllQuery.basis_name = this.formLabelAlign.basisinfo.basis_name
        modifyAllQuery.basis_address = this.formLabelAlign.basisinfo.basis_address
        modifyAllQuery.basis_phone = this.formLabelAlign.basisinfo.basis_phone
        modifyAllQuery.basis_number = this.formLabelAlign.basisinfo.basis_number
        modifyAllQuery.car_number = this.formLabelAlign.brakeinfo.car_number
        modifyAllQuery.car_rent = this.formLabelAlign.brakeinfo.car_rent
        modifyAllQuery.car_export = this.formLabelAlign.brakeinfo.car_export
        modifyAllQuery.car_endtime = this.formLabelAlign.brakeinfo.car_endtime
        modifyAllQuery.car_double = this.formLabelAlign.brakeinfo.car_double
        modifyAllQuery.car_yellow = this.formLabelAlign.brakeinfo.car_yellow
        modifyAllQuery.car_police = this.formLabelAlign.brakeinfo.car_police
        modifyAllQuery.car_wuye = this.formLabelAlign.brakeinfo.car_wuye
        modifyAllQuery.car_wuye_release = this.formLabelAlign.brakeinfo.car_wuye_release
        modifyAllQuery.car_app = this.formLabelAlign.brakeinfo.car_app
        modifyAllQuery.led_number = this.formLabelAlign.ledinfo.led_number
        modifyAllQuery.car_rent_admission = this.car_rent_admission1.join(',')
        modifyAllQuery.car_rent_appearance = this.car_rent_appearance1.join(',')
        modifyAllQuery.car_stop_admission = this.car_stop_admission1.join(',')
        modifyAllQuery.car_stop_appearance = this.car_stop_appearance1.join(',')
        modifyAllQuery.car_no_admission = this.car_no_admission1.join(',')
        modifyAllQuery.car_no_appearance = this.car_no_appearance1.join(',')
        modifyAllQuery.car_rent_day = this.formLabelAlign.ledinfo.car_rent_day
        modifyAllQuery.sound = this.formLabelAlign.ledinfo.sound
        modifyAllQuery.car_time = this.formLabelAlign.priceinfo.car_time
        modifyAllQuery.car_price_time = this.formLabelAlign.priceinfo.car_price_time
        modifyAllQuery.car_price = this.formLabelAlign.priceinfo.car_price
        modifyAllQuery.time_out = this.formLabelAlign.priceinfo.time_out
        modifyAllQuery.time_out_price = this.formLabelAlign.priceinfo.time_out_price
        modifyAllQuery.max_price = this.formLabelAlign.priceinfo.max_price
        modifyAllQuery.cycle = this.formLabelAlign.priceinfo.cycle
        modifyAllQuery.single_max = this.formLabelAlign.priceinfo.single_max
        modifyAllQuery.single_max_price = this.formLabelAlign.priceinfo.single_max_price
        modifyAllQuery.car_double_price = this.formLabelAlign.priceinfo.car_double_price
        modifyAllQuery.car_double_price_2 = this.formLabelAlign.priceinfo.car_double_price_2
        modifyAllQuery.car_rent_price = this.formLabelAlign.priceinfo.car_rent_price
        modifyAllQuery.car_rent_price_2 = this.formLabelAlign.priceinfo.car_rent_price_2
        modifyAllQuery.pid = 0
        modifyAllQuery.time = this.formLabelAlign.ledinfo.time
        modifyAllQuery.id = this.outId
        modifyAllQuery.state = 1
        modifyAllQuery.id = this.outId
        modifyAllQuery.parkid = this.parkid
        modifyAllQuery.end_time = this.formLabelAlign.brakeinfo.end_time
        console.log(modifyAllQuery, 'modifyAllQuerymodifyAllQuerymodifyAllQuerymodifyAllQuery')
        postSetupdateAll(modifyAllQuery).then(resp => {
          console.log(resp, '修改全部的response')
          Message(resp.data)
          this.setInfoHandler()
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.hard-setparamClass {
  height: 100%;
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
  cursor: pointer;
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
.selectClass {
  display: none !important;
  .select-dropdown__empty {
    display: none;
  }
}
.modify-all {
  height: 42px;
  width: 100%;
  position: relative;
  &_span {
    cursor: pointer;
    position: absolute;
    right: 20px;
    bottom: 10px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
/deep/.el-collapse-item {
  // background: #f00 !important;
  color: red !important;
}
.modify-some {
  width: 100%;
  height: 32px;
  position: relative;
  &_span {
    cursor: pointer;
    position: absolute;
    right: 20px;
  }
}
</style>

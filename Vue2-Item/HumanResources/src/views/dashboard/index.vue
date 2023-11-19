<template>
  <div class="dashboard">
    <div class="container">
      <!-- 左侧内容 -->
      <div class="left">
        <div class="panel">
          <div class="user-info">
            <img v-if="avatar" class="avatar" :src="avatar" alt="">
            <span v-else class="avatar">{{ name?.charAt(0) }}</span>
            <div class="company-info">
              <div class="title">
                {{ company }}
                <span>体验版</span>
              </div>
              <div class="depart">{{ name }} ｜ {{ company }}-{{ departmentName }}</div>
            </div>
          </div>
          <!-- 代办 -->
          <div class="todo-list">
            <div class="todo-item">
              <span>组织总人数</span>
              <count-to :start-val="0" :end-val="homeData.employeeTotal" :duration="500" />
            </div>
            <div class="todo-item">
              <span>正式员工</span>
              <count-to :start-val="0" :end-val="homeData.regularEmployeeTotal" :duration="500" />
            </div>
            <div class="todo-item">
              <span>合同待签署</span>
              <count-to :start-val="0" :end-val="homeData.contractSignTotal" :duration="500" />
            </div>
            <div class="todo-item">
              <span>待入职</span>
              <count-to :start-val="0" :end-val="homeData.toBeEmployed" :duration="500" />
            </div>
            <div class="todo-item">
              <span>本月待转正</span>
              <count-to :start-val="0" :end-val="homeData.toBeConfirmed" :duration="500" />
            </div>
            <div class="todo-item">
              <span>本月待离职</span>
              <count-to :start-val="0" :end-val="homeData.toBeDismissed" :duration="500" />
            </div>
            <div class="todo-item">
              <span>接口总访问</span>
              <count-to :start-val="0" :end-val="homeData.interfaceAccessTotal" :duration="500" />
            </div>
          </div>
        </div>
        <!-- 快捷入口 -->
        <div class="panel">
          <div class="panel-title">快捷入口</div>
          <div class="quick-entry">
            <div class="entry-item" @click="$router.push('/approval')">
              <div class="entry-icon approval" />
              <span>假期审批</span>
            </div>
            <div class="entry-item" @click="$router.push('/social')">
              <div class="entry-icon social" />
              <span>社保管理</span>
            </div>
            <div class="entry-item" @click="$router.push('/role')">
              <div class="entry-icon role" />
              <span>角色管理</span>
            </div>
            <div class="entry-item" v-permission="'add-employee'" @click="$router.push('/employee/detail')">
              <div class="entry-icon salary" />
              <span>添加员工</span>
            </div>
            <div class="entry-item" v-permission="'add-employee'" @click="$router.push('/permission')">
              <div class="entry-icon bpm" />
              <span>添加权限</span>
            </div>
          </div>
        </div>
        <!-- 图表数据 -->
        <div class="panel">
          <div class="panel-title">社保申报数据</div>
          <div class="chart-container">
            <div class="chart-info">
              <div class="info-main">
                <span>申报人数</span>
                <count-to :start-val="0" :end-val="homeData.socialInsurance?.declarationTotal" :duration="500" />
              </div>
              <div class="info-list">
                <div class="info-list-item">
                  <span>待申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.socialInsurance?.toDeclareTotal" :duration="500" />
                </div>
                <div class="info-list-item">
                  <span>申报中(人)</span>
                  <count-to :start-val="0" :end-val="homeData.socialInsurance?.declaringTotal" :duration="500" />
                </div>
                <div class="info-list-item">
                  <span>已申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.socialInsurance?.declaredTotal" :duration="500" />
                </div>
              </div>
            </div>
            <div class="chart">
              <!-- 图表 -->
              <div ref="social" style=" width: 100%; height:100% ;" />
            </div>
          </div>
        </div>
        <!-- 图表数据 -->
        <div class="panel">
          <div class="panel-title">公积金申报数据</div>
          <div class="chart-container">
            <div class="chart-info">
              <div class="info-main">
                <span>申报人数</span>
                <count-to :start-val="0" :end-val="homeData.providentFund?.declarationTotal" :duration="500" />
              </div>
              <div class="info-list">
                <div class="info-list-item">
                  <span>待申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.providentFund?.toDeclareTotal" :duration="500" />
                </div>
                <div class="info-list-item">
                  <span>申报中(人)</span>
                  <count-to :start-val="0" :end-val="homeData.providentFund?.declaringTotal" :duration="500" />
                </div>
                <div class="info-list-item">
                  <span>已申报(人)</span>
                  <count-to :start-val="0" :end-val="homeData.providentFund?.declaredTotal" :duration="500" />
                </div>
              </div>
            </div>
            <div class="chart">
              <!-- 图表 -->
              <div ref="provident" style=" width: 100%; height:100% ;" />
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <div class="help">
          <div class="help-left">
            <div class="panel-title">帮助链接</div>
            <div class="help-list">
              <div class="help-block">
                <i class="icon-entry" />
                入门指南
              </div>
              <div class="help-block">
                <i class="icon-help" />
                在线帮助手册
              </div>
              <div class="help-block">
                <i class="icon-support" />
                联系技术支持
              </div>
              <div class="help-block">
                <i class="icon-add" />
                添加链接
              </div>
            </div>
          </div>
          <div class="help-right">
            <div class="caledar-head">
              <span>{{ SelectedTime }}</span>
              <div>
                <i @click="$refs.Calendar.selectDate('prev-month')" class="el-icon-arrow-left"></i>
                <i @click="$refs.Calendar.selectDate('next-month')" class="el-icon-arrow-right"></i>
              </div>
            </div>
            <el-calendar ref="Calendar" v-model="calendarValue" />
          </div>
        </div>
        <!-- 通知公告 -->
        <div class="panel">
          <div class="panel-title">通知</div>
          <message-notification />
        </div>
        <div class="panel">
          <div class="panel-title">通知公告</div>
          <div class="information-list">
            <div v-for="(item, index) in list" :key="index" class="information-list-item">
              <img :src="item.icon" alt="">
              <div>
                <p>
                  <span class="col">{{ item?.notice?.split(' ')[0] }}</span>
                  <span> {{ item?.notice?.split(' ')[1] }} </span>
                  <span>{{ item?.notice?.split(' ')[2] }}</span>
                </p>
                <p>{{ item.createTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import { getHomeData, getMessageList } from '@/api/home'
import MessageNotification from '@/components/MessageNotification'

// import * as echarts from 'echarts'; // 引入所有的echarts

import * as echarts from 'echarts/core' // 引入核心包
import { LineChart } from 'echarts/charts' // 引入折线图
import { GridComponent } from 'echarts/components' // 引入组件
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([LineChart, GridComponent, CanvasRenderer]) // 注册需要使用的组件
export default {
  components: {
    CountTo, 'message-notification': MessageNotification
  },
  data() {
    return {
      list: [],
      homeData: {},
      calendarValue: new Date(),
      SelectedTime: ''
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'company', 'departmentName'])
  },
  created() {
    this.getHomeData()
    this.getMessageList()
  },
  mounted() {
    this.social = echarts.init(this.$refs.social)
    this.provident = echarts.init(this.$refs.provident)
  },
  methods: {
    async getHomeData() {
      this.homeData = await getHomeData()
    },
    async getMessageList() {
      this.list = await getMessageList()
    },
    setOption({ xAxis, yAxis }) {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: yAxis,
            type: 'line',
            areaStyle: {
              color: '#04c9be',
              opacity: 0.2

            },
            lineStyle: {
              color: '#04c9be',
              opacity: 0.2

            },
          }
        ]
      }

    },
    formatDate(DateValue) {
      let year = DateValue?.getFullYear();
      let month = ("0" + (DateValue?.getMonth() + 1)).slice(-2); // 月份是从0开始计数的，所以要加1
      let day = ("0" + DateValue?.getDate()).slice(-2);
      this.SelectedTime = `${year} 年 ${month} 月 ${day} 日`;
    }
  },

  watch: {
    homeData({ socialInsurance, providentFund }) {
      this.social.setOption(this.setOption(socialInsurance))
      this.provident.setOption(this.setOption(providentFund))
    },
    calendarValue: {
      handler: function (newValue, oldValue) {
        this.formatDate(newValue)
      },
      immediate: true, deep: true
    }
  }




}
</script>

<style scoped lang="scss">
.dashboard {
  background: #f5f6f8;
  width: 100%;
  min-height: calc(100vh - 80px);

  ::v-deep .el-calendar-day {
    height: 40px;
    line-height: 22px;
    text-align: center;
  }

  ::v-deep .el-calendar-day span {
    vertical-align: text-top;
  }

  ::v-deep .el-calendar-table__row td,
  ::v-deep .el-calendar-table tr td:first-child,
  ::v-deep .el-calendar-table__row td.prev {
    border: none;
  }

  .date-content {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }

  .date-content .rest {
    color: #fff;
    border-radius: 50%;
    background: rgb(250, 124, 77);
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
  }

  .date-content .text {
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;

  }

  // ::v-deep .el-calendar-table td.is-selected .text {
  //   background: #409eff;
  //   color: #fff;
  //   border-radius: 50%;
  // }

  ::v-deep .el-calendar-table td.is-selected {
    color: #276ffb;
    background-color: transparent;
  }

  ::v-deep .el-calendar-table td.is-selected span {
    position: relative;

  }

  ::v-deep .el-calendar-table td.is-selected span:before {
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    top: 50%;
    left: 55%;
    display: block;
    // width: 28px;
    // height: 28px;
    border: 1px solid #3370ff;
    transform: translate(-50%, -50%);
  }

  ::v-deep .el-calendar__header {
    display: none
  }

  ::v-deep .el-calendar__body {
    padding: 0
  }

  .container {
    display: flex;

    .right {
      width: 40%;

      .panel {
        margin-left: 8px;
      }

      :nth-child(1) {
        margin-top: 0;
      }
    }

    .left {
      flex: 1;

      :nth-child(1) {
        margin-top: 0;
      }
    }

    .panel {
      background-color: #fff;

      margin-top: 8px;
      padding: 20px;

      .panel-title {
        font-size: 16px;
        color: #383c4e;
        font-weight: 500;
      }

      // 用户信息样式
      .user-info {
        display: flex;

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #d9d9d9;
          line-height: 48px;
          text-align: center;
        }

        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;
          color: #fff;
          margin-right: 4px;
        }

        .company-info {
          margin-left: 10px;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .title {
            color: #383c4e;
            font-weight: 500;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;

            span {
              font-size: 12px;
              background: #f5f6f8;
              text-align: center;
              padding: 2px 8px;
              border-radius: 2px;
              color: #697086;
            }
          }

          .depart {
            font-size: 14px;
            color: #697086;
            font-weight: 400;
          }
        }
      }

      // 代办样式
      .todo-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;

        .todo-item {
          width: 18%;
          height: 90px;
          display: flex;
          flex-direction: column;
          padding: 10px;
          justify-content: space-around;

          :nth-child(1) {
            color: #697086;
            font-size: 14px;
          }

          :nth-child(2) {
            color: #383c4e;
            font-size: 30px;
            font-weight: 500;
          }
        }
      }

      // 快捷入口
      .quick-entry {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;

        .entry-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 60px;

          &:nth-child(1) {
            margin-left: 0px;
          }

          .entry-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #f5f6f8;
            background-size: cover;

            &.approval {
              background-image: url('~@/assets/common/approval.png');
            }

            &.social {
              background-image: url('~@/assets/common/social.png');
            }

            &.salary {
              background-image: url('~@/assets/common/salary.png');
            }

            &.role {
              background-image: url('~@/assets/common/role.png');
            }

            &.bpm {
              background-image: url('~@/assets/common/bpm.png');
            }
          }

          span {
            color: #697086;
            font-size: 14px;
            margin-top: 8px;
          }
        }
      }

      // 图表数据
      .chart-container {
        display: flex;

        .chart-info {
          width: 240px;
          margin-top: 10px;

          .info-main {
            padding: 10px;
            display: flex;
            flex-direction: column;

            :nth-child(1) {
              font-size: 14px;
              color: #697086;
            }

            :nth-child(2) {
              margin-top: 10px;
              font-size: 30px;
              color: #04c9be;
              font-weight: 500;
            }
          }

          .info-list {
            background: #f5f6f8;
            border-radius: 4px;
            padding: 12px 15px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .info-list-item {
              width: 50%;
              margin-top: 10px;
              display: flex;
              flex-direction: column;

              :nth-child(1) {
                font-size: 14px;
                color: #697086;
              }

              :nth-child(2) {
                margin-top: 10px;
                font-size: 30px;
                color: #383c4e;
                font-weight: 500;
              }
            }
          }
        }

        .chart {
          flex: 1
        }
      }

      // 帮助链接


      // 通知公告
      .information-list {
        margin-top: 20px;

        .information-list-item {
          display: flex;
          align-items: center;
          margin: 15px 0;

          img {
            width: 40px;
            height: 40px;
            border: 50%;
          }

          .col {
            color: #8a97f8;
            font-size: 14px;
          }

          div :nth-child(2) {
            color: #697086;
            font-size: 14px;
          }

          div :nth-child(3) {
            font-size: 14px;
          }
        }
      }
    }

    .help {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      margin: 10px 0 10px 10px;

      .panel-title {
        font-size: 16px;
        color: #383c4e;
        font-weight: 500;
        width: 264px;

        margin: auto;
        margin-bottom: 20px;

      }

      .help-left {
        width: 304px;
        padding: 20px;
        background-color: #fff;
      }

      .help-right {
        flex: 1;
        background-color: #fff;

        padding: 20px;


        .caledar-head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;

          i {
            cursor: pointer;


          }

          .el-icon-arrow-right {
            margin-left: 20px;

          }
        }

      }

      .help-list {
        margin: 0 0 34px 0;

        .help-block {
          background: #f5f6f8;
          border-radius: 4px;
          width: 264px;
          height: 54px;
          padding: 17px 10px;
          font-size: 14px;
          color: #697086;
          margin: auto;
          margin-top: 12px;



          i {
            width: 20px;
            height: 20px;
            display: inline-block;
            background-size: cover;
            vertical-align: middle;
          }

          i.icon-help {
            background-image: url("~@/assets/common/help.png");
          }

          i.icon-support {
            background-image: url("~@/assets/common/support.png");
          }

          i.icon-add {
            background-image: url("~@/assets/common/add.png");
          }

          i.icon-entry {
            background-image: url("~@/assets/common/entry.png");
          }
        }
      }
    }
  }
}
</style>

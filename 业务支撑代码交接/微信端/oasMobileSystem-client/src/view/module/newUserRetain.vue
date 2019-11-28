<template>
  <div>
    <div class="fastGroup">
      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:type==1}" v-on:tap="toggletype(1)">注册留存</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==2}" v-if="systemId!=3&&gameId!=1&&gameId!=2&&gameId!=17&&gameId!=27"
          v-on:tap="toggletype(2)">全新注册留存</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==3}" v-if="systemId==2" v-on:tap="toggletype(3)">新增设备留存</v-touch>
      </div>
      <!--<div class="fastSelecter"v-else>
        <v-touch tag="div" class="fast-item" :class="{now:type==1}" v-on:tap="toggletype(1)">日</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==2}" v-on:tap="toggletype(2)">周</v-touch>
        <v-touch tag="div" class="fast-item px1-l" :class="{now:type==3}" v-on:tap="toggletype(3)">月</v-touch>
      </div>-->
    </div>
    <date-picker :date="date" :dateChange="dateChange"></date-picker>
    <!--<newUserRetainChart></newUserRetainChart>-->
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component v-bind:is="currentView">
        </component>
      </keep-alive>
    </transition>
    <div class="tran-group" @click="toggleModel">
      <i class="iconfont" :class="{down:currentView=='newUserRetainChart',up:currentView=='newUserRetainTable'}"></i>
    </div>
  </div>
</template>
<script>
  import nvDatePicker from '../../components/range-datepicker.vue'
  import newUserRetainChart from '../../components/newUserRetainChart.vue'
  import newUserRetainTable from '../../components/newUserRetainTable.vue'
  import httpRequest from '../../utils/httpRequest.js'
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      'date-picker': nvDatePicker,
      'newUserRetainChart': newUserRetainChart,
      'newUserRetainTable': newUserRetainTable
    },
    data: function () {
      return {
        date1: window.moment().add(-15, "days").format("YYYY-MM-DD"),
        date2: window.moment().add(-2, "days").format("YYYY-MM-DD"),
        type: 1,
        currentView: 'newUserRetainChart'
      }
    },
    mounted: function () {
      this.query();
    },
    computed: {
      date: function () {
        var obj = {
          startTime: this.date1,
          endTime: this.date2
        }
        return obj;
      },
      systemId: function () {
        return this.$store.state.basestore.nowgame.system_id;
      },
      gameId: function () {
        return this.$store.state.basestore.nowgame.game_id;
      }
    },
    methods: {
      dateChange: function (newDate) {
        this.date1 = newDate.startTime;
        this.date2 = newDate.endTime;
        this.query();
      },
      toggletype: function (type) {
        this.type = type;
        this.query();
      },
      toggleModel: function () {
        if (this.currentView == "newUserRetainChart") {
          this.currentView = "newUserRetainTable";
        } else if (this.currentView == "newUserRetainTable") {
          this.currentView = "newUserRetainChart";
          setTimeout(() => {
            this.$store.state.userRetainstore.drawChart();
          }, 500)

        }
      },
      query: function () {
        var params = {
          date1: this.date1,
          date2: this.date2,
          select_id: this.type
        }
        httpRequest.getNewUserRetainData(params, (data) => {
          if (data.state == "successed") {
            var newUserRetainData;
            if (data.result.length == 0) {
              Toast("查询结果为空!");
              newUserRetainData = [];
            } else {
              newUserRetainData = data.result[0];
              this.$store.dispatch("setNewUserRetainData", newUserRetainData);
              if (this.currentView == "newUserRetainChart")
                this.$store.state.userRetainstore.drawChart();
            }
          } else {
            Toast(data.result.errorMsg);

          }
        })
      }
    }

  }

</script>
<style></style>

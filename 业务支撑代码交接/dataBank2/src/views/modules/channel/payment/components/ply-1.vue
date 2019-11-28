<template>
  <div class="pay-channel-list" v-if="data">
  <Row>
    <div class="title-list">付费渠道</div>
  </Row>
  <Card class="card">
    <Row>
      <div @click="toggle(data)">
        <Checkbox :state="data.len===data.selected?2:data.selected===0?0:1">
          <label>全选</label>
        </Checkbox>
      </div>
      <Search class="search" :params="{click: searching}"></Search>
    </Row>
    <Row>
      <div class="box box-fixed">
        <div class="btn btn-secondary" :class="" v-for="e in data" v-if="typeof(e)==='object'&&searchFilter(e.name.toLowerCase())">
          <div @click="toggle(e)">
            <Checkbox :state="data.len===data.selected?2:data.selected===0?0:e.select"></Checkbox>
          </div>
          <span :title="e.name">{{e.name}}</span>
        </div>
      </div>
    </Row>
  </Card>
  <Row>
    <button class="btn confirm" @click="toConfirm">确 定</button>
  </Row>
</div>
</template>

<script>

import Card from 'src/components/ui/card'
import Row from 'src/components/layout/row'
import Search from 'src/components/form/search'
import Checkbox from 'src/components/form/checkbox/normal'
import Navi from 'src/components/ui/nav';
import { mapGetters } from 'vuex'

export default {
  components: {
    Card, Row, Search, Checkbox, Navi
  },
  // template: require('../templates/ply-1.html'),
  computed: {
    data() {
      let data = this.$store.state.PayChannel.data;
      return data
    },
    confirm() {
      return this.$store.state.PayChannel.confirm
    }
  },
  data: function() {
    return {
      curId: null,
      searchtxt: ''
    }
  },
  methods: {
    toConfirm() { // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "渠道不能为空~"
        })
      } else {
        this.$store.commit('PayChannel/confirm', $.extend(true, {}, this.data))
        this.$store.commit('AsideToggleShow', 2);
      }
    },
    toggle(e) {
      this.$store.commit('PayChannel/toggle', { e })
    },
    /**
     * 
     * @function searching
    */
    searching(searchtxt) {
      this.searchtxt = searchtxt.toLowerCase()
    },
    searchFilter(name) {
      if (name.indexOf(this.searchtxt) != -1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/common';

.title-list {
  margin-top: 12px !important;
}

.card {
  margin-top: 10px;
}

.btn-secondary {
  border: 0;
  &:hover {
    border: 0;
  }
}

.selected {
  overflow: auto;
  height: 170px;
  .line {
    clear: both;
    float: left;
    cursor: default;
    .icon-close {
      cursor: pointer;
      display: none;
    }
    &:hover {
      .icon-close {
        display: inline-block;
      }
    }
  }
}
</style>

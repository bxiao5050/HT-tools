<template>
  <div class="agent-list" v-if="data">
    <Row>
      <div class="title-list">代理商列表</div>
    </Row>
    <Row>
      <OSGroup></OSGroup>
    </Row>
    <Row>
      <Navi class="navi" :data="{list:data,itemName:'grandname',cur:curGrandid,curName:'grandid',click:naviClick}"></Navi>
    </Row>
    <Row>
      <Card class="card">
        <Row>
          <div @click="toggle(data[curGrandid])">
            <Checkbox :state="data[curGrandid].select">
              <label>全选</label>
            </Checkbox>
          </div>
          <Search class="search"></Search>
        </Row>
        <div class="box box-fixed">
          <li class="btn" :key="i" :class="{'box-item':curParentid===e.parentid,'btn-secondary':curParentid!=e.parentid}" v-for="(e, i) in data[curGrandid]" @click="data[curGrandid].default=e.parentid" v-if="typeof(e)==='object'">
            <div @click="toggle(data[e.grandid][e.parentid])">
              <Checkbox :state="data[e.grandid][e.parentid].select"></Checkbox>
            </div>
            <span class="title" :title="e.parentname">{{e.parentname}}</span>
          </li>
        </div>
      </Card>
      <Card class="card">
        <Row>
          <div @click="toggle(data[curGrandid][curParentid])">
            <Checkbox :state="data[curGrandid][curParentid].select">
              <label>全选</label>
            </Checkbox>
          </div>
          <Search class="search"></Search>
        </Row>
        <div class="box box-fixed">
          <li class="btn" :class="{'box-item':curId===e.id,'btn-secondary':curId!=e.id}" :key="i" v-for="(e, i) in data[curGrandid][curParentid]" @click="curId=e.id" v-if="typeof(e)==='object'">
            <div @click="toggle(e)">
              <Checkbox :state="e.select"></Checkbox>
            </div>
            <span class="title" :title="e.name">{{e.name}}</span>
          </li>
        </div>
      </Card>
      <Card class="card">
        <p>已选中列表({{selectedList?selectedList.length:0}})</p>
        <div class="selected">
          <span class="line" :key="i" v-for="(e, i) in selectedList">
            <span v-html="e.name?e.name:e.parentname?e.parentname:e.grandname?e.grandname:''"></span>
            <i class="icon-close" @click="toggle(e)"></i>
          </span>
        </div>
      </Card>
    </Row>
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
import OSGroup from 'src/views/modules/OS'
export default {
  components: {
    Card,
    Row,
    Search,
    Checkbox,
    Navi,
    OSGroup
  },
  computed: {
    data() {
      return this.$store.state.Agent.data
    },
    confirm() {
      return this.$store.state.Agent.confirm
    },
    curGrandid() {
      return this.$store.state.Agent.data.default;
    },
    curParentid() {
      return this.$store.state.Agent.data[this.$store.state.Agent.data.default].default;
    },
    selectedList() {
      return this.$store.getters['Agent/selectedList']
    }
  },
  data: function () {
    return {
      curId: null,
      searchTxt: ''
    }
  },
  methods: {
    naviClick(e, i) {
      let store = this.$store,
        data = store.state.Agent.data,
        _old = data.default,
        _new = e.grandid

      if (_old !== _new) {
        if (data[_old].select !== 0) {
          store.commit('Agent/toggle', { e: data[_old] })
        }
        store.commit('Agent/toggle', { e: data[_new] })
        data.default = _new
      }
    },
    toConfirm() { // 数据同步
      if (this.data.selected === 0) {
        Utils.Notification.error({
          message: "代理商不能为空~"
        })
      } else {
        this.$store.commit('Agent/confirm', $.extend(true, {}, this.data))
        this.$store.commit('AsideToggleShow', 1);
      }
    },
    toggle(e) {
      this.$store.commit('Agent/toggle', { e })
    },
  }
}

</script>
<style lang="scss" scoped>
@import "../scss/common";
.card {
  &:nth-child(1) {
    width: 50%;
  }
  &:nth-child(2) {
    margin: 15px;
  }
  &:nth-child(3) {
    width: 35%;
  }
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
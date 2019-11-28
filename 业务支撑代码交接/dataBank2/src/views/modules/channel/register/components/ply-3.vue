<template>
  <div class="agent-list" v-if="data">
  <Row>
    <div class="title-list">渠道列表</div>
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
        <li class="btn" :class="{'box-item':curParentid===e.parentid,'btn-secondary':curParentid!=e.parentid}" v-for="(e, i) in data[curGrandid]" @click="setDefault(e)" v-if="typeof(e)==='object'">
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
        <li class="btn" :class="{'box-item':curId===e.id,'btn-secondary':curId!=e.id}" v-for="(e, i) in data[curGrandid][curParentid]" @click="curId=e.id" v-if="typeof(e)==='object'">
          <div @click="toggle(e)">
            <Checkbox :state="e.select"></Checkbox>
          </div>
          <span class="title" :title="e.name">{{e.name}}</span>
        </li>
      </div>
    </Card>
    <Card class="card">
      <p>已选中列表</p>
      <div class="selected">
        <span class="line" v-for="(e, i) in selectedList">
          <span v-html="e.name?e.name:e.parentname?e.parentname:e.grandname?e.grandname:''"></span><i class="icon-close" @click="toggle(e)"></i>
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

  export default {
    components: {
      Card,
      Row,
      Search,
      Checkbox,
      Navi
    },
    // template: require('../templates/ply-3.html'),
    computed: {
      data() {
        // let data = this.$store.state.RegChannel.data;
        // if (data.len > 0) return data;
        // return false
        return this.$store.state.RegChannel.data
      },
      confirm() {
        return this.$store.state.RegChannel.confirm
      },
      curGrandid() {
        return this.$store.state.RegChannel.data.default;
      },
      curParentid() {
        return this.$store.state.RegChannel.data[this.$store.state.RegChannel.data.default].default;
      },
      selectedList() {
        return this.$store.getters['RegChannel/selectedList']
      }
    },
    data: function() {
      return {
        curId: null,
        searchTxt: ''
      }
    },
    methods: {
      naviClick(e, i) {
        // this.$store.state.RegChannel.data.default = e.grandid
        let store = this.$store,
        data = store.state.RegChannel.data,
        _old = data.default,
        _new = e.grandid

      if (_old !== _new) {
        if (data[_old].select !== 0) {
          store.commit('RegChannel/toggle', { e: data[_old] })
        }
        store.commit('RegChannel/toggle', { e: data[_new] })
        data.default = _new
      }
      },
      toConfirm() { // 数据同步
        if (this.data.selected === 0) {
          Utils.Notification.error({
            message: "渠道不能为空~"
          })
        } else {
          this.$store.commit('RegChannel/confirm', $.extend(true, {}, this.data))
          this.$store.commit('AsideToggleShow', 2);
        }
      },
      toggle(e) {
        this.$store.commit('RegChannel/toggle', {
          e
        })
      },
      setDefault(e) {
        this.$store.state.RegChannel.data.default = e.grandid
        this.$store.state.RegChannel.data[this.$store.state.RegChannel.data.default].default = e.parentid
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/common';
  .card {
    &:nth-child(2) {
      margin: 16px 16px 0 16px;
    }
    &:nth-child(3) {
      width: 45%;
    }
  }
   .btn-secondary{
    border:0;
    &:hover{
      border:0;
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
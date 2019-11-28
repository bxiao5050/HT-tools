<template>
  <div class="agent-list" v-if="data">
  <Row>
    <div class="title-list">代理商列表</div>
  </Row>
  <Row>
    <Navi class="navi" :data="{list:effConfig.list,itemName:'name',cur:effConfig.default,curName:'id',click:(item,index)=>{effConfig.default=item.id}}"></Navi>
    <div @click="toggle(data)">
      <Checkbox class="checkbox" :state="data.len===data.selected?2:data.selected===0?0:1">
        <label>全选</label>
      </Checkbox>
    </div>
    <Search class="search" :params="{click: searching}"></Search>

  </Row>
  <Card class="card">

    <Row>
      <div class="box box-fixed">
        <div class="btn btn-secondary" v-for="e in data" v-if="typeof(e)==='object'&&searchFilter(e.name.toLowerCase())">
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
  <!-- <Row class="confirm">
    
  </Row> -->
</div>
</template>

<script>
  import Card from 'src/components/ui/card'
  import Row from 'src/components/layout/row'
  import Search from 'src/components/form/search'
  import Checkbox from 'src/components/form/checkbox/normal'
  import Navi from 'src/components/ui/nav'

  export default {
    components: {
      Card,
      Row,
      Search,
      Checkbox,
      Navi
    },
    // template: require('../templates/ply-1.html'),
    computed: {
      data() {
        return this.$store.state.Agent.data
      },
      confirm() {
        return this.$store.state.Agent.confirm
      }
    },
    data: function() {
      return {
        activeId: null,
        searchtxt: '',
        effConfig: {
          default: '1',
          list: [{
            name: '平台',
            id: '1'
          }, {
            name: '联运',
            id: '2'
          }, {
            name: '平台+联运',
            id: '1,2'
          }]
        }

      }
    },
    methods: {
      searching(searchtxt) {
        this.searchtxt = searchtxt.toLowerCase()
      },
      searchFilter(name) {
        if (name.indexOf(this.searchtxt) != -1) {
          return true
        } else {
          return false
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
        this.$store.commit('Agent/toggle', {
          e
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/common';
   .btn-secondary{
    border:0;
    &:hover{
      border:0;
    }
  }
</style>
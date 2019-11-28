<template>
  <div>
    <div class="page-cover" v-if="show" @click="showMenus"></div>
    <header>
      <div class="header">
        <!--<div class="header-left" @click="openMenu"><i class="iconfont">&#xe604;</i></div>-->
        <v-touch tag="div" class="header-left" v-on:tap="openMenu"><i class="iconfont">&#xe604;</i></v-touch>
        <!--<h1 class="header-title" @click="toGame">{{(nowgame.game_name||"")+" "+(nowmenu.menu_name||"")}}</h1>-->
        <v-touch tag="h1" class="header-title" v-on:tap="toGame">{{(nowgame.game_name||"")+" "+(nowmenu.menu_name||"")}}</v-touch>
        <div class="header-right">
          <div @click="rightClick"><i class="iconfont" style="font-size: 24px">&#xe634;</i></div>
        </div>
      </div>
    </header>
    <nv-menu :show-menu="show" v-on:closeMenus="showMenus"></nv-menu>
  </div>
</template>
<script>
  import nvMenu from './menu.vue';
  export default {
    replace: true,
    data() {
      return {
        show: false
      };
    },
    methods: {
      openMenu() {
        this.show = !this.show;
      },
      showMenus() {
        this.show = !this.show;
      },
      toGame() {
        this.$router.push({
          name: "game"
        });
      },
      rightClick() {
        if (this.nowSystemId == 4) {
          this.$router.push({
            name: 'lanuchArea'
          });
        } else {
          this.$router.push({
            name: 'agent'
          });
        }
      }
    },
    computed: {
      nowSystemId: function () {
        return this.$store.state.basestore.nowgame.system_id;
      },
      nowgame: function () {
        return this.$store.state.basestore.nowgame;
      },
      nowmenu: function () {
        return this.$store.state.basestore.nowmenu;
      }
    },
    components: {
      nvMenu
    }
  }

</script>

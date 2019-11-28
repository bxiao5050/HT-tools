<template>
  <div>
    <header>
      <div class="header">
        <div class="header-left"></div>
        <h1 class="header-title">选择游戏</h1>
      </div>
    </header>
    <div class="page-body">
      <div class="game-content">
        <div class="game-group" v-for="system in systems">
          <div class="game-type-header px1-b">
            <i class="iconfont">&#xe622;</i>
            <div class="game-header-text">{{system.system_name}}</div>
          </div>
          <div class="game-box">
            <v-touch tag="div" class="game-item" v-for="item in games" v-if="item.system_id==system.system_id" v-on:tap="selectGame(item)">
              <img class="game-icon" :src="item.image_url" onerror="this.src='static/game_icon/7road_Icon.png'" alt="" />
          <label class="game-name">{{item.game_name}}</label>
</v-touch>
</div>
</div>
</div>
</div>
</div>
</template>
<script>
  import httpRequest from '../utils/httpRequest.js'
  import commonMethod from '../utils/commonMethod.js'
  import {
    mapGetters
  } from 'vuex'
  import {
    Toast
  } from 'mint-ui';
  export default {
    data: function () {
      return {}
    },
    mounted: function () {
      this.getGames();
    },
    methods: {
      getGames: function () {
        httpRequest.getGames({}, (data) => {
          if (data.state == "successed") {
            var game = data.result[0];
            this.$store.dispatch("setGames" ,game);

          } else {
            Toast(data.result.errorMsg)
          }
        })
      },
      selectGame: function (item) {
        this.$store.dispatch("clearAgentInfo"); //清理代理商状态
        this.$store.dispatch("clearChannelInfo"); //清理渠道状态

        this.$store.dispatch("setNowGame", item);
        this.changeServerGame()
      },
      changeServerGame: function () {
        httpRequest.changeGame((data) => {
          if (data.state == "successed") {
            this.getMenus();
          }
          else {
            Toast(data.result.errorMsg)
          }
        })
      },
      getAgents: function () {
        var params = {
          system_id: this.$store.state.basestore.nowgame.system_id,
          game_id: this.$store.state.basestore.nowgame.game_id,
          agent_id: 0
        }
        commonMethod.judgeIsCacheAgent(params, (data) => {
          if (data.state == "successed") {
            var agents = data.result[0];
            this.$store.dispatch("setAgents", agents);
            this.$store.dispatch("setNowAgent", agents[0]);
            this.$store.dispatch("setFirstAgent", agents[0]);
            var secondParams = {
              system_id: this.$store.state.basestore.nowgame.system_id,
              game_id: this.$store.state.basestore.nowgame.game_id,
              agent_id: agents[0].AGENT_ID
            }
            commonMethod.judgeIsCacheAgent(secondParams, (secData) => {
              var secondagents;
              if (secData.state == "successed") {
                if (secData.result.length > 0) {
                  secondagents = secData.result[0];
                } else {
                  secondagents = [];
                }
                this.$store.dispatch("setAgents", secondagents);
                this.$store.dispatch("setNowAgentParam", secondagents);
                this.$store.dispatch("agentStateAdd", 1);
                if (this.$store.state.basestore.nowgame.system_id == 1) {
                  this.$router.push({
                    name: this.$store.state.basestore.nowmenu.menu_url
                  })
                } else {
                  this.getChannels();
                }
              } else {
                Toast(secData.result.errorMsg)
              }
            });
          } else {
            Toast(data.result.errorMsg)
          }
        })
      },
      getChannels: function () {
        var params = {
          system_id: this.$store.state.basestore.nowgame.system_id,
          game_id: this.$store.state.basestore.nowgame.game_id,
          channel_id: 0
        }
        commonMethod.judgeIsCacheChannel(params, (data) => {
          if (data.state == "successed") {
            var channels = data.result[0];
            this.$store.dispatch("initChannels", channels);
            this.$router.push({
              name: this.$store.state.basestore.nowmenu.menu_url
            })
          } else {
            Toast(data.result.errorMsg)
          }
        })
      },
      getApps: function () {
        httpRequest.getApps((data) => {
          if (data.state == "successed") {
            var apps = data.result[0];
            if (this.$store.state.basestore.nowmenu.menu_url == "launchReport")
              this.$store.dispatch("initApps", apps);
            else if (this.$store.state.basestore.nowmenu.menu_url == "dataRepair")
              this.$store.dispatch("initDataRepairApps", apps);

            this.$router.push({
              name: this.$store.state.basestore.nowmenu.menu_url
            })
          } else {
            Toast(data.result.errorMsg)
          }
        })
      },
      getMenus: function () {
        var params = {
          system_id: this.$store.state.basestore.nowgame.system_id,
          game_id: this.$store.state.basestore.nowgame.game_id,
        }
        httpRequest.getMenus(params, (data) => {
          if (data.state == "successed") {
            var menus = data.result[0];
            this.$store.dispatch("setMenus", menus);
            this.$store.dispatch("setNowMenu", menus[0]);

            if (this.$store.state.basestore.nowgame.system_id != 4) {
              this.getAgents();
            } else {
              this.getApps();
            }
          } else {
            Toast(data.result.errorMsg)
          }
        })
      }
    },
    computed: {
      games: function () {
        return this.$store.state.basestore.games;
      },
      systems: function () {
        var systems = [];
        var sys = [];
        for (var i = 0; i < this.games.length; i++) {
          systems.push({
            system_id: this.games[i].system_id,
            system_name: this.games[i].system_name
          });
        }
        for (var i = 0; i < systems.length; i++) {
          if (i == 0) {
            sys.push(systems[i])
          } else {
            var count = 0;
            for (var j = 0; j < sys.length; j++) {
              if (systems[i].system_id == sys[j].system_id) {
                count++;
                break;
              } else {
                continue;
              }
            }
            if (!count) {
              sys.push(systems[i])
            }
          }
        }
        console.log(sys);
        return sys;
      }

      // gameCountObj: function () {
      //   var obj = {
      //     webcount: 0,
      //     mobilecount: 0,
      //     releasecount: 0
      //   }
      //   for (var i = 0; i < this.games.length; i++) {
      //     switch (this.games[i].system_id) {
      //       case 1:
      //         obj.webcount++;
      //         break;
      //       case 2:
      //         obj.mobilecount++;
      //         break;
      //       case 3:
      //         obj.releasecount++;
      //         break;
      //     }
      //   }
      //   return obj;
      // }
    }
  }

</script>

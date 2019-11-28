<template>
  <div class="channel-trigger" @click="toggle">
  <slot></slot>
  <div class="btn btn-secondary" :title="txt">
    <span>{{txt}}</span>
  </div>
  <i class="el-icon-caret-bottom"></i>
</div>
</template>

<script>
// class trigger {
//   computed = {
//     txt() {
//       let data = this.$store.getters["PayChannel/selectedConfirmList"];
//       let len = data.length - 1;
//       let h = "";
//       if (data.length > 0) {
//         switch (this.$store.state.PayChannel.ply) {
//           case 1:
//             data.forEach((e, i) => {
//               let d = len === i ? "" : ",";
//               h += e.name + d;
//             });
//             break;
//           case 3:
//             data.forEach((e, i) => {
//               let d = len === i ? "" : ",";
//               let name = e.name
//                 ? e.name
//                 : e.parentname ? e.parentname : e.grandname ? e.grandname : "";
//               h += name + d;
//             });
//             break;
//         }
//       } else {
//         h = "空";
//       }
//       return h;
//     }
//   };
//   methods = {
//     toggle() {
//       this.$store.commit("AsideToggleShow", 3);
//     }
//   };
//   template = require("../templates/trigger.html");
// }

/**
 * @ignore
 */
// export default new trigger();
export default {
  computed: {
    txt() {
      let data = this.$store.getters["PayChannel/selectedConfirmList"];
      let len = data.length - 1;
      let h = "";
      if (data.length > 0) {
        switch (this.$store.state.PayChannel.ply) {
          case 1:
            data.forEach((e, i) => {
              let d = len === i ? "" : ",";
              h += e.name + d;
            });
            break;
          case 3:
            data.forEach((e, i) => {
              let d = len === i ? "" : ",";
              let name = e.name
                ? e.name
                : e.parentname ? e.parentname : e.grandname ? e.grandname : "";
              h += name + d;
            });
            break;
        }
      } else {
        h = "空";
      }
      return h;
    }
  },
  methods: {
    toggle() {
      this.$store.commit("AsideToggleShow", 3);
    }
  }
  // template = require("../templates/trigger.html");
};
</script>
<style lang="scss" scoped>
.channel-trigger {
  display: flex;
  width: 220px;
  position: relative;
  height: 32px;
  .btn {
    width: 100%;
    line-height: 30px;
    padding: 0 8px;
    padding-right: 32px;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  i {
    position: absolute;
    right: 8px;
    top: 10px;
    font-size: 14px;
    color: #888;
  }
}
</style>
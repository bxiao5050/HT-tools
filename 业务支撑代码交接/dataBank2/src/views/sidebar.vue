<template>
  <div class="sidebar" :class="{sm: isCompact}">
    <header>
      <i class="icon-system"></i>
      <elSelect class="system" v-model="$store.state.common.systems.systemId" @change="selectSystem" popper-class="sidebar">
        <elOption v-if="item.id" v-for="item in systems" :key="item.id" :label="item.name" :value="item.id"></elOption>
      </elSelect>
    </header>
    <main>
      <div class="firMenu" v-for="(firstMenu, index) in menus" :key="index" :data-index="index">
        <div class="name" :class="{active: nowActive===index,open:recordActive===index, shut: nowActive!=index}" @click="toggleOpen(index)" :data-index="index" @mouseenter="hover({firstMenu,index,type:0})" @mouseout="hover({firstMenu,index,type:1})">
          <i @mouseenter="hover({firstMenu,index,type:0})" @mouseout="hover({firstMenu,index,type:0})" class="icon" :class="firstMenu.icon"></i>
          <span class="firMenuName">{{firstMenu.menuName}}</span>
        </div>
        <transition @enter="enter" @leave="leave">
          <div v-show="nowActive===index" :class="{active:nowActive===index}" class="toggle" :data-index="index" data-height>
            <div @mouseenter="hover({firstMenu,index,type:0})" @mouseout="hover({firstMenu,index,type:1})" class="secMenu" :class="{active: secondMenu.menuId===nowmenu.menuId}" v-for="(secondMenu, i) in firstMenu.childrenMenu" :key="i" :data-index="i" @click="goMenu(secondMenu,index)">
              {{secondMenu.menuName}}
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
import commonMethod from "src/utils/commonMethod";
import menuIconConfig from "src/config/menuIconConfig";
export default {
  name: "sidebar",
  data: () => {
    return {
      imgs: {
        logo: require("src/assets/sidebar/7road.png")
      },
      menuStatus: [],
      nowActive: 0,
      recordActive: 0
    };
  },
  computed: {
    system() {
      return this.$store.getters.system;
    },
    systems() {
      return this.$store.state.common.systems;
    },
    menus() {
      this.setItemsHeight();
      requestAnimationFrame(() => {
        $(".list-nav").hover(
          e => {
            if (this.isCompact) this.nowActive = e.target.dataset.index;
          },
          () => {
            if (this.isCompact) this.nowActive = this.recordActive; // -1
          }
        );
      });
      let menus = this.$store.state.common.menus;
      menus.forEach((menu, index) => {
        menuIconConfig.forEach(item => {
          if (menu.menuId == item.menuId) {
            menu.icon = item.icon;
          }
        });
      });

      menus.forEach((menu, index) => {
        menu.childrenMenu.forEach(child => {
          if (child.menuId == this.nowmenu.menuId) {
            this.recordActive = this.nowActive = index;
          }
        });
      });
      return menus;
    },
    nowmenu() {
      return this.$store.state.common.nowmenu;
    },
    isCompact() {
      return this.$store.state.layout.isCompact;
    }
  },
  watch: {
    isCompact() {
      this.toggleMenu();
    }
  },
  mounted: function () {
    this.init = true;
    this.listItem = $(".sidebar.list-item");
    this.$listitems = $(".list-items");
    this.setItemsHeight();
    this.toggleMenu();
  },
  methods: {
    hover({ firstMenu, type, index }) {
      if (this.isCompact) {
        if (type) {
          this.nowActive = -1;
        } else {
          this.nowActive = index;
        }
      }
    },
    goMenu(menu, index) {
      this.recordActive = this.nowActive = index;
      this.$store.commit("selectMenu", menu);
      this.$router.push(menu.menuUrl);
    },
    enter(ele, done) {
      let height = ele.dataset.height;
      TweenMax.to(ele, 0.5, {
        height: height,
        opacity: 1,
        onComplete: () => {
          done();
        }
      });
    },
    leave(ele, done) {
      let height = ele.dataset.height;
      TweenMax.to(ele, 0.5, {
        height: 0,
        opacity: 0,
        onComplete: () => {
          done();
        }
      });
    },
    toggleOpen(index) {
      if (!this.isCompact) {
        this.recordActive = this.nowActive =
          this.nowActive == index ? -1 : index;
      }
    },
    setItemsHeight() {
      requestAnimationFrame(() => {
        $.each(this.listItem, (k, e) => {
          e.dataset.height = e.children.length * 34;
        });
      });
    },
    hoverToggle(index, isCompact) {
      if (this.isCompact) {
        this.nowActive = index;
      }
    },
    selectSystem(item) {
      this.$store.commit("changeSystem", item);
      commonMethod.changeGame();
    },
    toggleMenu() {
      if (this.isCompact) {
        this.listItem.hide();
        this.recordActive = this.nowActive;
        this.nowActive = -1;
      } else {
        // this.$dropdownMenu.removeClass('core-hide')
        this.nowActive = this.recordActive;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  transition: 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: $headerHeight;
  width: $sidebarWidth;
  height: 100%;
  background: $sidebarBgcolor;
  display: flex;
  align-items: center;
  flex-direction: column;
  header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: $sidebarHeight;
    background: #5b5691;
    border-right: 1px solid #3f3b73;
    border-bottom: 1px solid #3f3b73;
    .icon-system {
      color: #fff;
      font-size: 23px;
      margin: 0 6px 0 0;
    }
    .system {
      width: 168px;
    }
  }
  main {
    position: relative;
    width: 100%;
    height: calc(100% - 96px);
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.2);
    .firMenu {
      display: flex;
      flex-direction: column;
      position: relative;
      .name {
        display: flex;
        position: relative;
        cursor: pointer;
        font-size: 15px;
        width: 100%;
        line-height: 38px;
        height: 38px;
        align-items: center;
        color: #333;
        &.active {
          background: #5b5791;
          color: #fff;
          border-right: 1px solid #5b5791;
          .firMenuName {
            font-weight: bold;
          }
        }
        &.open {
          background: #5b5791;
          color: #fff;
        }
        // &.active + .toggle {
        //   .secMenu {
        //     background: #e5e3f8;
        //     border-right: 1px solid #e5e3f8;
        //   }
        // }
        span {
          display: block;
          width: 148px;
          overflow: hidden;
          height: 100%;
        }
        &:hover {
          background: #5b5791;
          color: #fff;
        }
        &:before {
          content: "";
          margin: 0 0 0 16px;
        }
        &:after {
          transition: 0.3s ease-out;
          content: "\2039";
          position: absolute;
          top: 0;
          right: 23px;
          transform: rotate(-90deg);
        }
        &.shut {
          &:after {
            right: 20px;
            top: 2px;
            transform: rotate(-180deg);
          }
        }
        .icon {
          margin: 0 10px 0 5px;
        }
      }
      .toggle {
        display: flex;
        flex-direction: column;
        .secMenu {
          color: #5b5691;
          color: #333;
          text-decoration: none;
          display: block;
          cursor: pointer;
          width: 100%;
          line-height: 34px;
          font-size: 13px;
          overflow: hidden;
          height: 34px;
          &.active,
          &:hover {
            color: #fff;
            background: #5b5691;
          }
          &:before {
            content: "";
            padding: 0 0 0 56px;
          }
          &.open.active {
            border-left: 3px solid #fff;
          }
        }
      }
    }
  }
}

.sidebar.sm {
  width: 60px;
  .toggle {
    left: 60px;
    text-align: center;
    width: 150px;
    position: absolute;
  }
  .secMenu {
    &:before {
      display: none;
    }
  }
  header {
    &:hover {
      background: #5b5691;
    }
  }
  .system {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background: transparent;
  }
  .toggle {
    top: 0;
    background: #fff;
  }
  .name {
    &:after {
      content: "" !important;
      transform: rotate(-180deg) !important;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .firMenuName {
      display: none;
    }
  }
}
</style>

<style lang="scss">
.sidebar {
  .system {
    input {
      background: transparent;
      color: inherit;
      font-size: 16px;
      border: 0;
      padding: 0 32px 0 0;
      text-align: center;
    }
  }
}

.el-select-dropdown.sidebar {
  overflow: hidden;
  background: #3d3971;
  border: 0;
  .el-select-dropdown__item {
    text-align: center;
    color: #fff;
    background: transparent;
    &.hover,
    &:hover {
      background: #34b58c;
    }
  }
}

.sidebar.sm {
  .system {
    .el-input,
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      color: transparent;
      user-select: none;
    }
    .el-input__icon {
      display: none;
    }
  }
}
</style>
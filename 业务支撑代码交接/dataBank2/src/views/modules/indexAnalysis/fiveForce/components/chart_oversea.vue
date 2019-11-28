<template>
  <div class="card-box">
    <card>
      <div slot="header">{{$t('fiveForce.fiveForceDetail')}}</div>
      <div slot="body" class="five-force-pic" v-if="chartData">
        <div class="column first-col">
          <div class="column-row-item one-row">
            <div class="first-text">{{pointName?chartData[0][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[0][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[0][trend]*1===0?'right':chartData[0][trend]*1>0?'up':'down'"></i>{{chartData?chartData[0][trend]:0}}%</span>
            </div>
          </div>
          <div class="column-row-item two-row">
            <div class="first-text">{{pointName?chartData[1][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[1][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[1][trend]*1===0?'right':chartData[1][trend]*1>0?'up':'down'"></i>{{chartData?chartData[1][trend]:0}}%</span>
            </div>
          </div>
          <div class="column-row-item three-row">
             <div class="first-text">{{pointName?chartData[2][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[2][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[2][trend]*1===0?'right':chartData[2][trend]*1>0?'up':'down'"></i>{{chartData?chartData[2][trend]:0}}%</span>
            </div>
          </div>
          <div class="column-row-item four-row">
             <div class="first-text">{{pointName?chartData[3][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[3][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[3][trend]*1===0?'right':chartData[3][trend]*1>0?'up':'down'"></i>{{chartData?chartData[3][trend]:0}}%</span>
            </div>
          </div>
        </div>
        <div class="column second-col">
          <div class="column-row-item five-row">
             <div class="first-text">{{pointName?chartData[4][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[4][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[4][trend]*1===0?'right':chartData[4][trend]*1>0?'up':'down'"></i>{{chartData?chartData[4][trend]:0}}%</span>
            </div>
          </div>
          <div class="column-row-item six-row">
             <div class="first-text">{{pointName?chartData[5][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[5][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[5][trend]*1===0?'right':chartData[5][trend]*1>0?'up':'down'"></i>{{chartData?chartData[5][trend]:0}}%</span>
            </div>
          </div>
        </div>
        <div class="column third-col">
          <div class="column-row-item seven-row">
             <div class="first-text">{{pointName?chartData[6][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[6][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[6][trend]*1===0?'right':chartData[6][trend]*1>0?'up':'down'"></i>{{chartData?chartData[6][trend]:0}}%</span>
            </div>
          </div>
        </div>
        <div class="column four-col">
          <div class="column-row-item eight-row">
             <div class="first-text">{{pointName?chartData[7][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[7][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[7][trend]*1===0?'right':chartData[7][trend]*1>0?'up':'down'"></i>{{chartData?chartData[7][trend]:0}}%</span>
            </div>
          </div>
          <div class="column-row-item nine-row">
             <div class="first-text">{{pointName?chartData[8][pointName]:'NULL'}}</div>
            <div class="second-text">
            <span>{{chartData?chartData[8][date1]:0}}</span>
            <span><i class="icon-arrow" :class="chartData[8][trend]*1===0?'right':chartData[8][trend]*1>0?'up':'down'"></i>{{chartData?chartData[8][trend]:0}}%</span>
            </div>
          </div>
        </div>

          <div class="one-arrow">
           <div class="line_stlya">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
          </div>
          </div>
          <div class="two-arrow">
           <div class="line_stlya">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
          </div>
          </div>
          <div class="three-arrow">
           <div class="line_stlya">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
          </div>
          </div>
          <div class="four-arrow">
           <div class="line_stlya">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
          </div>
          </div>
          <div class="five-arrow">
           <div class="line_stlya">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
          </div>
          </div>
          <div class="six-arrow">
           <div class="line_stlya">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
          </div>
          </div>
          <div class="seven-arrow">
           <div class="line_stlyb">
             <i class="line"></i> 
             <div class="down">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
             </div>
             </div>
          </div>
          <div class="eight-arrow">
           <div class="line_stlyb">
             <!-- <i class="line"></i>
             <i class="icon-arrow2"></i> -->
             <div class="down">
             <i class="line"></i>
             <i class="icon-arrow2"></i>
             </div>
          </div>
          </div>
        
        <!-- <div class="body" v-if="chartData">
          <div class="lines combine">
            <div class="ll">
              <div class="lines">
                <div class="item">
                  <span>{{chartData[0][pointName]}}</span>
                  <span>{{chartData[0][date1]}}</span>
                  <span><i class="icon-arrow" :class="chartData[0][trend]*1===0?'right':chartData[0][trend]*1>0?'up':'down'"></i>{{chartData[0][trend]}}%</span>
                </div>
                <div class="line_stlya">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
                <div class="item">
                  <span>{{chartData[1][pointName]}}</span>
                  <span>{{chartData[1][date1]}}</span>
                  <span><i class="icon-arrow" :class="chartData[1][trend]*1===0?'right':chartData[1][trend]*1>0?'up':'down'"></i>{{chartData[1][trend]}}%</span>
                </div>
                <div class="line_stlya" style="margin-top:45px">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
              </div>
              <div class="lines">
                <div class="item">
                  <span>{{chartData[2][pointName]}}</span>
                  <span>{{chartData[2][date1]}}</span>
                  <span><i class="icon-arrow" :class="chartData[2][trend]*1===0?'right':chartData[2][trend]*1>0?'up':'down'"></i>{{chartData[2][trend]}}%</span>
                </div>
                <div class="line_stlya">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
                <div class="item">
                  <span>{{chartData[3][pointName]}}</span>
                  <span>{{chartData[3][date1]}}</span>
                  <span><i class="icon-arrow" :class="chartData[3][trend]*1===0?'right':chartData[3][trend]*1>0?'up':'down'"></i>{{chartData[3][trend]}}%</span>
                </div>
                <div class="line_stlya" style="margin-top:-45px">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
              </div>
            </div>
            <div class="lr">
              <i class="icon-cha plus a"></i>
              <div class="item">
                <span>{{chartData[4][pointName]}}</span>
                <span>{{chartData[4][date1]}}</span>
                <span><i class="icon-arrow" :class="chartData[4][trend]*1===0?'right':chartData[4][trend]*1>0?'up':'down'"></i>{{chartData[4][trend]}}%</span>
              </div>
              <div class="line_stlyb" style="height:218px">
                <i class="line"></i>
                <div class="down">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="lines">
            <div class="item">
              <span>{{chartData[5][pointName]}}</span>
              <span>{{chartData[5][date1]}}</span>
              <span><i class="icon-arrow" :class="chartData[5][trend]*1===0?'right':chartData[5][trend]*1>0?'up':'down'"></i>{{chartData[5][trend]}}%</span>
            </div>
            <div class="line_stlyc"></div>
            <div class="line_stlyd"></div>

            <div class="line_stlya">
              <i class="line"></i>
              <i class="icon-arrow2"></i>
            </div>

            <div class="item">
              <span>{{chartData[6][pointName]}}</span>
              <span>{{chartData[6][date1]}}</span>
              <span><i class="icon-arrow" :class="chartData[6][trend]*1===0?'right':chartData[6][trend]*1>0?'up':'down'"></i>{{chartData[6][trend]}}%</span>
            </div>

            <div class="width-b"></div>
          </div>

          <div class="lines line-4">
            <div class="item">
              <span>{{chartData[7][pointName]}}</span>
              <span>{{chartData[7][date1]}}</span>
              <span><i class="icon-arrow" :class="chartData[7][trend]*1===0?'right':chartData[7][trend]*1>0?'up':'down'"></i>{{chartData[7][trend]}}%</span>
            </div>
            <div class="line_stlyc"></div>
            <div class="line_stlyd"></div>
            <div class="line-style width-fixed"></div>

            <div class="line_stlya">
              <i class="line"></i>
              <i class="icon-arrow2"></i>
            </div>

            <div class="item">
              <span>{{chartData[8][pointName]}}</span>
              <span>{{chartData[8][date1]}}</span>
              <span><i class="icon-arrow" :class="chartData[8][trend]*1===0?'right':chartData[8][trend]*1>0?'up':'down'"></i>{{chartData[8][trend]}}%</span>
            </div>

            <div class="line_stlyb" style="height:70px;margin-top:35px">
              <i class="line"></i>
              <div class="down">
                <i class="line"></i>
                <i class="icon-arrow2"></i>
              </div>
            </div>

          </div>
          <div class="lines line-5">
            <div class="item">
              <span>{{chartData[8][pointName]}}</span>
              <span>{{chartData[8][date1]}}</span>
              <span><i class="icon-arrow" :class="chartData[8][trend]*1===0?'right':chartData[8][trend]*1>0?'up':'down'"></i>{{chartData[8][trend]}}%</span>
            </div>
            <div class="line_stlyc"></div>
            <div class="line_stlyd"></div>

            <div class="width-b line-style"></div>
            <div class="line-style width-fixed-5"></div>

            <div class="line_stlya">
              <i class="line"></i>
              <i class="icon-arrow2"></i>
            </div>
          </div>

        </div> -->
      </div>
    </card>
  </div>
</template>
<script>
import card from 'src/components/card.vue'
export default {
  props: ['date1', 'tableData'],
  components: {
    card
  },
  data() {
    return {
      list: [
        '注册用户数',
        '登录用户数',
        '活跃付费率',
        '付费金额',
        '新用户活跃人数',
        '老用户活跃人数',
        '活跃用户数',
        '付费用户数',
        '付费ARPU'
      ]
    }
  },
  computed: {
    pointName() {
      return utils.getColumnByIndex(0, this.tableData)
    },
    trend() {
      return utils.getColumnByIndex(9, this.tableData)
    },
    // tableData() {
    //   return this.$store.getters['FiveForceModel/tableData']
    // },
    data() {
      return this.$store.getters['FiveForceModel/modelData']
    },
    chartData() {
      let result = []
      if (this.tableData.length && this.pointName) {
        for (let index of this.list) {
          for (let item of this.tableData) {
            if (item[this.pointName] === index) {
              result.push(item)
            }
          }
        }
        return result
      }
      return null
    }
    // date1() {
    //   return this.$store.state.FiveForceModel.curDate
    // }
  }
}
</script>
<style lang="scss" scoped>
.icon-arrow {
  display: flex;
  align-items: center;
  &.up {
    transform: rotate(0deg);
    color: #14d7b1;
  }
  &.down {
    transform: rotate(180deg);
    color: #fe5545;
  }
  &.right {
    transform: rotate(90deg);
    color: orange;
  }
}

.line_stlya {
  display: flex;
  position: relative;
  width: 8vw;
  min-width: 25px;
  // max-width: 100px;
  .icon-arrow2 {
    position: relative;
    left: -2px;
    font-size: 28px;
    height: 28px;
    color: #e0e0e0;
    transform: rotate(180deg);
    align-items: flex-start;
  }
  .line {
    position: relative;
    height: 11px;
    top: 9px;

    flex-grow: 2;
    background: #e0e0e0;
    display: block;
  }
}

.line_stlyc {
  display: flex;
  height: 11px;
  top: 9px;
  width: 8vw;
  min-width: 25px;
  // max-width: 100px;
  background: #e0e0e0;
  display: block;
}

.line_stlyd {
  display: flex;
  height: 11px;
  top: 9px;
  width: 15vw;
  // max-width: 198px;
  min-width: 75px;
  background: #e0e0e0;
  display: block;
}

.line-style {
  height: 11px;
  background: #e0e0e0;
}

.line_stlyb {
  display: flex;
  position: relative;
  height: 50px;
  width: 5vw;
  // min-width: 25px;
  // max-width: 70px;
  .line {
    position: relative;
    height: 11px;
    top: 9px;
    flex-grow: 2;
    background: #e0e0e0;
    display: block;
  }
  .down {
    display: flex;
    flex-direction: column;
    .line {
      flex-grow: 2;
      width: 12px;
    }
    .icon-arrow2 {
      position: relative;
      left: -8px;
      font-size: 28px;
      color: #e0e0e0;
      transform: rotate(270deg);
    }
  }
}

.line-4 {
  margin-left: 130px !important;
}

.line-5 {
  margin-left: 210px !important;
}

.width-b {
  min-width: 25px;
  max-width: 70px;
  width: 5vw;
}

.width-fixed {
  width: 130px;
}

.width-fixed-5 {
  width: 210px;
}

.icon-cha {
  font-size: 18px;
  color: rgb(224, 224, 224);
  position: absolute;
  &.plus.a {
    left: -36px;
    top: 50%;
    margin-top: -9px;
    transform: rotate(45deg);
  }
  &.b {
    left: 50%;
    bottom: -31px;
    font-size: 22px;
    margin-left: -11px;
  }
}

.five-force-pic {
  width: 100%;
  position: relative;
  padding: 0;
  min-height: 500px;
  margin: 0 5vw 0;
  .column {
    position: absolute;
    width: 15vw;
    height: 500px;
    &.first-col {
      left: 0;
    }
    &.second-col {
      left: 20vw;
    }
    &.third-col {
      left: 40vw;
    }
    &.four-col {
      left: 60vw;
    }
    .column-row-item {
      width: 100%;
      height: 100px;
      position: absolute;
      box-sizing: border-box;
      box-shadow: 1px -1px 10px 1px rgba(0, 0, 0, 0.3);
      // display: flex;
      // justify-content: space-around;
      line-height: 30px;
      align-items: center;
      flex-direction: column;
      text-align: center;
      padding: 5px;
      &.one-row {
        top: 0;
        background-color: #dde7f2;
        border: 1px solid #ccdced;
      }
      &.two-row {
        top: 120px;
        background-color: #dde7f2;
        border: 1px solid #ccdced;
      }
      &.three-row {
        top: 240px;
        background-color: #dde7f2;
        border: 1px solid #ccdced;
      }
      &.four-row {
        top: 360px;
        background-color: #dde7f2;
        border: 1px solid #ccdced;
      }
      &.five-row {
        top: 0;
        background-color: #ebfae2;
        border: 1px solid #dbecd0;
      }
      &.six-row {
        top: 120px;
        background-color: #ebfae2;
        border: 1px solid #dbecd0;
      }
      &.seven-row {
        top: 60px;
        background-color: #ebfae2;
        border: 1px solid #dbecd0;
      }
      &.eight-row {
        top: 240px;
        background-color: #ebfae2;
        border: 1px solid #dbecd0;
      }
      &.nine-row {
        top: 360px;
        background-color: #fbc1bc;
        border: 1px solid #fbaea8;
      }
      .first-text {
        font-size: 14px;
        margin: 10px 0 6px 0;
      }
      .second-text {
        font-size: 14px;
        margin: 6px 0 10px 0;
        display: flex;
        justify-content: space-around;
        span {
          display: flex;
        }
      }
    }
  }

  .one-arrow {
    position: absolute;
    left: 15vw;
    top: 35px;
    .line_stlya {
      width: 5vw;
    }
  }
  .two-arrow {
    position: absolute;
    left: 15vw;
    top: 155px;
    .line_stlya {
      width: 5vw;
    }
  }
  .three-arrow {
    position: absolute;
    left: 15vw;
    top: 275px;
    .line_stlya {
      width: 45vw;
    }
  }
  .four-arrow {
    position: absolute;
    left: 15vw;
    top: 395px;
    .line_stlya {
      width: 45vw;
    }
  }
  .five-arrow {
    position: absolute;
    left: 35vw;
    top: 60px;
    .line_stlya {
      width: 5vw;
    }
  }
  .six-arrow {
    position: absolute;
    left: 35vw;
    top: 130px;
    .line_stlya {
      width: 5vw;
    }
  }
  .seven-arrow {
    position: absolute;
    left: 55vw;
    top: 95px;
    .line_stlyb {
      width: 14vw;
      height: 15vh;
    }
  }
  .eight-arrow {
    position: absolute;
    left: 67.5vw;
    top: 340px;
    .line_stlyb {
      width: 5vw;
      height: 1vh;
      .icon-arrow2 {
        font-size: 20px;
      }
    }
  }
}
</style>
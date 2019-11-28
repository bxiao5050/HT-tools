<template>
  <div class="card-box">
    <card>
      <div slot="header">{{$t('fiveForce.fiveForceDetail')}}</div>
      <div slot="body" class="five-force-pic">
        <div class="body" v-if="data">
          <div class="lines combine">
            <div class="ll">
              <div class="lines">
                <div class="item">
                  <span>{{data[13]['pointertype_name']}}</span>
                  <span>{{data[13][date1]}}</span>
                  <span><i class="icon-arrow" :class="data[13][trend]*1===0?'right':data[13][trend]*1>0?'up':'down'"></i>{{data[13][trend]}}%</span>
                </div>
                <div class="line_stlya">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
                <div class="item">
                  <span>{{data[14]['pointertype_name']}}</span>
                  <span>{{data[14][date1]}}</span>
                  <span><i class="icon-arrow" :class="data[14][trend]*1===0?'right':data[14][trend]*1>0?'up':'down'"></i>{{data[14][trend]}}%</span>
                </div>
                <div class="line_stlya" style="margin-top:45px">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
              </div>
              <div class="lines">
                <div class="item">
                  <span>{{data[27]['pointertype_name']}}</span>
                  <span>{{data[27][date1]}}</span>
                  <span><i class="icon-arrow" :class="data[27][trend]*1===0?'right':data[27][trend]*1>0?'up':'down'"></i>{{data[27][trend]}}%</span>
                </div>
                <div class="line_stlya">
                  <i class="line"></i>
                  <i class="icon-arrow2"></i>
                </div>
                <div class="item">
                  <span>{{data[20]['pointertype_name']}}</span>
                  <span>{{data[20][date1]}}</span>
                  <span><i class="icon-arrow" :class="data[20][trend]*1===0?'right':data[20][trend]*1>0?'up':'down'"></i>{{data[20][trend]}}%</span>
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
                <span>{{data[6]['pointertype_name']}}</span>
                <span>{{data[6][date1]}}</span>
                <span><i class="icon-arrow" :class="data[6][trend]*1===0?'right':data[6][trend]*1>0?'up':'down'"></i>{{data[6][trend]}}%</span>
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

          <!--line-3-->
          <div class="lines">
            <div class="item">
              <span>{{data[5]['pointertype_name']}}</span>
              <span>{{data[5][date1]}}</span>
              <span><i class="icon-arrow" :class="data[5][trend]*1===0?'right':data[5][trend]*1>0?'up':'down'"></i>{{data[5][trend]}}%</span>
            </div>
            <div class="line_stlyc"></div>
            <div class="line_stlyd"></div>

            <div class="line_stlya">
              <i class="line"></i>
              <i class="icon-arrow2"></i>
            </div>

            <div class="item">
              <span>{{data[4]['pointertype_name']}}</span>
              <span>{{data[4][date1]}}</span>
              <span><i class="icon-arrow" :class="data[4][trend]*1===0?'right':data[4][trend]*1>0?'up':'down'"></i>{{data[4][trend]}}%</span>
            </div>

            <div class="width-b"></div>
          </div>

          <!--line-4-->
          <div class="lines line-4">
            <div class="item">
              <span>{{data[8]['pointertype_name']}}</span>
              <span>{{data[8][date1]}}</span>
              <span><i class="icon-arrow" :class="data[8][trend]*1===0?'right':data[8][trend]*1>0?'up':'down'"></i>{{data[8][trend]}}%</span>
            </div>
            <div class="line_stlyc"></div>
            <div class="line_stlyd"></div>
            <div class="line-style width-fixed"></div>

            <div class="line_stlya">
              <i class="line"></i>
              <i class="icon-arrow2"></i>
            </div>

            <div class="item">
              <span>{{data[2]['pointertype_name']}}</span>
              <span>{{data[2][date1]}}</span>
              <span><i class="icon-arrow" :class="data[2][trend]*1===0?'right':data[2][trend]*1>0?'up':'down'"></i>{{data[2][trend]}}%</span>
            </div>

            <div class="line_stlyb" style="height:70px;margin-top:35px">
              <i class="line"></i>
              <div class="down">
                <i class="line"></i>
                <i class="icon-arrow2"></i>
              </div>
            </div>

          </div>

          <!--line-5-->
          <div class="lines line-5">
            <div class="item">
              <span>{{data[9]['pointertype_name']}}</span>
              <span>{{data[9][date1]}}</span>
              <span><i class="icon-arrow" :class="data[9][trend]*1===0?'right':data[9][trend]*1>0?'up':'down'"></i>{{data[9][trend]}}%</span>
            </div>
            <div class="line_stlyc"></div>
            <div class="line_stlyd"></div>

            <div class="width-b line-style"></div>
            <div class="line-style width-fixed-5"></div>

            <div class="line_stlya">
              <i class="line"></i>
              <i class="icon-arrow2"></i>
            </div>

            <div class="item">
              <span>{{data[1]['pointertype_name']}}</span>
              <span>{{data[1][date1]}}</span>
              <span><i class="icon-arrow" :class="data[1][trend]*1===0?'right':data[1][trend]*1>0?'up':'down'"></i>{{data[1][trend]}}%</span>
            </div>

          </div>

        </div>
      </div>
    </card>
  </div>
</template>
<script>
  import card from 'src/components/card.vue'
  export default {
    props:['date1','tableData'],
    components: {
      card
    },
    computed: {
      trend(){
        return utils.getColumnByIndex(10,this.tableData)
      },
      // tableData() {
      //   return this.$store.getters['FiveForceModel/tableData'];
      // },
      data() {
        return this.$store.getters['FiveForceModel/modelData']
      },
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
      color: #14D7B1;
    }
    &.down {
      transform: rotate(180deg);
      color: #FE5545;
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
    max-width: 100px;
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
    max-width: 100px;
    background: #e0e0e0;
    display: block;
  }

  .line_stlyd {
    display: flex;
    height: 11px;
    top: 9px;
    width: 15vw;
    max-width: 198px;
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
    min-width: 25px;
    max-width: 70px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding:10px;
    .body {
      width: 90%; // overflow: hidden;
      margin-left: -207px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .lines {
        height: 80px; // width: 100%;
        margin: 8px 0;
        display: flex;
        align-items: center;
        .item {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          width: 15vw;
          max-width: 198px;
          min-width: 75px;
          // border: 1px solid #DDE7F2;
          margin-right: 3px;
          box-shadow: 1px -1px 10px 1px rgba(0, 0, 0, 0.3);
          &:nth-child(1){
            background-color:#DDE7F2;
            border:1px solid #CCDCED;
          }
          &:nth-child(2),&:nth-child(3),&:nth-child(5){
            background-color:#EBFAE2;
            border:1px solid #DBECD0;
          }
          &:nth-child(6){
            background-color:#FFEFE7;
            border: 1px solid #F6E3DA;
          }
          &:nth-child(7){
            background-color:#FBC1BC;
            border: 1px solid #FBAEA8;
          }
          span {
            font-size: 14px;
            display: flex;
            width: 40%;
            justify-content: center;
            align-items: center;
            margin: 0 0 6px 0;
            &:first-child {
              width: 100%;
              margin: 6px 0 0 0;
            }
            &:nth-child(3) {
              width: 60%;
            }
          }
        }
        &.combine {
          display: flex;
          flex-direction: row;
          height: 100%;
          .ll {
            display: flex;
            flex-direction: column;
          }
          .lr {
            position: relative;
            height: 80px;
            display: flex;
            flex-direction: row;

            .line_stlyb {
              margin-top: 25px;
              width: 5vw;
            }
          }
        }
      }
    }
  }
</style>
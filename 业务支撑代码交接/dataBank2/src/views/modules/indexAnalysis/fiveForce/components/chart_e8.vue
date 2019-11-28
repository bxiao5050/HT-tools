<template>
  <div class="card-box">
    <card>
      <div slot="header">五力指标详解</div>
      <div slot="body" class="five-force-pic">
        <div class="body" v-if="data">
          <div class="area">
            <div class="item">
              <span class="item-pointer">{{data[13]['pointertype_name']}}</span>
              <span>{{data[13][date1]}}</span>
              <span><i class="icon-arrow" :class="data[13]['trend']*1===0?'right':data[13]['trend']*1>0?'up':'down'"></i>{{data[13]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[27]['pointertype_name']}}</span>
              <span>{{data[27][date1]}}</span>
              <span><i class="icon-arrow" :class="data[27]['trend']*1===0?'right':data[27]['trend']*1>0?'up':'down'"></i>{{data[27]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[38]['pointertype_name']}}</span>
              <span>{{data[38][date1]}}</span>
              <span><i class="icon-arrow" :class="data[38]['trend']*1===0?'right':data[38]['trend']*1>0?'up':'down'"></i>{{data[38]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[8]['pointertype_name']}}</span>
              <span>{{data[8][date1]}}</span>
              <span><i class="icon-arrow" :class="data[8]['trend']*1===0?'right':data[8]['trend']*1>0?'up':'down'"></i>{{data[8]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[9]['pointertype_name']}}</span>
              <span>{{data[9][date1]}}</span>
              <span><i class="icon-arrow" :class="data[9]['trend']*1===0?'right':data[9]['trend']*1>0?'up':'down'"></i>{{data[9]['trend']}}%</span>
            </div>
          </div>
          <div class="area lines">
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
          </div>
          <div class="area">
            <div class="item">
              <span class="item-pointer">{{data[14]['pointertype_name']}}</span>
              <span>{{data[14][date1]}}</span>
              <span><i class="icon-arrow" :class="data[14]['trend']*1===0?'right':data[14]['trend']*1>0?'up':'down'"></i>{{data[14]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[20]['pointertype_name']}}</span>
              <span>{{data[20][date1]}}</span>
              <span><i class="icon-arrow" :class="data[20]['trend']*1===0?'right':data[20]['trend']*1>0?'up':'down'"></i>{{data[20]['trend']}}%</span>
            </div>
            <div class="item">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>
          <div class="area lines">
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
            <div class="item">
              <div class="line"></div>
            </div>
          </div>
          <div class="area">
            <div class="item">
              <span class="item-pointer">{{data[6]['pointertype_name']}}</span>
              <span>{{data[6][date1]}}</span>
              <span><i class="icon-arrow" :class="data[6]['trend']*1===0?'right':data[6]['trend']*1>0?'up':'down'"></i>{{data[6]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[39]['pointertype_name']}}</span>
              <span>{{data[39][date1]}}</span>
              <span><i class="icon-arrow" :class="data[39]['trend']*1===0?'right':data[39]['trend']*1>0?'up':'down'"></i>{{data[39]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[2]['pointertype_name']}}</span>
              <span>{{data[2][date1]}}</span>
              <span><i class="icon-arrow" :class="data[2]['trend']*1===0?'right':data[2]['trend']*1>0?'up':'down'"></i>{{data[2]['trend']}}%</span>
            </div>
            <div class="item">
              <span class="item-pointer">{{data[1]['pointertype_name']}}</span>
              <span>{{data[1][date1]}}</span>
              <span><i class="icon-arrow" :class="data[1]['trend']*1===0?'right':data[1]['trend']*1>0?'up':'down'"></i>{{data[1]['trend']}}%</span>
            </div>
          </div>
        </div>

        <!--<div class="five-force-pic-body">
                                                                    
          <div class="five-force-pic">
            <div class="data-item" :class="'item-'+index" v-for="(item,index) in 11">
              <div class="item-header">日注册用户数</div>
              <div class="item-content">
                <div class="content-left">486</div>
                <div class="content-right">-22.24%</div>
              </div>
            </div>
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
            <div class="line line-4"></div>
            <div class="line line-5"></div>
            <div class="line line-6"></div>
            <div class="line line-7"></div>
          </div>
        </div>-->
      </div>
    </card>
  </div>
</template>
<script>
  import card from 'src/components/card.vue'
  export default {
    components: {
      card
    },
    computed: {
      data() {
        return this.$store.getters['FiveForceModel/modelData']
      },
      date1() {
        return this.$store.state.FiveForceModel.curDate
      }
    }
  }

</script>
<style lang="scss" scoped>
  .icon-arrow {
    display: flex;
    align-items: center;
    &.up {
      transform: rotate(0deg);
      color: skyblue;
    }
    &.down {
      transform: rotate(180deg);
      color: red;
    }
    &.right {
      transform: rotate(90deg);
      color: orange;
    }
  }

  .five-force-pic {
    width: 100%;
    display: flex;
    justify-content: center;
    padding:10px;
    .body {
      width: 88%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .area {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 15vw;
        max-width: 250px;
        min-width: 155px;
        height: 450px;
        justify-content: space-around;
        .item {
          width: 100%;
          height: 80px;
          border: 1px solid #fc9153;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          span {
            font-size: 14px;
            display: flex;
            width: 50%;
            justify-content: center;
            margin: 0 0 6px 0;
            &:first-child {
              width: 100%;
              margin: 6px 0 0 0;
            }
          }
          .item-pointer{
            // font-weight:bold;
          }
        }
        &:nth-child(3) {
          .item:last-child {
            height: 260px;
            position: relative;
            border: 0;
            display: flex;
            flex-direction: column;
            .line {
              height: 10px;
              width: 100%;
              background: #eee;
              margin-top: 80px;
              &:first-child {
                margin-top: 35px;
              }
            }
          }
        }
        &:last-child {
          .item:first-child {
            height: 141px;
            margin: 15px 0;
          }
        }
        &.lines {
          width: 15vw;
          max-width: 145px;
          min-width: 40px;
          .item {
            border: 0;
            display: flex;
            align-items: center;
            .line {
              height: 10px;
              width: 100%;
              background: #eee;
            }
          }
        }
      }
    } // .five-force-pic {
    //   height: 400px;
    //   padding-right: 0;
    //   padding-left: 0;
    //   width: 94%;
    //   position: relative;
    //   .data-item {
    //     background-color: #EEE;
    //     border: 1px solid #bbb;
    //     width: 20%;
    //     min-width: 184px;
    //     max-width: 250px;
    //     position: absolute;
    //     text-align: center;
    //     padding: 5px;
    //     line-height: 25px;
    //     height: 70px;
    //     display: -webkit-box;
    //     -webkit-box-orient: vertical;
    //     -webkit-box-align: center;
    //     -webkit-box-pack: center;
    //     /*.item-header {}*/
    //     .item-content {
    //       width: 100%;
    //       padding: 10px 0;
    //       .content-left {
    //         float: left;
    //         width: 50%;
    //       }
    //       .content-right {
    //         float: left;
    //         width: 50%;
    //       }
    //     }
    //   }
    //   .item-0 {
    //     top: 1%;
    //   }
    //   .item-1 {
    //     top: 20%;
    //   }
    //   .item-2 {
    //     top: 40%;
    //   }
    //   .item-3 {
    //     top: 60%;
    //   }
    //   .item-4 {
    //     top: 80%;
    //   }
    //   .item-5 {
    //     top: 1%;
    //     left: 35%;
    //   }
    //   .item-6 {
    //     top: 20%;
    //     left: 35%;
    //   }
    //   .item-7 {
    //     top: 4%;
    //     left: 70%;
    //     height: 130px;
    //   }
    //   .item-8 {
    //     top: 40%;
    //     left: 70%;
    //   }
    //   .item-9 {
    //     top: 60%;
    //     left: 70%;
    //   }
    //   .item-10 {
    //     top: 80%;
    //     left: 70%;
    //   }
    //   .line {
    //     height: 10px;
    //     background-color: #eee;
    //     position: absolute;
    //   }
    //   .line-1 {
    //     width: 19%;
    //     top: 9%;
    //     left: 16%;
    //   }
    //   .line-2 {
    //     width: 19%;
    //     top: 9%;
    //     left: 51%;
    //   }
    //   .line-3 {
    //     width: 19%;
    //     top: 27%;
    //     left: 16%;
    //   }
    //   .line-4 {
    //     width: 19%;
    //     top: 27%;
    //     left: 51%;
    //   }
    //   .line-5 {
    //     width: 54%;
    //     top: 48%;
    //     left: 16%;
    //   }
    //   .line-6 {
    //     width: 54%;
    //     top: 68%;
    //     left: 16%;
    //   }
    //   .line-7 {
    //     width: 54%;
    //     top: 88%;
    //     left: 16%;
    //   }
    // }
  }
</style>
<template>
  <div>
    <div id="mail-creation-wrap">
      11111
    </div>
    <div id="mail-creation-wrap2">
    </div>
  </div>
</template>


<script>

import html2canvas from 'html2canvas';
import http from 'src/services/http'

const appArr = [56, 52, 48, 47, 46, 43, 41, 38, 36, 34, 33, 19]
export default {
  props: ['date'],
  watch: {
    date(newDate) {
      var pickDate = new Date(newDate)
      var pickYear = pickDate.getFullYear()
      var pickMonth = pickDate.getMonth()
      var promise1 = new Promise(resolve => {
        if (!this.$store.getters['o_c_budget/getData']) {
          this.$store.dispatch('o_c_budget/getData', { count_date: `${pickYear}-${pickMonth}-01` }).then(data => {
            resolve((() => {
              var obj = {}
              data.state[0].forEach(item => {
                obj[String.prototype.trim.call(item['游戏名'])] = item.costs
              });
              return obj
            })())
          })
        } else {
          resolve((() => {
            var obj = {}
            this.$store.getters['o_c_budget/getData'].forEach(item => {
              obj[String.prototype.trim.call(item['游戏名'])] = item.costs
            });
            return obj
          })())
        }
      })

      var dateBegin = new Date
      dateBegin.setTime(pickDate.getTime() - 3600 * 1000 * 24 * 29)
      dateBegin = moment(dateBegin).format("YYYY-MM-DD")

      appArr.forEach(gameId => {
        console.log(gameId, dateBegin)

        var params = {
          querytype: 3,
          begin_date: dateBegin,
          end_date: newDate,
          os: '0,1',
          gameIds: gameId,
          media_source: '',
          country: ''
        }

        var url = '/query/fn_report_data_advertise'
        http.post(url, params).then(data => {
          console.log(data)
        })

      })
      // this.createMail()
    }
  },
  methods: {
    createMail() {
      var wrap = document.querySelector('#mail-creation-wrap')
      html2canvas(wrap).then(function (canvas) {

        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        document.getElementById('mail-creation-wrap2').html = ''
        document.getElementById('mail-creation-wrap2').appendChild(image)
      })
      console.log('createMail')
    }
  }
}
</script>

<style lang="scss">
#mail-creation-wrap {
  position: fixed;
  background: #000;
  width: 50%;
  height: 50%;
  left: 0;
  top: 50%;
  z-index: 9999;
  color: #fff;
}
#mail-creation-wrap2 {
  position: fixed;
  background: #000;
  width: 50%;
  height: 50%;
  right: 0;
  top: 50%;
  z-index: 9999;
  color: #fff;
}
</style>


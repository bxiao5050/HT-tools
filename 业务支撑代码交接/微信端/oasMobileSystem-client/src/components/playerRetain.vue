<template>
    <div>
        <date-picker :date="date" :dateChange="dateChange"></date-picker>

        <div id="playerRetainChart"></div>
    </div>
</template>
<script>
    import nvDatePicker from './range-datepicker-common.vue'
    import httpRequest from '../utils/httpRequest.js'
    import highchartUtil from '../utils/highchartUtil.js'
    import { Toast } from 'mint-ui'
    export default {
        components: { 'date-picker': nvDatePicker },
        data: function () {
            return {
                date1: window.moment().add(-7, "days").format("YYYY-MM-DD"),
                date2: window.moment().add(-1, "days").format("YYYY-MM-DD"),
                chartData: null,
            }
        },
        computed: {
            date: function () {
                var obj = {
                    startTime: this.date1,
                    endTime: this.date2
                }
                return obj;
            },
        },
        methods: {
            dateChange: function (newDate) {
                this.date1 = newDate.startTime;
                this.date2 = newDate.endTime;
                this.query();
            },
            query: function () {
                var param = {
                    date1: this.date1,
                    date2: this.date2
                }
                httpRequest.getGameGKPlayerRetainData(param, (data) => {
                    if (data.state == "successed") {
                        this.chartData = data.result[0];
                        this.drawChart();
                    }
                    else {
                        Toast(data.result.errorMsg);
                    }
                })
            },
            drawChart: function () {
                var data = this.chartData;
                if (data) {
                    var categories = [];
                    for (var i = 0; i < data.length; i++) {
                        categories.push(data[i].list);
                    }
                    var chartData = [];
                    for (var index in data[0]) {
                        if (index != "list") {
                            var obj = {
                                name: index,
                                data: [],
                                tooltip: {
                                    valueSuffix: "%"
                                }
                            };
                            for (var i = 0; i < data.length; i++) {
                                obj.data.push(data[i][index]);
                            }
                            chartData.push(obj);
                        }
                    }
                    highchartUtil.drawLineChart('playerRetainChart', categories, chartData,true);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
#playerRetainChart{
    width:100%;
    height:auto;
}
</style>
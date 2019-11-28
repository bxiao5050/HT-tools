<template>
  <div>
    <div class="fastGroup">
      <div class="fastSelecter">
        <v-touch tag="div" class="fast-item" :class="{now:selectedtype==index}" v-for="(item,index) in catagoryTitle"  v-on:tap="catagoryChanged(index)">{{item}}</v-touch>
      </div>
    </div>
    <div id="switchChart"></div>
  </div>
</template>
<script>
  import Highcharts from 'highcharts'
  export default {
    props: [ 'chartData','catagoryName','stackName','catagoryTitle'],
    data:function() {
        return {
          catagory:[],
          stackTitle:[],
          current:[],
          selectedtype:0
        };
    },
    mounted:function () {
        if(this.selectedtype) this.selectedtype = 0;
        var result = this.getCatagory();
        this.stackTitle = result.stack;
        this.catagory = result.catagory;
    },
    methods:{
      drawChart:function(){
         var chart =  new Highcharts.Chart(
            {
              chart: {
                renderTo: 'switchChart',
                type: 'column'
              },
              credits: {
                enabled: false
              },
              title: {
                text: this.catagoryTitle[this.selectedtype]
              },
              xAxis: {
                categories: this.catagory.map(item=>item.name),
              },
              yAxis: {
                min: 0,
                title: {
                  text: this.catagoryTitle[this.selectedtype]
                },
                stackLabels: {
                  enabled: false
                }
              },
              legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
              },
              tooltip: {
                formatter: function () {
                  return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    '总量: ' + this.point.stackTotal;
                }
              },
              plotOptions: {
                column: {
                  stacking: 'normal'
                },
                marker: {
                  enabled: false
                }
              },
              series:this.current});
        },
       catagoryChanged:function(index){
            this.selectedtype = index;
      },
      getCatagory:function () {
        var result = [];
        var stackTitle = [];
        var catagoryName = this.catagoryName;
        var stackName = this.stackName;
        this.chartData.forEach((ti)=>{
          if(ti[catagoryName] == undefined) return;
          if(stackTitle.findIndex(item=>item == ti[stackName]) == -1)
            stackTitle.push(ti[stackName]);
          var ci = result.find(item => item.name == ti[catagoryName]);
          if(ci){
            ci.series.push(ti);
          }else{
            result.push({name:ti[catagoryName],series:[ti]});
          }
        });

        var model = {
          catagory:result,
          stack:stackTitle
        };
        return model;
      },
      getCurrentData:function (newValue) {
        var catagory = this.catagory;
        var stackName = this.stackName;
        var catagoryName = this.catagoryTitle[newValue];
        var result = [];
        this.stackTitle.forEach(function (stackItem) {
          var stackResult = {name:stackItem,data:[]};
          catagory.forEach(function (catagoryItem) {
            catagoryItem.series.forEach(function (dataItem) {
              if(dataItem[stackName] == stackItem)
                stackResult.data.push(Number(dataItem[catagoryName]));
            });
          });
          result.push(stackResult);
        });
        return result;
      }
    },
    watch:{
      chartData:function(newValue) {
        //获取catagory
        var result = this.getCatagory();
        this.stackTitle = result.stack;
        this.catagory = result.catagory;
        this.current =  this.getCurrentData(this.selectedtype);
      },
      selectedtype:function (newValue) {
          this.current = this.getCurrentData(newValue);
      },
      current:function () {
          this.drawChart();
      }
    }
  };
</script>

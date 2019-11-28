<template>
	<section id="ss-data">
		<div class="content-header">
			<moduleHeader :isShowReg="true" :dateList="dateList"></moduleHeader>
		</div>
		<div class="content-body">
			<card>
				<div slot="header">{{$t('common.IndexKey')}}</div>
				<div slot="body">
					<div class="key-index-group">
						<div class="key-index-item">
							<div class="item-top">{{$t('onlineData.PayUser')}}</div>
							<div class="item-middle">3301
								<span class="item-add-rate">+156.2</span>
							</div>
							<div class="item-bottom">{{$t('onlineData.Day')}} 1.10%</div>
						</div>
						<div class="key-index-item">
							<div class="item-top">{{$t('onlineData.PayMoney')}}</div>
							<div class="item-middle">3301
								<span class="item-add-rate">+156.2</span>
							</div>
							<div class="item-bottom">{{$t('onlineData.Day')}} 1.10%</div>
						</div>
						<div class="key-index-item">
							<div class="item-top">{{$t('onlineData.RegUserNew')}}</div>
							<div class="item-middle">3301
								<span class="item-add-rate">+156.2</span>
							</div>
							<div class="item-bottom">{{$t('onlineData.Day')}} 1.10%</div>
						</div>
						<div class="key-index-item">
							<div class="item-top">{{$t('onlineData.CreateRoles')}}</div>
							<div class="item-middle">3301
								<span class="item-add-rate">+156.2</span>
							</div>
							<div class="item-bottom">{{$t('onlineData.Day')}} 1.10%</div>
						</div>
					</div>
				</div>
			</card>
			<card>
				<div slot="header">
					<div class="card-header-title">{{$t('onlineData.HourData')}}</div>
					<div class="tabs">
						<div class="tab-item" :class="{'active':type==1}" @click="type=1">{{$t('onlineData.PayMoney')}}</div>
						<div class="tab-item" :class="{'active':type==2}" @click="type=2">{{$t('onlineData.PayUser')}}</div>
						<div class="tab-item" :class="{'active':type==3}" @click="type=3">{{$t('onlineData.RegUserNew')}}</div>
						<div class="tab-item" :class="{'active':type==4}" @click="type=4">{{$t('onlineData.CreateRoles')}}</div>
						<div class="tab-item" :class="{'active':type==5}" @click="type=5">{{$t('onlineData.PayArpu')}}</div>
					</div>
				</div>
				<div slot="body">
					<div id="hourChart"></div>
				</div>
			</card>
			<card>
				<div slot="header">详细数据</div>
				<div slot="body">
					<div class="table-content">
						<normalTable :tableData="detailData"></normalTable>
					</div>
				</div>

			</card>
		</div>
		<div class="online-time">
			<i class="icon-time"></i>
			<span class="time-text">当前时间:{{nowTime}}</span>
		</div>
	</section>
</template>

<script>
import moduleHeader from 'modules/module-header.vue'
import trigger from 'modules/channel/register/components/trigger'
import card from 'src/components/card.vue'
import api from 'src/services/api'
import normalTable from 'src/components/normal-table.vue'
export default {
	name: 'online-data',
	components: {
		card, moduleHeader, trigger, normalTable
	},
	data() {
		return {
			date1: moment().format("YYYY-MM-DD"),
			nowTime: '',
			type: 1,

			payMoneyData: [],
			payCountData: [],
			regCountData: [],
			roleCountData: [],
			payARPUData: [],
			detailData: [],

			columnData: [],//表格列名数组
		}
	},
	computed: {
		dateList() {
			return [
				{
					single: true,
					uid: 'date1',
					label: this.$t('common.Date'),
					startDate: this.date1,
					endDate: '',
					change: (newDate) => { this.date1 = newDate.startDate; this.query(); }
				}]
		}
	},
	mounted() {
		window.timeInterval = setInterval(() => { this.getDateTime() }, 1000)
		this.getDateTime()
		this.query();
	},
	beforeDestroy() {
		clearInterval(window.timeInterval);
	},
	methods: {
		getDateTime() {
			this.nowTime = moment().format("HH:mm:ss")
		},
		query() {
			this.getPayMoney()//获取付费金额
			this.getPayCount()//获取付费用户数
			this.getRegCount()//获取注册用户数
			this.getRoleCount()//获取创角用户数
			this.getPayARPU()//获取付费ARPU
			this.getDetailData()//获取详细信息
		},
		getPayMoney() {
			this.getQuery(1).then((data) => {
				if (data.code == 401) {
					this.payMoneyData = data.state[0];
					if (this.type == 1) {
						this.drawChart(this.payMoneyData)
					}
				}
				else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			})
		},
		getPayCount() {
			this.getQuery(2).then((data) => {
				if (data.code == 401) {
					this.payCountData = data.state[0];
					if (this.type == 2) {
						this.drawChart(this.payCountData)
					}
				}
				else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			})
		},
		getRegCount() {
			this.getQuery(3).then((data) => {
				if (data.code == 401) {
					this.regCountData = data.state[0];
					if (this.type == 3) {
						this.drawChart(this.regCountData)
					}
				}
				else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			})
		},
		getRoleCount() {
			this.getQuery(4).then((data) => {
				if (data.code == 401) {
					this.roleCountData = data.state[0];
					if (this.type == 4) {
						this.drawChart(this.roleCountData)
					}
				}
				else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			})
		},
		getPayARPU() {
			this.getQuery(5).then((data) => {
				if (data.code == 401) {
					this.payARPUData = data.state[0];
					if (this.type == 5) {
						this.drawChart(this.payARPUData)
					}
				}
				else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			})
		},
		getDetailData() {
			this.getQuery(6).then((data) => {
				if (data.code == 401) {
					this.detailData = data.state[0];

					this.columnData = data.state[1];
				}
				else {
					Utils.Notification.error({ message: data.message });
					console.error(data.message);
				}
			})
		},
		getQuery(select_type) {
			var params = {
				isCache: 1,
				in_date1: this.date1,
				in_date2: moment(this.date1).add(-1, 'day').format('YYYY-MM-DD'),
				in_date3: moment(this.date1).add(-7, 'day').format('YYYY-MM-DD'),
				dataview: this.$store.state.common.nowmenu.dataView,
				in_gamezoneid: this.$store.getters['Agent/selectedIdList'],
				in_regchannel: this.$store.getters['RegChannel/selectedIdList'],
				in_platform: '1,2',
				select_type: select_type
			}
			return api.user.getQuery(params)
		},
		drawChart(data) {
			var chartData = data.reverse()
			var date1 = this.date1;
			var date2 = moment(this.date1).add(-1, 'day').format('YYYY-MM-DD');
			var date3 = moment(this.date1).add(-7, 'day').format('YYYY-MM-DD')

			var dateList = [date1, date2, date3];
			var categories = [];
			var seriesData = []
			data.map((item) => {
				categories.push(item.count_time);
			})
			dateList.forEach((date) => {
				seriesData.push({
					name: date,
					data: (() => {
						let array = []
						data.map((item) => {
							array.push(item[date] * 1)
						})
						return array
					})(),
					max: 0				})
			})
			highchartUtil.drawFiveMinLine('hourChart', categories, seriesData)
		}
	},
	watch: {
		type(v, ov) {
			if (v != ov) {
				if (v == 1) {
					this.getPayMoney()//获取付费金额
				}
				else if (v == 2) {
					this.getPayCount()//获取付费用户数
				}
				else if (v == 3) {
					this.getRegCount()//获取注册用户数
				}
				else if (v == 4) {
					this.getRoleCount()//获取创角用户数
				}
				else if (v == 5) {
					this.getPayARPU()//获取付费ARPU
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.key-index-group {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  line-height: 40px;
  .key-index-item {
    -webkit-box-flex: 1;
    border-right: 1px solid #bbb;
    text-align: center;
    .item-top {
    }
    .item-middle {
      font-weight: bold;
      vertical-align: middle;
      .item-add-rate {
        font-size: 12px;
        font-weight: 200;
        color: red;
        vertical-align: super;
      }
    }
    .item-bottom {
    }
  }
  .key-index-item:last-child {
    border: 0;
  }
}
.online-time {
  position: fixed;
  right: 0;
  top: 30%;
  padding: 5px 10px;
  line-height: 30px;
  background-color: #00a65a;
  color: #fff;
  font-weight: bold;
  white-space: nowrap;
  .time-text {
    display: none;
  }
  &:hover {
    .time-text {
      display: inline-block;
    }
  }
}
</style>
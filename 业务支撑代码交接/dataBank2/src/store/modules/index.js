// import agent from './agent'
// import channel from './channel'
import power from './power'

import aside from './aside'
import common from './common'
import layout from './layout'

import {
  Login,
  Common,
  RegChannel,
  Agent,
  PayChannel,
  OS
} from './System'
import {
  FiveForceModel
} from './UserAnalysis'
import {
  NewServerMonitor
} from './OperationMonitoring'
import {
  ChargeHotList,
  BigCustomerTrend
} from './MarketingAnalysis'

import o_r_delivery from './overseas-reports/delivery'
import o_c_complement from './overseas-configuration/complement'
import o_c_budget from './overseas-configuration/budget'
import o_c_pkg_manager from './overseas-configuration/pkg_manager'
import overseas_common from './overseas-common'
import o_s_c_reports from './overseas-sub-channel/reports'

export default {
  // agent,
  // channel,
  aside,
  common,
  layout,
  power,
  // System
  // Language,
  Login,
  Common,
  RegChannel,
  PayChannel,
  Agent,
  OS,

  // UserAnalysis
  FiveForceModel,
  // OperationMonitoring
  NewServerMonitor,
  // MarketingAnalysis
  ChargeHotList,
  BigCustomerTrend,

  // CommonRelease,
  overseas_common,
  o_r_delivery,
  o_c_complement,
  o_c_budget,
  o_c_pkg_manager,
  o_s_c_reports
}
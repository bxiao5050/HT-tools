/**
 * Created by linlin.zhang on 2016/9/23.
 */
var permConfig = [{
        system: 1,
        level_config_item_name: ['mobile_oas_menu', 'mobile_oas_agent', 'mobile_oas_regChannel', 'mobile_oas_payChannel'],
        son_config_item_name: [{
            config_item_name: 'mobile_oas_menu',
            level_config_item_name: ['menu', 'second_menu', 'third_menu']
        }, {
            config_item_name: 'mobile_oas_agent',
            level_config_item_name: ['agent', 'second_agent', 'third_agent']
        }, {
            config_item_name: 'mobile_oas_regChannel',
            level_config_item_name: ['reg_channel', 'reg_second_channel']
        }, {
            config_item_name: 'mobile_oas_payChannel',
            level_config_item_name: ['pay_channel']
        }]},{
        system:2,
        level_config_item_name:['mobile_ad_menu'],
        son_config_item_name:[{
            config_item_name: 'mobile_ad_menu',
            level_config_item_name: ['menu', 'second_menu', 'third_menu']
    }]},{
        system: 3,
        level_config_item_name: ['mobile_adRoad_menu'],
        son_config_item_name: [{
            config_item_name: 'mobile_adRoad_menu',
            level_config_item_name: ['menu', 'second_menu', 'third_menu']
        }]}, {
        system: 4,
        level_config_item_name: ['mobile_foreignOas_menu', 'mobileforeignOas_agent', 'mobile_foreignOas_channel'],
        son_config_item_name: [{
            config_item_name: 'mobile_foreignOas_menu',
            level_config_item_name: ['menu', 'second_menu', 'third_menu']
        }, {
            config_item_name: 'mobileforeignOas_agent',
            level_config_item_name: ['agent', 'second_agent', 'third_agent']
        }, {
            config_item_name: 'mobile_foreignOas_channel',
            level_config_item_name: ['reg_channel', 'reg_second_channel', 'reg_third_channel']
        }]
    }, {
    system: 5,
    level_config_item_name: ['webOasMenus', 'webOasAgents', 'webOasChannels'],
    son_config_item_name: [{
        config_item_name: 'webOasMenus',
        level_config_item_name: ['menu', 'second_menu', 'third_menu']
    }, {
        config_item_name: 'webOasAgents',
        level_config_item_name: ['agent', 'second_agent', 'third_agent']
    }, {
        config_item_name: 'webOasChannels',
        level_config_item_name: ['reg_channel', 'reg_second_channel', 'reg_third_channel']
    }]
}];

module.exports = permConfig;
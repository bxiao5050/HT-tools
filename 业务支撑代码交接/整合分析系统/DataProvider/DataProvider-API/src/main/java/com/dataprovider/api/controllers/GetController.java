package com.dataprovider.api.controllers;

import com.dataprovider.api.services.ExportService;
import com.dataprovider.api.services.GetService;
import com.xiaoleilu.hutool.exceptions.ExceptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by linlin.zhang on 2017/7/31.
 */
@RestController
@RequestMapping("/Get")
public class GetController {
    @Autowired
    GetService getService;
    @Autowired
    ExportService exportService;

    @RequestMapping("/Test")
    public String test() {
        try {
            String sql = "drop table if EXISTS temp_table;\n" +
                    "create TEMP table temp_table (country varchar,count_date date);\n" +
                    "insert into temp_table\n" +
                    "select a.country,b.count_date  from \n" +
                    "(select DISTINCT country from sc_sdk_databank.t_p_app_install where install_time::date = '2018-4-1' and\n" +
                    "app_id in (select area_app_id from sc_sdk_databank.t_c_area_app where unite_id = '53') and \n" +
                    "os = '1' and media_source = 'Facebook Ads') a cross join \n" +
                    "(select '2018-4-1'::date - num * '1 day'::INTERVAL count_date from sc_game_public_conf.t_c_ordinal where num < 30) b ;\n" +
                    "\n" +
                    "select a.country,a.count_date,COALESCE(installs,0) installs,\n" +
                    "COALESCE(regs,0) regs,COALESCE(roles,0)roles,COALESCE(costs,0) costs,COALESCE(unit_cost,0) unit_cost from temp_table a left join ( \n" +
                    "select * from sc_sdk_databank.t_c_repair_data_copy where  \n" +
                    "app_id in (select area_app_id from sc_sdk_databank.t_c_area_app where unite_id = '53')  and \n" +
                    "os = '1' and media_source = 'Facebook Ads' and status = true) b on a.country = b.country and a.count_date = b.count_date\n" +
                    "order by  a.country,a.count_date desc;";
            return getService.getIntergrate(3, sql, "");
        }catch (Exception e) {
            return ExceptionUtil.getMessage(e);
        }
    }

    @RequestMapping("/Customs")
    public String Get(int connectionId,String sql) {
        try {
            return getService.GetData(connectionId, sql, "");
        } catch (Exception e) {
            return ExceptionUtil.getMessage(e);
        }
    }
    @RequestMapping("/Foreign")
    public String foreighGet(@RequestParam(value = "connectionId",defaultValue = "1")int connectionId,String sql){
        try {
            return getService.GetForeigh(connectionId, sql, "");
        }catch (Exception e){
            return ExceptionUtil.getMessage(e);
        }
    }
    @RequestMapping("/Intergrate")
    public String intergrateGet(@RequestParam(value = "connectionId",defaultValue = "3") int connectionId, String sql){
        try {
            return getService.getIntergrate(connectionId, sql, "");
        }catch (Exception e) {
            return ExceptionUtil.getMessage(e);
        }
    }

    @RequestMapping("/export")
    public ResponseEntity<byte[]> export(int connection, String sql,int index){
        try {
            String dfileName = new String(("data" + ".xls").getBytes("gb2312"), "iso8859-1");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", dfileName);
            return new ResponseEntity<byte[]>(exportService.exportExcel(connection, sql,index), headers,HttpStatus.OK);
        }catch (Exception e){
            return null;
        }
    }


}

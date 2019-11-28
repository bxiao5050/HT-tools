package com.sevenroad.google.service;

import com.google.api.ads.adwords.axis.v201710.cm.LocationCriterion;
import com.google.api.ads.adwords.axis.v201710.cm.LocationCriterionService;
import com.google.api.ads.adwords.axis.v201710.cm.LocationCriterionServiceInterface;
import com.google.api.ads.adwords.axis.v201710.cm.LocationCriterionServiceSoapBindingStub;
import com.google.api.ads.adwords.lib.client.AdWordsSession;
import com.google.api.ads.adwords.lib.client.reporting.ReportingConfiguration;
import com.google.api.ads.adwords.lib.factory.AdWordsServicesInterface;
import com.google.api.ads.adwords.lib.jaxb.v201710.*;
import com.google.api.ads.adwords.lib.utils.*;
import com.google.api.ads.adwords.lib.utils.v201710.ReportDownloaderInterface;
import com.xiaoleilu.hutool.system.SystemUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public class AdsWordService {
    Logger logger = LoggerFactory.getLogger(AdsWordService.class);
    public void report(AdWordsServicesInterface adWordsServices, AdWordsSession session){
        // Create selector.

        String query = "SELECT  Date,CampaignId,CampaignName,"
                + " CountryCriteriaId,"
                + " Impressions, Clicks, Cost "
                + " FROM GEO_PERFORMANCE_REPORT "
                // + " WHERE IsTargetingLocation IN [true,false] AND LocationType = LOCATION_OF_PRESENCE "
                + " DURING LAST_30_DAYS";
        ReportDownloaderInterface reportDownloader =
                adWordsServices.getUtility(session, ReportDownloaderInterface.class);

        try {
            ReportDownloadResponse response = reportDownloader.downloadReport(query,DownloadFormat.CSV);
            String result = response.getAsString();
            logger.info(result);
        } catch (Exception e ) {
            logger.error("Report was not downloaded due to: {} ", e);
        }

    }


    public void country(AdWordsServicesInterface adWordsServices, AdWordsSession session){

        try {
            LocationCriterionServiceInterface serviceInterface = new LocationCriterionServiceSoapBindingStub();
            LocationCriterion[] result = serviceInterface.query("select locale,countryCode,location");
        }catch (Exception e){
            logger.error("get country error {} ",e);
        }

    }
}

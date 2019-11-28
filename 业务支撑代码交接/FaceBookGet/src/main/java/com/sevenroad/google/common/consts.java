package com.sevenroad.google.common;

/**
 * Created by linlin.zhang on 2018/1/15.
 */
public class consts {
    public static final String AWQL_RECORD = "SELECT CampaignId, AdGroupId, Id, Criteria, CriteriaType, "
            + "Impressions, Clicks, Cost FROM CRITERIA_PERFORMANCE_REPORT "
            + "WHERE Status IN [ENABLED, PAUSED] "
            + "DURING YESTERDAY";

    public static final String JOB_DATA = "job_data";
}

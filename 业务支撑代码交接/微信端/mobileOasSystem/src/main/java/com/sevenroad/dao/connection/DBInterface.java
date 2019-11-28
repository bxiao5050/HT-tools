package com.sevenroad.dao.connection;

import com.sevenroad.dao.data.errorMessage;
import com.sevenroad.utils.data.CustomParam;
import com.sevenroad.utils.data.DataTable;

import java.sql.SQLException;
import java.util.LinkedList;

/**
 * Created by linlin.zhang on 2016/10/18.
 */
public interface DBInterface {
    LinkedList<DataTable> getQueryResult(String sql, int connctionId, CustomParam[] params)  throws Exception;
    LinkedList<errorMessage> executeNoQuery(String sql, int connection_id) throws Exception;
}

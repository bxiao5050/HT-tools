package com.dataprovider.dao.models;

import java.util.List;

/**
 * Created by linlin.zhang on 2017/8/2.
 */
public class IntergrateTable {
        private List<Column> result;
        private int rowCount;
        public List<Column> getResult() {
            return result;
        }

        public void setResult(List<Column> result) {
            this.result = result;
        }

        public int getRowCount() {
            return rowCount;
        }

        public void setRowCount(int rowCount) {
            this.rowCount = rowCount;
        }
}

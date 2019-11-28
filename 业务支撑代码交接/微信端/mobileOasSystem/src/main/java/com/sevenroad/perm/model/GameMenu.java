package com.sevenroad.perm.model;

import java.util.Comparator;

/**
 * Created by linlin.zhang on 2018/2/26/026.
 */
public class GameMenu implements Comparable {
    private int id;
    private String menu_name;
    private String menu_url;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMenu_name() {
        return menu_name;
    }

    public void setMenu_name(String menu_name) {
        this.menu_name = menu_name;
    }

    public String getMenu_url() {
        return menu_url;
    }

    public void setMenu_url(String menu_url) {
        this.menu_url = menu_url;
    }

    @Override
    public int compareTo(Object o) {
         return this.id - ((GameMenu)o).getId();
    }
}

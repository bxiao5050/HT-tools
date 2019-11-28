package com.sevenroad.oas.web.controllers;
import java.util.*;
import com.sevenroad.oas.userPermiss.model.UserPermiss;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
public abstract class BaseController {
    public abstract boolean Permiss(String url,Map<String,String[]> parems,UserPermiss userPermiss);
}

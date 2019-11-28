package com.sevenroad.oas.task.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

/**
 * Created by linlin.zhang on 2017/5/23.
 */
@Target(ElementType.TYPE)
public @interface TaskAnnotation {
   public int appId() default  1;
   public String appName () default  "";
}

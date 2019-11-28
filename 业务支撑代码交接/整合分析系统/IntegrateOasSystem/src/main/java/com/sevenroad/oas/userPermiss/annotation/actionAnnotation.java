package com.sevenroad.oas.userPermiss.annotation;

import java.lang.annotation.*;

/**
 * Created by linlin.zhang on 2017/4/19.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface actionAnnotation {
    int actionType() default 1;
    String actionName() default "";
}

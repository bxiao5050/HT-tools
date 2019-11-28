package com.sevenroad.oas.userPermiss.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by linlin.zhang on 2017/4/20.
 */

/**
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface controlAnnotation {
    int controlType() default 1;
    String controlName() default "";
}

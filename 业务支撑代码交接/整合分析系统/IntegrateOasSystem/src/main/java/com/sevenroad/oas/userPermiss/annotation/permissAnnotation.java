package com.sevenroad.oas.userPermiss.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by linlin.zhang on 2017/4/25.
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface permissAnnotation {
    String permissKey() default "";
    int permissValue() default 0;
}

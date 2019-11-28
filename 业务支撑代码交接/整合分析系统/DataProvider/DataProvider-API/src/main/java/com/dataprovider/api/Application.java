package com.dataprovider.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.ByteArrayOutputStream;

@Configuration
@EnableAutoConfiguration
@ComponentScan
@EnableScheduling
public class Application {

    public static void main(String[] args) {
//        SpringMVCApiDocConfig doc = new SpringMVCApiDocConfig();
//        doc.setConfigFilePath("jdoc.properties");
//        doc.start();

        SpringApplication.run(Application.class, args);
    }

}
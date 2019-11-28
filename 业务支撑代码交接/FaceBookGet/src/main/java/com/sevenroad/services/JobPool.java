package com.sevenroad.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadPoolExecutor;

import static java.util.concurrent.Executors.newCachedThreadPool;

/**
 * Created by linlin.zhang on 2017/7/21.
 */
public class JobPool {
    private static ThreadPoolExecutor service;
    static {
        service = (ThreadPoolExecutor)newCachedThreadPool();
        service.setRejectedExecutionHandler(new ThreadPoolExecutor.DiscardOldestPolicy());
    }
    static Logger logger = LoggerFactory.getLogger(JobPool.class);
    public static <T>  Future<T> start(Callable<T> job){
        logger.info("thread Pool size : {} ,used : {} ,taskCount ;{}",service.getPoolSize(),service.getActiveCount(),service.getTaskCount());
       return  service.submit(job);
    }
}

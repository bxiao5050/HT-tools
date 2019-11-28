package com.sevenroad.oas.web.utils;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * Created by linlin.zhang on 2017/4/19.
 */

/**
 * ��Ӧ���ݹ�����
 */
public class responseUtils {
    public static void responseOK(IResult result, HttpServletResponse response) throws Exception{
        PrintWriter writer = null;
        try {
            writer = response.getWriter();
            writer.write(result.getResult());
            writer.flush();
        } finally {
            if (null != writer)
                writer.close();
        }
    }
    public static void responseError(IResult result,HttpServletResponse response) throws Exception{
        PrintWriter writer = null;
        try {
            response.setStatus(HttpServletResponse.SC_OK);
            writer = response.getWriter();
            writer.write(result.getResult());
            writer.flush();
        } finally {
            if (null != writer)
                writer.close();
        }
    }
    public static void responseUnAuth(IResult result,HttpServletResponse response) throws Exception{
        PrintWriter writer = null;
        try {
            response.setStatus(HttpServletResponse.SC_OK);
            writer = response.getWriter();
            writer.write(result.getResult());
            writer.flush();
        } finally {
            if (null != writer)
                writer.close();
        }
    }
}

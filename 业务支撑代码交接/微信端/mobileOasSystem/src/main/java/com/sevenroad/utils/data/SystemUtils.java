package com.sevenroad.utils.data;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.List;

/**
 * Created by linlin.zhang on 2016/11/18.
 */
public class SystemUtils {
    public static CustomParam getParamsByList(CustomParam[] list,String name){
        for(int i =0;i<list.length;i++){
            if(list[i].getParamName().compareTo(name) == 0){
                return list[i];
            }
        }
        return null;
    }
    public static String bytes2hex02(byte[] bytes)
    {
        StringBuilder sb = new StringBuilder();
        String tmp = null;
        for (byte b : bytes)
        {
            // 将每个字节与0xFF进行与运算，然后转化为10进制，然后借助于Integer再转化为16进制
            tmp = Integer.toHexString(0xFF & b);
            if (tmp.length() == 1)// 每个字节8为，转为16进制标志，2个16进制位
            {
                tmp = "0" + tmp;
            }
            sb.append(tmp);
        }

        return sb.toString();

    }
    public static String getMd5(String strMD5) throws Exception{
        MessageDigest md = MessageDigest.getInstance("MD5");
        // 计算md5函数
        md.update(strMD5.getBytes());
        // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
        // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
        StringBuilder sb = new StringBuilder(40);
        for(byte x:md.digest()) {
            if((x & 0xff)>>4 == 0) {
                sb.append("0").append(Integer.toHexString(x & 0xff));
            } else {
                sb.append(Integer.toHexString(x & 0xff));
            }
        }
        return sb.toString();
    }

    public static String grepSql(String value,List<String> keys){
        if(value.isEmpty()) return "";
        else{
            for(int i = 0;i<keys.size();i++){
                if(value.contains(keys.get(i))) value = value.replace(keys.get(i),"");
            }
            return value;
        }
    }
}

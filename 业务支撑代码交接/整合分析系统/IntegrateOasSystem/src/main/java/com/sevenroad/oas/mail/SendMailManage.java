package com.sevenroad.oas.mail;
import com.google.common.collect.Maps;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

/**
 * Created by linlin.zhang on 2018/3/28/028.
 */
public class SendMailManage {
    void SendForeignMail(Map<String,String> prop) throws MessagingException {
        JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
        senderImpl.setHost("mail.7road.com");
        senderImpl.setPort(465);
        senderImpl.setUsername("linlin.zhang@7road.com");
        senderImpl.setPassword("a123456!");
        MimeMessage msg = senderImpl.createMimeMessage();
        MimeMessageHelper messageHelper =
                new MimeMessageHelper(msg);
        messageHelper.setFrom(prop.get("from"));
        messageHelper.setTo(prop.get("to"));
        messageHelper.setSubject(prop.get("subject"));
        messageHelper.setText(prop.get("text"), true);
        senderImpl.send(msg);
    }

    public static void main(String[] args) throws MessagingException {
        SendMailManage mailManage = new SendMailManage();
        Map<String,String> pro = Maps.newHashMap();
        pro.put("from","linlin.zhang@7road.com");
        pro.put("to","linlin.zhang@7road.com");
        pro.put("subject","linlin.zhang");
        pro.put("text","linlin.zhang");
        mailManage.SendForeignMail(pro);
    }
}

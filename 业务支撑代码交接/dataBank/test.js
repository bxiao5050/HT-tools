const base64url = require('base64-url')
const Decrypter = require('aes-decrypter').Decrypter;
const CryptoJS = require('crypto-js')

const CorpId = "wx5823bf96d3bd56c7";
const Token = 'QDG6eK'
const EncodingAESKey = 'jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C'
const query = {
  msg_signature: '5c45ff5e21c57e6ad56bac8758b79b1d9ac89fd3',
  timestamp: '1409659589',
  nonce: '263014780',
  echostr: 'P9nAzCzyDtyTWESHep1vC5X9xho/qYX3Zpb4yKa9SKld1DsH3Iyt3tP3zNdtp+4RPcs8TgAE7OaBO+FZXvnaqQ=='
}
// 需要返回的明文
const sEchoStr = "";

/**
 * error code 说明.
 * <ul>
 *    <li>-40001: 签名验证错误</li>
 *    <li>-40002: xml解析失败</li>
 *    <li>-40003: sha加密生成签名失败</li>
 *    <li>-40004: encodingAesKey 非法</li>
 *    <li>-40005: corpid 校验错误</li>
 *    <li>-40006: aes 加密失败</li>
 *    <li>-40007: aes 解密失败</li>
 *    <li>-40008: 解密后得到的buffer非法</li>
 *    <li>-40009: base64加密失败</li>
 *    <li>-40010: base64解密失败</li>
 *    <li>-40011: 生成xml失败</li>
 * </ul>
 */
class ErrorCode {
  static $OK = 0;
  static $ValidateSignatureError = -40001;
  static $ParseXmlError = -40002;
  static $ComputeSignatureError = -40003;
  static $IllegalAesKey = -40004;
  static $ValidateCorpidError = -40005;
  static $EncryptAESError = -40006;
  static $DecryptAESError = -40007;
  static $IllegalBuffer = -40008;
  static $EncodeBase64Error = -40009;
  static $DecodeBase64Error = -40010;
  static $GenReturnXmlError = -40011;
}

/*
 *验证URL
 *@param sMsgSignature: 签名串，对应URL参数的msg_signature
 *@param sTimeStamp: 时间戳，对应URL参数的timestamp
 *@param sNonce: 随机串，对应URL参数的nonce
 *@param sEchoStr: 随机串，对应URL参数的echostr
 *@param sReplyEchoStr: 解密之后的echostr，当return返回0时有效
 *@return：成功0，失败返回对应的错误码
 */
function VerifyURL($sMsgSignature, $sTimeStamp, $sNonce, $sEchoStr, & $sReplyEchoStr) {
  if (EncodingAESKey.length != 43) {
    return ErrorCode.$IllegalAesKey;
  }
  $pc = new Prpcrypt(EncodingAESKey);
  //verify msg_signature
  $sha1 = new SHA1;
  $array = $sha1 - > getSHA1($this - > m_sToken, $sTimeStamp, $sNonce, $sEchoStr);
  $ret = $array[0];
  if ($ret != 0) {
    return $ret;
  }
  $signature = $array[1];
  if ($signature != $sMsgSignature) {
    return ErrorCode::$ValidateSignatureError;
  }
  $result = $pc - > decrypt($sEchoStr, $this - > m_sReceiveId);
  if ($result[0] != 0) {
    return $result[0];
  }
  $sReplyEchoStr = $result[1];
  return ErrorCode::$OK;
}



const signature = query.msg_signature
const timestamp = query.timestamp
const nonce = query.nonce
const msg_encrypt = query.echostr
const sort_str = nonce + timestamp + Token + msg_encrypt
const signature2 = CryptoJS.SHA1(sort_str).toString()
// const key = CryptoJS.enc.Utf8.parse(AESKey);

const aes_msg = CryptoJS.enc.Base64.parse(msg_encrypt)
const AESKey = CryptoJS.enc.Base64.parse(EncodingAESKey + "=")
const rand_msg = CryptoJS.AES.decrypt(aes_msg, AESKey)

console.log(aes_msg, AESKey)
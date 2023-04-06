import crypto from "crypto-js";
// encrypt
export const encrypted = (userId: string) => {
  const secretKey = "xnekf";
  return crypto.AES.encrypt(String(userId), secretKey).toString();
};

// decrypt
export const decrypt = (userId: any) => {
  if (userId) {
    const deCryptUserId = crypto.AES.decrypt(userId, "xnekf").toString(
      crypto.enc.Utf8
    );
    return deCryptUserId;
  }
};

// getUserId
export const getUserId = () => {
  if (getCookie("tudalUser")) {
    return decrypt(getCookie("tudalUser"));
  } else {
    return "";
  }
};

//@ts-ignore
export function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}

//@ts-ignore
export function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}
//@ts-ignore
export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

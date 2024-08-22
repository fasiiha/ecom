import APIConstant from "../constant/APIConstant";
import Request from "./UtilsService";

export async function registerUser(data) {
  return await Request({
    url: APIConstant.AUTH_BASE_URL + APIConstant.REGISTER_USER,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function loginUser(data) {
  return await Request({
    url: APIConstant.AUTH_BASE_URL + APIConstant.LOGIN_USER,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function sendOtp(data) {
  return await Request({
    url: APIConstant.AUTH_BASE_URL + APIConstant.SEND_OTP,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function verifyOtp(data) {
  return await Request({
    url: APIConstant.AUTH_BASE_URL + APIConstant.VERIFY_OTP,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function resetPassword(data) {
  return await Request({
    url: APIConstant.AUTH_BASE_URL + APIConstant.RESET_PASSWORD,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function changePasswordSettings(data) {
  return await Request({
    url: APIConstant.USER_BASE_URL + APIConstant.CHANGE_PASSWORD,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

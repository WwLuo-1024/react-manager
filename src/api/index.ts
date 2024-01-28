import request from "@/utils/request";
import { Dashboard, Login, User } from "@/types/api";

export default {
  //Login
  login(params: Login.params) {
    return request.post<string>("/users/login", params, { showLoading: false });
  },

  //Get User Info
  getUserInfo() {
    return request.get<User.UserItem>("/users/getUserInfo");
  },

  //Get Dashboard Data
  getReportData() {
    return request.get<Dashboard.ReportData>("/order/dashboard/getReportData");
  },
};

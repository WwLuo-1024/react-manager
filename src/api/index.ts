import request from "@/utils/request";
import { Dashboard, Login, ResultData, User } from "@/types/api";

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

  getLineData() {
    return request.get<Dashboard.LineData>("/order/dashboard/getLineData");
  },

  getPieCityData() {
    return request.get<Dashboard.PieData[]>("/order/dashboard/getPieCityData");
  },

  getPieAgeData() {
    return request.get<Dashboard.PieData[]>("/order/dashboard/getPieAgeData");
  },

  getRadarData() {
    return request.get<Dashboard.RadarData>("/order/dashboard/getRadarData");
  },

  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>("/users/list", params);
  },

  //创建用户
  createUser(params: User.CreateParams) {
    return request.post("/users/create", params);
  },

  //编辑用户
  editUser(params: User.EditParams) {
    return request.post("/users/edit", params);
  },
};

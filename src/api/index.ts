import request from "@/utils/request";
import { Dashboard, Login, ResultData, User, Dept, Menu } from "@/types/api";

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

  //删除用户和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post("/users/delete", params);
  },

  //部门管理
  //部门列表
  getDeptList(params?: Dept.DeptItem) {
    console.log(params);
    return request.get<Dept.DeptItem[]>("/dept/list", params);
  },

  //获取当前账号下的所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>("/users/all/list");
  },

  //创建部门
  createDept(params: Dept.CreateParams) {
    return request.post("/dept/create", params);
  },

  //修改部门
  editDept(params: Dept.EditParams) {
    return request.post("/dept/edit", params);
  },

  //删除部门
  deleteDept(params: Dept.DelParams) {
    return request.post("/dept/delete", params);
  },

  //菜单管理
  //获取菜单列表
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>("/menu/list", params);
  },

  //创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post("/menu/create", params);
  },

  //编辑菜单
  editMenu(params: Menu.EditParams) {
    return request.post("/menu/edit", params);
  },

  //删除菜单
  deleteMenu(params: Menu.DelParams) {
    return request.post("/menu/delete", params);
  },
};

import request from "@/utils/request";
import { ResultData, Role } from "@/types/api";

export default {
  //获取角色列表
  getRoleList(params: Role.Params) {
    return request.get<ResultData<Role.RoleItem>>("/roles/list", params);
  },
};

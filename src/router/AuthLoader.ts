import api from "@/api";
import { getMenuPath } from "@/utils";

export default async function AuthLoader() {
  const data = await api.getPermissionList();
  const menuPathList = getMenuPath(data.menuList);
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList,
  };
}

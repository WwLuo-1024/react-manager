/**
 * Tool Function Encapsulation
 */

import { Menu } from "@/types/api";

export const formatMoney = (num?: number | string) => {
  if (!num) return 0;
  const a = parseFloat(num.toString());
  return a.toLocaleString("zh-cn", { style: "currency", currency: "CNY" });
};

// 格式化数字
export const formatNum = (num?: number | string) => {
  if (!num) return 0;
  const a = num.toString();
  if (a.indexOf(".") > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  return a.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

//format Date
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date();

  if (date instanceof Date) curDate = date;
  else if (date) curDate = new Date(date);

  if (rule === "yyyy-MM-dd") return curDate.toLocaleDateString();
  if (rule === "HH:mm:sss") return curDate.toLocaleTimeString();

  return curDate.toLocaleString().replaceAll("/", "-");
};

// 用户状态转换
export const formatState = (state: number) => {
  if (state === 1) return "在职";
  if (state === 2) return "试用期";
  if (state === 3) return "离职";
};

// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(
      Array.isArray(item.children) && !item.buttons
        ? getMenuPath(item.children)
        : item.path + ""
    );
  }, []);
};

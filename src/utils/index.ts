/**
 * Tool Function Encapsulation
 */

export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString());
  return a.toLocaleString("zh-cn", { style: "currency", currency: "CNY" });
};

//format Date
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date();

  if (date) curDate = date;
  if (rule === "yyyy-MM-dd") return curDate.toLocaleDateString();
  if (rule === "HH:mm:sss") return curDate.toLocaleTimeString();

  return curDate.toLocaleString().replaceAll("/", "-");
};

/**
 * localStorage localStorage module encapsulation
 */

export default {
  /**
   * stroage设置
   * @param key {string}
   * @param value {any}
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value)); //将object对象格式转换为JSON字符串
  },

  /**
   * storage读取
   * @param key
   * @returns value
   */
  get(key: string) {
    const value = localStorage.getItem(key); //把字符串形式的数据转换为object
    if (!value) return "";
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  },

  /**
   * 删除storage的值
   * @param key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },

  /**
   * 清空所有storage的值
   */
  clear() {
    localStorage.clear();
  },
};

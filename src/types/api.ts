/**
 * Interface type definition
 */

export interface Result<T = any> {
  code: number;
  data: T;
  msg: string;
}

export namespace Login {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

export namespace User {
  export interface UserItem {
    createId: number;
    deptId: string;
    deptName: string;
    job: string;
    mobile: string;
    role: number;
    roleList: string;
    state: number;
    userEmail: string;
    userId: number;
    userImg: string;
    userName: string;
    _id: string;
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number;
    totalMoney: number;
    orderCount: number;
    cityNum: number;
  }
}

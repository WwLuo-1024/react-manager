import { MutableRefObject } from "react";
import { User } from "./api";

export type IAction = "create" | "edit" | "delet";

export interface IModalProp<T = User.UserItem> {
  mRef: MutableRefObject<
    | {
        open: (type: IAction, data: T) => void;
      }
    | undefined
  >;
  update: () => void;
}

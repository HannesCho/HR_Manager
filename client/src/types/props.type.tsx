import { Dispatch, SetStateAction } from "react";

export interface IProps {
  isSigedUp: boolean;
  setIsSigedUp: Dispatch<SetStateAction<boolean>>;
}

export interface ISet {
  setIsSigedUp: Dispatch<SetStateAction<boolean>>;
}

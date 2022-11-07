import { Dispatch, SetStateAction } from "react";

export interface IProps {
  isSignedUp: boolean;
  setIsSignedUp: Dispatch<SetStateAction<boolean>>;
}

export interface ISet {
  setIsSignedUp: Dispatch<SetStateAction<boolean>>;
}

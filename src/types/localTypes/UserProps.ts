
import {type UserType} from "./UserType";
import {type ErrorType} from "../errorTypes/ErrorType";

export interface UserProps {
    user: UserType;
    errors: ErrorType;
  }
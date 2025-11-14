
export type UserType = {   
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleName: string | null;
    [key:string]:string |null
  };
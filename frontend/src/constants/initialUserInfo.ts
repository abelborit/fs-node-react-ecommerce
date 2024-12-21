interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInfoInterface {
  userInfo: UserInterface;
  isAuthenticated: boolean;
  tokenUser: string;
}

export const initialUserInfo: UserInfoInterface = {
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
  },
  isAuthenticated: false,
  tokenUser: "",
};

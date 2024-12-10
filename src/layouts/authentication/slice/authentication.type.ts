export interface ILoginSuccessResponce {
  id: string;
  username: string;
  roles: string;
  firstName: string;
  lastName: string;
  country: string;
  gender: string | null;
  dob: string | null;
  dateofcreation: string;
  profileImage: string;
  token: string;
  userID: string;
}

export interface IData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  userrole: string;
  comapanyId: string;
  role?: any;
  vendorId?: string | undefined;
  __v: number;
  watchHistory: any[];
}

export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
  userrole: string;
  status: boolean;
  mobile: string;
  role?: any;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUserDashboard {
  needtoact: number;
  invoiceWip: number;
  invoiceCompleted: number;
  invoiceRejected: number;
}

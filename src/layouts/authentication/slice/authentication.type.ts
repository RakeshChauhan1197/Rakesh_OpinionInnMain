// {
//     "id": "xNmsyxOvDa+p7ysL+9GHNXNlmpsgWinsaNUPsYjBqwx00PPWGMmUFz49AAJVWrrz",
//     "username": "admin",
//     "roles": "Admin",
//     "firstName": "Opinioninn",
//     "lastName": "Admin",
//     "country": "INDIA",
//     "gender": null,
//     "dob": null,
//     "dateofcreation": "2014-04-04T14:19:43.807",
//     "profileImage": "",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik9waW5pb25pbm5fQWRtaW4iLCJlbWFpbCI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IklORElBIiwibmFtZWlkIjoiVnV6ak1OOXJXNmdYTTNheFJuYndiQ3pWUndRcGMxejd6WWlkam1qSmxIT1pvMjZDcUViS1JrdnM0K3VTWjR1byIsIm5iZiI6MTcyNjkwOTc2OSwiZXhwIjoxNzI3NTE0NTY5LCJpYXQiOjE3MjY5MDk3Njl9.CtlPKIWXkbpmSMPNbyIOVa7DXOntyh6jwau6_975uks"
// }

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
  watchHistory: any[]; // Replace 'any' with the actual type if you know it
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

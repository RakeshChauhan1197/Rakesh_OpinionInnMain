export interface IPuser {
  userID: number;
  firstName: string;
  lastName: string;
  emailID: string;
  userRole: string;
  country: string;
  status: boolean;
  doc: Date;
  dob: Date;
  gender: string;
  zipCode: number;
  city: string;
  state: string;
  dma: number;
  suurce: string;
  signUP_IP: string;
  skip_IP_Validation: number;
}
export interface IDownload {
  fromDate: string;
  toDate: string;
}

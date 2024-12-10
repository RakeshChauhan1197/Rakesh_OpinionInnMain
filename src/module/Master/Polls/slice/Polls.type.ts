export interface IPolls {
  pollId: number;
  startDate: string;
  endDate: string;
  country: string;
  question: string;
  status: string;
  isActive: number;
  pollAnswer: string;
  tid: number;
}

export interface ICountry {
  tID: number;
  countryCode: string;
  countryName: string;
}

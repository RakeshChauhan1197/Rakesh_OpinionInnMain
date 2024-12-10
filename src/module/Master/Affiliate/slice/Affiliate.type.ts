export interface IAffiliate {
  tid: number;
  name: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  qryAttribute: string;
  qryAttribute2: string;
  signupType: string;
  httpMethod: string;
  successNotificationUrl: string;
  isTSL: number;
  landingPageUrl: string;
  duplicateCheckParameter: string;
  affiliateUser: string;
  incentiveValue: number;
  affiliateType: string;
  incentiveType: string;
}

export interface IAffiliateuser {
  uid: number;
  name: string;
}

export interface IQuestion {
  PSID: number;
  QID: number;
  userID: number;
  Qustxt: string;
  Options: string;
  RightAnswer: string;
  QuestionDataType: string;
  StrCHarLimit: string;
  StringValidationType: string;
  MinCharLen: string;
  MaxCharLen: string;
  chkmuteflag: string;
  chkoptionflag: string;
  isSkipable: string;
  Qusno: string;
}

export interface IVendor {
  vid: number;
  Parent: string;
  vendorName: string;
  completePageURL: string;
  disqualifyPageUrl: string;
  overaQuoteaUrl: string;
  useraAttribute: string;
  QualityRejectURL: string;
  HasMultiParameter: string;
  chkHasMultiParameter: boolean;
  In_Parameter1: string;
  In_Parameter2: string;
  In_Parameter3: string;
  In_Parameter4: string;
  Out_Parameter1: string;
  Out_Parameter2: string;
  Out_Parameter3: string;
  Out_Parameter4: string;
  Out_Parameter1Column: string;
  Out_Parameter2Column: string;
  Out_Parameter3Column: string;
  Out_Parameter4Column: string;
  Vendor_ID: number;
}

export interface parentList{
  tid :number;
  vendor_Name:string;
}

export interface parameterList{  
  vendorName:string;
}

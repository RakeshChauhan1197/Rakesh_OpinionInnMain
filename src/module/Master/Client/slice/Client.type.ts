export interface IClient {
  cid: number;                     
  clientName: string;              
  clientAddress: string;           
  clientBillingAddress: string;    
  contactPersonName: string;       
  contactPersonEmail: string;     
  contactPersonPhone: string;      
  contactPersonAddress: string;    
  clientFinanceContact: string;   
  remarks: string;                 
  enableHashing: boolean;          
  hashKey: string;                 
  allowIncentivePerHit: boolean;   
  hasMultiParameter: boolean;     
  out_Parameter1: string;          
  out_Parameter2: string;          
  out_Parameter3: string;          
  out_Parameter4: string;          
  out_Parameter1Column: string;    
  out_Parameter2Column: string;    
  out_Parameter3Column: string;    
  out_Parameter4Column: string;    
}

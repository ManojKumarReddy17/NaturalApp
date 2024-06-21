export class UserDetails {
    id: string;
    FirstName: string;
    LastName: string;
    email: string;
    mobileNumber: string;
    address: string;
    executives: string;
    presignedUrl: any;
    userName:string;
    exeId:string;
  
    constructor(Id: string, firstName: string, lastName: string, Email: string, MobileNumber: string, Address: string, Executive: string, PresignedUrl: any,UserName:string,ExecutiveId:string) {
      this.id = Id;
      this.presignedUrl = PresignedUrl;
      this.FirstName = firstName;
      this.LastName = lastName;
      this.email = Email;
      this.mobileNumber = MobileNumber;
      this.address = Address;
      this.executives = Executive;
      this.userName = UserName;
      this.exeId = ExecutiveId;
    }
  }
  
export type EmailType{
   
        public firstname: string;
        public lastname: string;
        public address: string;
        public subject: string;
        public message: string; 
        public recipientaddress?:string; 
        public ccaddresses?:string[]; 
        public attachment? : any;
        

}
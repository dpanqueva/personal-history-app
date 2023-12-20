import { SearchPeopleJudicial } from "./search-people-judicial";

export class PaymentReference {

    paymentName?:string;
    paymentLastName?:string;
    paymentEmail?:string;
    paymentDocumentType?:string;
    paymentDocumentNumber?:string;
    paymentContact?:string;
    paymentSignarute?:string;
    initSearch?: SearchPeopleJudicial;
}

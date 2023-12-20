import { InitSearch } from "./init-search";

export class PaymentReference {
  paymentName?: string;
  paymentLastName?: string;
  paymentEmail?: string;
  paymentDocumentType?: string;
  paymentDocumentNumber?: string;
  paymentContact?: string;
  paymentSignature?: string;
  paymentStatus?: string
  initSearch?: InitSearch
}

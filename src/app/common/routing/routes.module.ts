import { Routes } from "@angular/router";
import { AfterPaymentComponent } from "src/app/components/after-payment/after-payment.component";
import { FindingPersonComponent } from "src/app/components/finding-person/finding-person.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { PaymentComponent } from "src/app/components/payment/payment.component";

export const ROUTES: Routes=[
    {path: '', component: HomeComponent},
    {path:'search/:referenceLocator', component: FindingPersonComponent},
    {path:'payment', component: PaymentComponent},
    {path:'after-payment/:preference/:orderId', component: AfterPaymentComponent}
    
];
import { Routes } from "@angular/router";
import { FindingPersonComponent } from "src/app/components/finding-person/finding-person.component";
import { HomeComponent } from "src/app/components/home/home.component";

export const ROUTES: Routes=[
    {path: '', component: HomeComponent},
    {path:'search/:documentType/:documentNumber/:cellphone/:searchType', component: FindingPersonComponent}
    
];
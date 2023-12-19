import { Geometry } from "./geometry";

export class AfterPayment {
    fullName?:                      string;
    firstName?:                     string;
    state?:                         string;
    documentNumber?:                string;
    documentType?:                  string;
    attorneyOfficeLegend?:          string;
    policeDetail?:                  string;
    publicSpendingWatchdogMessage?: string;
    address?:                       string;
    department?:                    string;
    municipality?:                  string;
    geometry?:                      Geometry;
}

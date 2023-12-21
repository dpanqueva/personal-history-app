import { Geometry } from "./geometry";

export class ConsolidatedResponse {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    state?: string;
    documentNumber?: string;
    documentType?: string;
    attorneyOfficeLegend?: string;
    policeDetail?: string;
    publicSpendingWatchdogMessage?: string;
    address?: string;
    department?: string;
    municipality?: string;
    geometry?: Geometry;
    transStatus?: string;
}

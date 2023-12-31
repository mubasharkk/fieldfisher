import {Model} from "./Model";

export class LegalCase extends Model {

    customerName: string;
    startDate: Date;
    isFinished?: boolean;

    constructor(initialValues: { customerName: string } & Partial<LegalCase>) {
        super(initialValues);
        this.customerName = initialValues.customerName;
        this.startDate = new Date(initialValues.startDate);
        this.isFinished = initialValues.isFinished || false;
    }
}
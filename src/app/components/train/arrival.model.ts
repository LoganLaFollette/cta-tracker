import { ICtaArrival } from "../interfaces/arrivals";

export class CtaArrival implements ICtaArrival {
    public position: number;
    public line: string;
    public heading: string;
    public etaStr: string;

    constructor(position: number, line: string, heading: string, etaStr: string) {
        this.position = position,
        this.line = line,
        this.heading = heading,
        this.etaStr = etaStr
     }
    // public getPosition() { return this.position; }
    // public getLine() { return this.line; }
    // public getHeading() { return this.heading; }
    // public getEtaStr() { return this.etaStr; }
}
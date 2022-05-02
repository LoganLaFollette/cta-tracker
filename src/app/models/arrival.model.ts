import { ICtaArrival } from "../components/interfaces/arrivals";

export class CtaArrival implements ICtaArrival {
    public position: number;
    public line: LineColor;
    public heading: string;
    public etaStr: string;
    public percentage: number;

    constructor(position: number, line: LineColor, heading: string, etaStr: string, percentage: number = 0) {
        this.position = position,
        this.line = line,
        this.heading = heading,
        this.etaStr = etaStr,
        this.percentage = percentage
     }
    // public getPosition() { return this.position; }
    // public getLine() { return this.line; }
    // public getHeading() { return this.heading; }
    // public getEtaStr() { return this.etaStr; }
}

export enum LineColor {
    green = "green",
    orange = "orange",
    blue = "blue",
    red = "red",
    pink = "pink",
    brown = "brown"
  }
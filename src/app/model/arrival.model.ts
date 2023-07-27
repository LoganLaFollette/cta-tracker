import { ICtaArrival } from "../components/interface/arrivals";

export class CtaArrival implements ICtaArrival {
    public position: number;
    public line: LineColor;
    public heading: string;
    public etaStr: string;
    public percentage: number;
    public arrivalTime: string;

    constructor(position: number, line: LineColor, heading: string, etaStr: string, percentage: number = 0, arrivalTime: string = "") {
        this.position = position,
        this.line = line,
        this.heading = heading,
        this.etaStr = etaStr,
        this.percentage = percentage
        this.arrivalTime = arrivalTime
     }
}

export enum LineColor {
    green = "green",
    orange = "orange",
    blue = "blue",
    red = "red",
    pink = "pink",
    brown = "brown"
  }
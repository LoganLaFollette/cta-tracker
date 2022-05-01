import { Component, OnInit } from '@angular/core';
import { TrainService } from './../../services/train.service';
import * as _ from "lodash"
import { CtaArrival } from 'src/app/models/arrival.model';

const trainColorMap = new Map([
  ['G', 'green'],
  ['Org', 'orange'],
  ['Blue', 'blue']
])

var TRAIN_DATA: CtaArrival[] = [
  new CtaArrival(1, 'Orange', 'Loop', '2 min'),
  new CtaArrival(2, 'Green', 'Harlem/Lake', '5 min'),
  new CtaArrival(3, 'Red', 'Loop', '10 min'),
];

@Component({
  selector: 'app-arrivals-ui',
  templateUrl: './arrivals-ui.component.html',
  styleUrls: ['./arrivals-ui.component.scss']
})
export class ArrivalsUiComponent implements OnInit {
  trains: CtaArrival[];
  stationName: string;


  constructor(
    private trainService: TrainService,
  ) {
    this.trains = TRAIN_DATA;
  }

  
  
  ngOnInit(): void {

  }

}

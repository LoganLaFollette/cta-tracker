import { Component, OnInit } from '@angular/core';
import { TrainService } from './../../services/train.service';
import * as _ from "lodash"
import { CtaArrival, LineColor } from 'src/app/models/arrival.model';
import * as $ from 'jquery';
import { CtaResponse } from 'src/app/models/eta';
import { calculateEtaString } from '../train/utils/ctaUtils';

const trainColorMap = new Map([
  ['G', LineColor.green],
  ['Org', LineColor.orange],
  ['Blue', LineColor.blue],
  ['Red', LineColor.red]
])

var TRAIN_DATA: CtaArrival[] = [
  new CtaArrival(1, LineColor.orange, 'Loop', '2 min', 100, "10:20pm"),
  new CtaArrival(2, LineColor.green, 'Harlem/Lake', '5 min 30 seconds', 50, "10:34pm"),
  new CtaArrival(3, LineColor.red, 'Loop', '10 min', 24, "10:43pm"),
  new CtaArrival(3, LineColor.blue, 'Loop', '15 min and 10 seconds', 12, "10:50pm"),
];

const etaProgressSeconds = 600; // 10 minutes

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
    manageClock();
    setInterval(() => { 
      this.getEtas(); 
    }, 5000);
  }

  getEtas() {
    this.trainService.getTrains().subscribe(data => {
      var etas = data as CtaResponse;
      var trainDataEtas = etas.ctatt.eta;
      // console.log(trainData);
      var pos = 1;
      const updatedTrains = _.map(trainDataEtas, function(eta) {
        var estArrivalTime = eta.arrT
        var arrivalPct = getArrivalPercentage(estArrivalTime)
        return new CtaArrival(
          ++pos,
          trainColorMap.get(eta.rt),
          eta.destNm,
          calculateEtaString(estArrivalTime),
          arrivalPct < 0 ? 0 : arrivalPct,
          new Date(estArrivalTime).toLocaleTimeString()
        )
      })

      // TRAIN_DATA.push(newTrain);  
      // this.dataSource = updatedTrains;
      this.trains = updatedTrains;
      this.stationName = data.name
   });
  }

}

function manageClock() {
  // Javascript is used to set the clock to your computer time.
  var currentSec = getSecondsToday();

  var seconds = (currentSec / 60) % 1;
  var minutes = (currentSec / 3600) % 1;
  var hours = (currentSec / 43200) % 1;

  setTime(60 * seconds, "second");
  setTime(3600 * minutes, "minute");
  setTime(43200 * hours, "hour");
}

function setTime(left, hand) {
  $(".clock__" + hand).css("animation-delay", "" + left * -1 + "s");
}

function getSecondsToday() {
  let now = new Date();

  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now.valueOf() - today.valueOf(); 
  return Math.round(diff / 1000);
}

function getArrivalPercentage(eta: string) {
  var estArrivalTime = new Date(eta).getTime();
  var currTime = new Date().getTime();
  var diff = estArrivalTime - currTime;
  var seconds = Math.round(diff / 1000);
  var etaPercentage = (etaProgressSeconds - seconds) / etaProgressSeconds;
  return Math.round(etaPercentage * 100)
}
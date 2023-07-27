import { Component, OnInit } from '@angular/core';
import { TrainService } from '../../service/train.service';
import * as _ from "lodash"
import { CtaArrival, LineColor } from '../../model/arrival.model';
import { CtaResponse } from '../../model/eta';
import { calculateEtaString } from '../../service/util/ctaUtils';

const trainColorMap = new Map([
  ['G', LineColor.green],
  ['Org', LineColor.orange],
  ['Blue', LineColor.blue],
  ['Red', LineColor.red]
])

// mock train data
// var TRAIN_DATA: CtaArrival[] = [
//   new CtaArrival(1, LineColor.orange, 'Loop', '2 min', 100, "10:20pm"),
//   new CtaArrival(2, LineColor.green, 'Harlem/Lake', '5 min 30 seconds', 50, "10:34pm"),
//   new CtaArrival(3, LineColor.red, 'Loop', '10 min', 24, "10:43pm"),
//   new CtaArrival(3, LineColor.blue, 'Loop', '15 min and 10 seconds', 12, "10:50pm"),
// ];

const etaProgressSeconds = 600; // 10 minutes

@Component({
  selector: 'app-arrivals-ui',
  templateUrl: './arrivals-ui.component.html',
  styleUrls: ['./arrivals-ui.component.scss']
})
export class ArrivalsUiComponent implements OnInit {
  trains: CtaArrival[];
  stationName: string;
  date:string;

  isTwelveHrFormat:false;
  constructor(
    private trainService: TrainService,
  ) {
    setInterval(() =>{
      const currentDate = new Date();
      this.date = currentDate.toLocaleTimeString();
    }, 1000);
    // this.trains = TRAIN_DATA;
  }
  
  ngOnInit(): void {
    setInterval(() => { 
      this.getEtas(); 
    }, 1000);
  }

  getEtas() {
    this.trainService.getTrains().subscribe(data => {
      var etas = data as CtaResponse;
      var trainDataEtas = etas.ctatt.eta;
      // console.log(trainData);
      var pos = 1;
      this.trains = _.map(trainDataEtas, function(eta) {
        var estArrivalTime = eta.arrT
        var arrivalPct = getArrivalPercentage(estArrivalTime)
        return new CtaArrival(
          ++pos,
          trainColorMap.get(eta.rt)!,
          eta.destNm,
          calculateEtaString(estArrivalTime),
          arrivalPct < 0 ? 0 : arrivalPct,
          new Date(estArrivalTime).toLocaleTimeString()
        )
      })
      this.stationName = data.name
   });
  }

}

function getArrivalPercentage(eta: string) {
  var estArrivalTime = new Date(eta).getTime();
  var currTime = new Date().getTime();
  var diff = estArrivalTime - currTime;
  var seconds = Math.round(diff / 1000);
  var etaPercentage = (etaProgressSeconds - seconds) / etaProgressSeconds;
  return Math.round(etaPercentage * 100)
}
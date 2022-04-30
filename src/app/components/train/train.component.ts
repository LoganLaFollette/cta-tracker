import { Component, OnInit } from '@angular/core';
import { CtaResponse } from 'src/app/models/eta';
import { TrainService } from './../../services/train.service';
import * as _ from "lodash"
import { calculateEtaString } from './utils/ctaUtils';
import { CtaArrival } from './arrival.model';

// var TRAIN_DATA: CtaArrival[] = [
//   // {position: "1", line: 'Orange', heading: 'Loop', eta: '2 min'},
//   // {position: "2", line: 'Green', heading: 'Harlem/Lake', eta: '5 min'},
//   // {position: "3", line: 'Red', heading: 'Loop', eta: '10 min'},
// ];

const trainColorMap = new Map([
  ['G', 'green'],
  ['Org', 'orange'],
  ['Blue', 'blue']
])

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  displayedColumns: string[] = ['position', 'line', 'heading', 'eta'];
  trains: CtaArrival[];
  // dataSource: CtaArrival[];

  constructor(
    private trainService: TrainService,
  ) {
    this.trains = [];
  }

  ngOnInit(): void {
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
        return new CtaArrival(
          ++pos,
          trainColorMap.get(eta.rt) as string,
          eta.destNm,
          calculateEtaString(estArrivalTime)
        )
      })

      // TRAIN_DATA.push(newTrain);  
      // this.dataSource = updatedTrains;
      this.trains = updatedTrains;
   });
  }

  public refresh() {
    window.location.reload();
  }

}

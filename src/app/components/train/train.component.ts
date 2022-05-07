import { Component, OnInit } from '@angular/core';
import { CtaResponse } from 'src/app/models/eta';
import { TrainService } from './../../services/train.service';
import * as _ from "lodash"
import { calculateEtaString } from './utils/ctaUtils';
import { CtaArrival, LineColor } from '../../models/arrival.model';

const trainColorMap = new Map([
  ['G', LineColor.green],
  ['Org', LineColor.orange],
  ['Blue', LineColor.blue]
])

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {
  displayedColumns: string[] = ['position', 'line', 'heading', 'eta'];
  trains: CtaArrival[];
  stationName: string;
  // dataSource: CtaArrival[];

  constructor(
    private trainService: TrainService,
  ) {
    this.trains = [];
  }

  ngOnInit(): void {
    setInterval(() => { 
        // this.getEtas(); 
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
          trainColorMap.get(eta.rt),
          eta.destNm,
          calculateEtaString(estArrivalTime)
        )
      })

      // TRAIN_DATA.push(newTrain);  
      // this.dataSource = updatedTrains;
      this.trains = updatedTrains;
      this.stationName = data.name
   });
  }

  public refresh() {
    window.location.reload();
  }

}

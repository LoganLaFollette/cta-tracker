import { Component, OnInit } from '@angular/core';
import { TrainService } from './../../services/train.service';

export interface TrainData {
  position: string;
  line: string;
  heading: string;
  eta: string;
}

const ELEMENT_DATA: TrainData[] = [
  {position: "1", line: 'Orange', heading: 'Loop', eta: '2 min'},
  {position: "2", line: 'Green', heading: 'Harlem/Lake', eta: '5 min'},
  {position: "3", line: 'Red', heading: 'Loop', eta: '10 min'},
];

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {
  displayedColumns: string[] = ['position', 'line', 'heading', 'eta'];
  trains;
  trainColorMap: Map<string, string> = new Map<string, string>();
  dataSource: TrainData[];

  constructor(
    private trainService: TrainService,
  ) { }

  ngOnInit(): void {

    

    this.trainColorMap.set('G', 'green');
    this.trainColorMap.set('Org', 'orange');
    this.dataSource = ELEMENT_DATA;
    //this.dataSource = [];

    this.trainService.getTrains().subscribe( data => {
      console.log(data.ctatt.eta);
      this.trains = data.ctatt.eta;
      for (var train in this.trains) {
        var eta = this.trains[train].arrT
        var timeEnd = new Date(eta).getTime();
        var timeStart = new Date().getTime();
        var hourDiff = timeEnd - timeStart; //in ms
        var secDiff = hourDiff / 1000; //in s
        var minDiff = hourDiff / 60 / 1000; //in minutes

        
        if (minDiff > 1) {
          this.trains[train].arrT = Math.round(minDiff) + " min";
        } else {
          this.trains[train].arrT = Math.round(secDiff) + " secs";
        }

        this.dataSource.push({
          position: train,
          line: this.trainColorMap.get(this.trains[train].rt),
          heading: this.trains[train].destNm,
          eta: this.trains[train].arrT
        });      
  
      }
   });
  }

}

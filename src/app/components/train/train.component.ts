import { Component, OnInit } from '@angular/core';
import { TrainService } from './../../services/train.service';


export interface TrainData {
  position: number;
  line: string;
  heading: string;
  eta: string;
}

var TRAIN_DATA: TrainData[] = [
  // {position: "1", line: 'Orange', heading: 'Loop', eta: '2 min'},
  // {position: "2", line: 'Green', heading: 'Harlem/Lake', eta: '5 min'},
  // {position: "3", line: 'Red', heading: 'Loop', eta: '10 min'},
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
    this.trains = [];
    this.refreshData();
    var interval = setInterval(() => { 
        this.refreshData(); 
    }, 5000);
  }

  refreshData() {
    this.trainService.getTrains().subscribe( data => {
      var trainData = data["ctatt"].eta;
      var updatedTrains = [];
      console.log(trainData);
      var position = 1;
      for (var train in trainData) {

        var newTrain = {
          position: null,
          line: null,
          heading: null,
          eta: null
        };
        
        var eta = trainData[train].arrT
        var estArrivalTime = new Date(eta).getTime();
        var currTime = new Date().getTime();
        // get total seconds between the times
        var delta = Math.abs(estArrivalTime - currTime) / 1000;
        // calculate (and subtract) whole days - should never really use days or hours
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        // what's left is seconds
        var seconds = Math.floor(delta % 60);  // in theory the modulus is not required
        
        var arrivalTime =  minutes === 0 ? seconds + " seconds" : minutes + " min and " + seconds + " seconds";
        newTrain["position"] = position;
        newTrain["line"] = this.trainColorMap.get(trainData[train].rt);
        newTrain["heading"] = trainData[train].destNm;
        newTrain["eta"] = arrivalTime;

        updatedTrains.push(newTrain);
        TRAIN_DATA.push(newTrain);  
        this.dataSource = [...this.trains];
        position++;
      }

      this.trains = updatedTrains;
   });
  }

  public refresh() {
    window.location.reload();
  }

}

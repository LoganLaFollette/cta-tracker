import { Component, OnInit } from '@angular/core';
import { TrainService } from './../../services/train.service';

export interface PeriodicElement {
  position: number;
  line: string;
  heading: string;
  eta: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, line: 'Orange', heading: 'Loop', eta: '2 min'},
  {position: 2, line: 'Green', heading: 'Harlem/Lake', eta: '5 min'},
  {position: 3, line: 'Red', heading: 'Loop', eta: '10 min'},
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
  dataSource: PeriodicElement[];

  constructor(
    private trainService: TrainService,
  ) { }

  ngOnInit(): void {
    this.trainColorMap.set('G', 'green');
    this.trainColorMap.set('Org', 'orange');
    this.dataSource = ELEMENT_DATA;
    
    this.trainService.getTrains().subscribe( data => {
      console.log(data.ctatt.eta);
      this.trains = data.ctatt.eta;
   });
  }

}

import { Component, HostBinding, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TrainService } from './service/train.service';
import { CtaResponse } from './model/eta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  toggleControl = new UntypedFormControl(false);
  title = 'cta-tracker';
  stopName:String = '';

  constructor(
    private trainService: TrainService,
  ) {}

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
    });

    this.trainService.getTrains().subscribe(data => {
      var etas = data as CtaResponse;
      this.stopName = data.name;
    });
  }
}

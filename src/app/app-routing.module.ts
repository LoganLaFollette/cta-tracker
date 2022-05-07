import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrivalsUiComponent } from './components/arrivals-ui/arrivals-ui.component';
import { TrainComponent } from './components/train/train.component';


const routes: Routes = [
  { path: '', component: TrainComponent },
  { path: 'uiUnstable', component: ArrivalsUiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

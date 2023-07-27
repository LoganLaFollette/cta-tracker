import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrivalsUiComponent } from './components/arrivals-ui/arrivals-ui.component';


const routes: Routes = [
  { path: '', component: ArrivalsUiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

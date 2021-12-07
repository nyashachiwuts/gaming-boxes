import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxDetailComponent } from './box-detail/box-detail.component';

const routes: Routes = [{
  path: 'box/:id',
  component: BoxDetailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

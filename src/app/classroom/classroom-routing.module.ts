import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomDetailComponent } from './components/classroom-detail/classroom-detail.component';

const routes: Routes = [
  { path: 'detail', component: ClassroomDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}

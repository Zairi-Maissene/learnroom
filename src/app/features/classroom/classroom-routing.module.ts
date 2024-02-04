import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomsPageComponent } from './pages/classrooms-page/classrooms-page.component';

const routes: Routes = [{ path: '', component: ClassroomsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}

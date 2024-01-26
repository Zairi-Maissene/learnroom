import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassroomDetailComponent} from './components/classroom-detail/classroom-detail.component';
import {ClassroomListComponent} from "./components/classroom-list/classroom-list.component";

const routes: Routes = [
  { path: '', component: ClassroomListComponent },
  { path: ':id', component: ClassroomDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}

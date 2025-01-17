import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponentComponent } from './user-component/user-component.component';
import { UserService } from '../../services/user.service';

const routes: Routes = [
  { path: '', component: UserComponentComponent },
  // {path:  'userDetails', component: UserDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    UserComponentComponent,
    // UserDetailsComponent,
    CommonModule,
  ],
  providers: [
    UserService,
  ],

})
export class UsersModuleModule {}

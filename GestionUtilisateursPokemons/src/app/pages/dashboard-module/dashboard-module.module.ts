import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { PokemonService } from '../../services/pokemon.service';

const routes: Routes = [
  { path: '', component: DashboardComponentComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    DashboardComponentComponent,
    CommonModule,
    HttpClientModule,

    ],
   providers: [
      PokemonService,
    ],
    exports: [RouterModule],
})
export class DashboardModuleModule {}

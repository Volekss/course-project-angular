import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {HomeComponent} from './core/home/home.component';
import {ErrorPageComponent} from './core/error-page/error-page.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', component: ShoppingListComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }

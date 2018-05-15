import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/ngrx-store/shopping-list.actions';
import {Observable} from 'rxjs';
import * as fromRecipe from '../ngrx-store/recipe.reducers';
import * as RecipeActions from '../ngrx-store/recipe.actions';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }


  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: fromRecipe.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      });


  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipes(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) {
  }


  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}

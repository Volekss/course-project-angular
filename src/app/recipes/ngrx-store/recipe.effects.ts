import {Actions, Effect} from '@ngrx/effects';

import * as RecipeActions from '../ngrx-store/recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../ngrx-store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://ng-recipe-book-volekss.firebaseio.com/recipes.json', {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (recipes) => {
        for (const recipe of recipes) {
          if (! recipe['shoppingListState']) {
            console.log(recipe);
            recipe['shoppingListState'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    ));

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(withLatestFrom(this.store.select('recipes')), switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://ng-recipe-book-volekss.firebaseio.com/recipes.json',
        state.recipes, {reportProgress: true});

      return this.httpClient.request(req);
    }));


  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}

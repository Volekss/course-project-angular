import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class DataStorageService {

  constructor(private recipeService: RecipeService, private slService: ShoppingListService, private http: Http) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-volekss.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  storeIngredients() {
    return this.http.put('https://ng-recipe-book-volekss.firebaseio.com/shopping-list.json', this.slService.getIngredients());
  }

/*
  getRecipes() {
    this.http.get('https://ng-recipe-book-volekss.firebaseio.com/recipes.json')
      .subscribe(
        (response) => {
          const  recipes: Recipe[] = response.json();
          this.recipeService.setRecipes(recipes);
        }
      );
  }
*/


  getRecipes() {
    this.http.get('https://ng-recipe-book-volekss.firebaseio.com/recipes.json')
      .map(
        (responce) => {
          const  recipes: Recipe[] = responce.json();
          for (const recipe of recipes) {
            if (! recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {

          this.recipeService.setRecipes(recipes);
        }
      );
  }


/*
  getRecipes() {
    this.http.get('https://ng-recipe-book-volekss.firebaseio.com/recipes.json')
      .map(
        (response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipes['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipes(recipes);
        }
      );

  }
*/
}

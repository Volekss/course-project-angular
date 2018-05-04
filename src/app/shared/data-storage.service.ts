import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private recipeService: RecipeService, private slService: ShoppingListService, private http: Http,
              private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();


    return this.http.put('https://ng-recipe-book-volekss.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  storeIngredients() {
    return this.http.put('https://ng-recipe-book-volekss.firebaseio.com/shopping-list.json', this.slService.getIngredients());
  }


  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipe-book-volekss.firebaseio.com/recipes.json?auth=' + token)
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



}

import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipes/recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  constructor(private recipeService: RecipeService, private httpClient: HttpClient) { }

  storeRecipes() {
  const req = new HttpRequest('PUT', 'https://ng-recipe-book-volekss.firebaseio.com/recipes.json',
    this.recipeService.getRecipes(), {reportProgress: true});

  return this.httpClient.request(req);
  }




  getRecipes() {
    /*this.httpClient.get<Recipe[]>('https://ng-recipe-book-volekss.firebaseio.com/recipes.json?auth=' + token)*/
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-volekss.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (! recipe['shoppingListState']) {
              console.log(recipe);
              recipe['shoppingListState'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }



}

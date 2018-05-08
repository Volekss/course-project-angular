import { Injectable } from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  constructor(private recipeService: RecipeService, private slService: ShoppingListService, private httpClient: HttpClient,
              private authService: AuthService) { }

  storeRecipes() {
/*
    return this.httpClient.put('https://ng-recipe-book-volekss.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
      observe: 'body',
        params: new HttpParams().set('auth', token)
       // headers: new HttpHeaders().set('Authorization', 'efqf')
    });
*/
  const req = new HttpRequest('PUT', 'https://ng-recipe-book-volekss.firebaseio.com/recipes.json',
    this.recipeService.getRecipes(), {reportProgress: true});

  return this.httpClient.request(req);
  }

  storeIngredients() {
    return this.httpClient.put('https://ng-recipe-book-volekss.firebaseio.com/shopping-list.json', this.slService.getIngredients());
  }


  getRecipes() {
    /*this.httpClient.get<Recipe[]>('https://ng-recipe-book-volekss.firebaseio.com/recipes.json?auth=' + token)*/
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-volekss.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
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

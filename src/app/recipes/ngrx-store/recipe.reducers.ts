import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../ngrx-store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes : [
  new Recipe('Nice Schnitel',
    'this is just a test',
    'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French fries', 20)
    ]),
  new Recipe('Another test recipe',
    'this is just a test',
    'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
    [
      new Ingredient('Buns', 2),
      new Ingredient('meet', 1)
    ])

]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type)  {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes

      };
    case (RecipeActions.DELETE_RECIPE):
      const deletedRecipes = [...state.recipes];
      deletedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: deletedRecipes
      };
    default:
      return state;
  }
}

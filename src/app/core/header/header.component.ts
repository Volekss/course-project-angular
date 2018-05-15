import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromApp from '../../ngrx-store/app.reducers';
import * as fromAuth from '../../auth/ngrx-store/auth.reducers';
import * as AuthActions from '../../auth/ngrx-store/auth.actions';
import * as RecipeActions from '../../recipes/ngrx-store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }


  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}

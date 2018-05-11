import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../ngrx-store/app.reducers';
import * as fromAuth from '../../auth/ngrx-store/auth.reducers';
import {Observable} from 'rxjs/Observable';
import * as AuthActions from '../../auth/ngrx-store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStorage: DataStorageService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }


  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSave() {
    this.dataStorage.storeRecipes()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );

  }

  onFetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}

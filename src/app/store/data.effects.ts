import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { UserDataService } from '../service/user-data.service';
import { GET_DATA, loadUserData } from './data.actions';

@Injectable()
export class UserDataEffects {
  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GET_DATA),
      switchMap(() =>
        this.userDataService.getUserData().pipe(
          map((data) => loadUserData({ user: data })),
          catchError(() => [])
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userDataService: UserDataService
  ) {}
}

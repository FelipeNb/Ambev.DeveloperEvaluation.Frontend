import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, tap, catchError, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private refresh$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  users$ = this._users$.asObservable();
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private svc: UsersService) {
    this.refresh$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(() => this.svc.list().pipe(
        catchError(err => { console.error(err); return of([]); })
      )),
    ).subscribe(list => { this._users$.next(list); this.loading$.next(false); });

    this.refresh();
  }

  refresh() { this.refresh$.next(); }

  create(u: Partial<User>) { return this.svc.create(u).pipe(tap(() => this.refresh())); }
  update(id: any, u: Partial<User>) { return this.svc.update(id, u).pipe(tap(() => this.refresh())); }
  delete(id: any) { return this.svc.delete(id).pipe(tap(() => this.refresh())); }
}

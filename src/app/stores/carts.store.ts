import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, tap, catchError, of } from 'rxjs';
import { CartsService } from '../services/carts.service';
import { Cart } from '../models/cart';

@Injectable({ providedIn: 'root' })
export class CartsStore {
  private refresh$ = new Subject<void>();
  private _items$ = new BehaviorSubject<Cart[]>([]);
  items$ = this._items$.asObservable();
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private svc: CartsService) {
    this.refresh$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(() => this.svc.list().pipe(
        catchError(err => { console.error(err); return of([]); })
      )),
    ).subscribe(list => { this._items$.next(list); this.loading$.next(false); });

    this.refresh();
  }

  refresh() { this.refresh$.next(); }

  create(c: Partial<Cart>) { return this.svc.create(c).pipe(tap(() => this.refresh())); }
  update(id: any, c: Partial<Cart>) { return this.svc.update(id, c).pipe(tap(() => this.refresh())); }
  delete(id: any) { return this.svc.delete(id).pipe(tap(() => this.refresh())); }
}

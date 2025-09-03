import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, tap, catchError, of } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductsStore {
  private refresh$ = new Subject<void>();
  private _items$ = new BehaviorSubject<Product[]>([]);
  items$ = this._items$.asObservable();
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private svc: ProductsService) {
    this.refresh$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(() => this.svc.list().pipe(
        catchError(err => { console.error(err); return of([]); })
      )),
    ).subscribe(list => { this._items$.next(list); this.loading$.next(false); });

    this.refresh();
  }

  refresh() { this.refresh$.next(); }

  create(p: Partial<Product>) { return this.svc.create(p).pipe(tap(() => this.refresh())); }
  update(id: any, p: Partial<Product>) { return this.svc.update(id, p).pipe(tap(() => this.refresh())); }
  delete(id: any) { return this.svc.delete(id).pipe(tap(() => this.refresh())); }
}

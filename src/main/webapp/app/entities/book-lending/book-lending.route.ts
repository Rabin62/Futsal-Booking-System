import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBookLending, BookLending } from 'app/shared/model/book-lending.model';
import { BookLendingService } from './book-lending.service';
import { BookLendingComponent } from './book-lending.component';
import { BookLendingDetailComponent } from './book-lending-detail.component';
import { BookLendingUpdateComponent } from './book-lending-update.component';

@Injectable({ providedIn: 'root' })
export class BookLendingResolve implements Resolve<IBookLending> {
  constructor(private service: BookLendingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBookLending> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bookLending: HttpResponse<BookLending>) => {
          if (bookLending.body) {
            return of(bookLending.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BookLending());
  }
}

export const bookLendingRoute: Routes = [
  {
    path: '',
    component: BookLendingComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'BookLendings',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BookLendingDetailComponent,
    resolve: {
      bookLending: BookLendingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BookLendings',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BookLendingUpdateComponent,
    resolve: {
      bookLending: BookLendingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BookLendings',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BookLendingUpdateComponent,
    resolve: {
      bookLending: BookLendingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BookLendings',
    },
    canActivate: [UserRouteAccessService],
  },
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILibrarian, Librarian } from 'app/shared/model/librarian.model';
import { LibrarianService } from './librarian.service';
import { LibrarianComponent } from './librarian.component';
import { LibrarianDetailComponent } from './librarian-detail.component';
import { LibrarianUpdateComponent } from './librarian-update.component';

@Injectable({ providedIn: 'root' })
export class LibrarianResolve implements Resolve<ILibrarian> {
  constructor(private service: LibrarianService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILibrarian> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((librarian: HttpResponse<Librarian>) => {
          if (librarian.body) {
            return of(librarian.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Librarian());
  }
}

export const librarianRoute: Routes = [
  {
    path: '',
    component: LibrarianComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Librarians',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LibrarianDetailComponent,
    resolve: {
      librarian: LibrarianResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Librarians',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LibrarianUpdateComponent,
    resolve: {
      librarian: LibrarianResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Librarians',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LibrarianUpdateComponent,
    resolve: {
      librarian: LibrarianResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Librarians',
    },
    canActivate: [UserRouteAccessService],
  },
];

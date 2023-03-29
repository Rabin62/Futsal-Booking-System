import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILibrary, Library } from 'app/shared/model/library.model';
import { LibraryService } from './library.service';
import { LibraryComponent } from './library.component';
import { LibraryDetailComponent } from './library-detail.component';
import { LibraryUpdateComponent } from './library-update.component';

@Injectable({ providedIn: 'root' })
export class LibraryResolve implements Resolve<ILibrary> {
  constructor(private service: LibraryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILibrary> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((library: HttpResponse<Library>) => {
          if (library.body) {
            return of(library.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Library());
  }
}

export const libraryRoute: Routes = [
  {
    path: '',
    component: LibraryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Libraries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LibraryDetailComponent,
    resolve: {
      library: LibraryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Libraries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LibraryUpdateComponent,
    resolve: {
      library: LibraryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Libraries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LibraryUpdateComponent,
    resolve: {
      library: LibraryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Libraries',
    },
    canActivate: [UserRouteAccessService],
  },
];

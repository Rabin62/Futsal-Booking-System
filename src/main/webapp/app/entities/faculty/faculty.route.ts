import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFaculty, Faculty } from 'app/shared/model/faculty.model';
import { FacultyService } from './faculty.service';
import { FacultyComponent } from './faculty.component';
import { FacultyDetailComponent } from './faculty-detail.component';
import { FacultyUpdateComponent } from './faculty-update.component';

@Injectable({ providedIn: 'root' })
export class FacultyResolve implements Resolve<IFaculty> {
  constructor(private service: FacultyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFaculty> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((faculty: HttpResponse<Faculty>) => {
          if (faculty.body) {
            return of(faculty.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Faculty());
  }
}

export const facultyRoute: Routes = [
  {
    path: '',
    component: FacultyComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Faculties',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FacultyDetailComponent,
    resolve: {
      faculty: FacultyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Faculties',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FacultyUpdateComponent,
    resolve: {
      faculty: FacultyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Faculties',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FacultyUpdateComponent,
    resolve: {
      faculty: FacultyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Faculties',
    },
    canActivate: [UserRouteAccessService],
  },
];

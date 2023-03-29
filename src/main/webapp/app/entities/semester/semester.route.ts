import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISemester, Semester } from 'app/shared/model/semester.model';
import { SemesterService } from './semester.service';
import { SemesterComponent } from './semester.component';
import { SemesterDetailComponent } from './semester-detail.component';
import { SemesterUpdateComponent } from './semester-update.component';

@Injectable({ providedIn: 'root' })
export class SemesterResolve implements Resolve<ISemester> {
  constructor(private service: SemesterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISemester> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((semester: HttpResponse<Semester>) => {
          if (semester.body) {
            return of(semester.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Semester());
  }
}

export const semesterRoute: Routes = [
  {
    path: '',
    component: SemesterComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Semesters',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SemesterDetailComponent,
    resolve: {
      semester: SemesterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Semesters',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SemesterUpdateComponent,
    resolve: {
      semester: SemesterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Semesters',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SemesterUpdateComponent,
    resolve: {
      semester: SemesterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Semesters',
    },
    canActivate: [UserRouteAccessService],
  },
];

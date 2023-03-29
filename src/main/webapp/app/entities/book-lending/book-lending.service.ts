import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBookLending } from 'app/shared/model/book-lending.model';

type EntityResponseType = HttpResponse<IBookLending>;
type EntityArrayResponseType = HttpResponse<IBookLending[]>;

@Injectable({ providedIn: 'root' })
export class BookLendingService {
  public resourceUrl = SERVER_API_URL + 'api/book-lendings';

  constructor(protected http: HttpClient) {}

  create(bookLending: IBookLending): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bookLending);
    return this.http
      .post<IBookLending>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  approve(bookLending: IBookLending): Observable<EntityResponseType> {
   /* const copy = this.convertDateFromClient(bookLending);*/
    return this.http
      .put<IBookLending>(`${this.resourceUrl}/return`,bookLending ,{ observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bookLending: IBookLending): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bookLending);
    return this.http
      .put<IBookLending>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBookLending>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBookLending[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(bookLending: IBookLending): IBookLending {
    const copy: IBookLending = Object.assign({}, bookLending, {
      reserveDate: bookLending.reserveDate ? bookLending.reserveDate.format(DATE_FORMAT) : undefined,
      dueDate: bookLending.dueDate ? bookLending.dueDate.format(DATE_FORMAT) : undefined,
      returnedDate: bookLending.returnedDate ? bookLending.returnedDate.format(DATE_FORMAT) : undefined,

    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reserveDate = res.body.reserveDate ? moment(res.body.reserveDate) : undefined;
      res.body.dueDate = res.body.dueDate ? moment(res.body.dueDate) : undefined;
     res.body.returnedDate = res.body.returnedDate ? moment(res.body.returnedDate) : undefined

    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bookLending: IBookLending) => {
        bookLending.reserveDate = bookLending.reserveDate ? moment(bookLending.reserveDate) : undefined;
        bookLending.dueDate = bookLending.dueDate ? moment(bookLending.dueDate) : undefined;
        bookLending.returnedDate = bookLending.returnedDate ? moment(bookLending.returnedDate) : undefined;

      });
    }
    return res;
  }
}

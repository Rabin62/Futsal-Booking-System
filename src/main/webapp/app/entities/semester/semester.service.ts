import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISemester } from 'app/shared/model/semester.model';

type EntityResponseType = HttpResponse<ISemester>;
type EntityArrayResponseType = HttpResponse<ISemester[]>;

@Injectable({ providedIn: 'root' })
export class SemesterService {
  public resourceUrl = SERVER_API_URL + 'api/semesters';
  public allResourceUrl = SERVER_API_URL + 'api/all-semesters';

  constructor(protected http: HttpClient) {}

  create(semester: ISemester): Observable<EntityResponseType> {
    return this.http.post<ISemester>(this.resourceUrl, semester, { observe: 'response' });
  }

  update(semester: ISemester): Observable<EntityResponseType> {
    return this.http.put<ISemester>(this.resourceUrl, semester, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISemester>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISemester[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  queryAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ISemester[]>(this.allResourceUrl, {  observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

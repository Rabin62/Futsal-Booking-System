import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFaculty } from 'app/shared/model/faculty.model';

type EntityResponseType = HttpResponse<IFaculty>;
type EntityArrayResponseType = HttpResponse<IFaculty[]>;

@Injectable({ providedIn: 'root' })
export class FacultyService {
  public resourceUrl = SERVER_API_URL + 'api/faculties';
  public allResourceUrl = SERVER_API_URL + 'api/all-faculties';

  constructor(protected http: HttpClient) {}

  create(faculty: IFaculty): Observable<EntityResponseType> {
    return this.http.post<IFaculty>(this.resourceUrl, faculty, { observe: 'response' });
  }

  update(faculty: IFaculty): Observable<EntityResponseType> {
    return this.http.put<IFaculty>(this.resourceUrl, faculty, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFaculty>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFaculty[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IFaculty[]>(this.allResourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

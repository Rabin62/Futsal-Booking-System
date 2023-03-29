import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILibrary } from 'app/shared/model/library.model';

type EntityResponseType = HttpResponse<ILibrary>;
type EntityArrayResponseType = HttpResponse<ILibrary[]>;

@Injectable({ providedIn: 'root' })
export class LibraryService {
  public resourceUrl = SERVER_API_URL + 'api/libraries';
  public allResourceUrl = SERVER_API_URL + 'api/all-libraries';

  constructor(protected http: HttpClient) {}

  create(library: ILibrary): Observable<EntityResponseType> {
    return this.http.post<ILibrary>(this.resourceUrl, library, { observe: 'response' });
  }

  update(library: ILibrary): Observable<EntityResponseType> {
    return this.http.put<ILibrary>(this.resourceUrl, library, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILibrary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILibrary[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryAll(): Observable<EntityArrayResponseType> {
    return this.http.get<ILibrary[]>(this.allResourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

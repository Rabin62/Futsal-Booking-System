import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILibrarian } from 'app/shared/model/librarian.model';
import {IBook} from "../../shared/model/book.model";

type EntityResponseType = HttpResponse<ILibrarian>;
type EntityArrayResponseType = HttpResponse<ILibrarian[]>;

@Injectable({ providedIn: 'root' })
export class LibrarianService {
  public resourceUrl = SERVER_API_URL + 'api/librarians';

  constructor(protected http: HttpClient) {}

  create(librarian: ILibrarian): Observable<EntityResponseType> {
    return this.http.post<ILibrarian>(this.resourceUrl, librarian, { observe: 'response' });
  }

  update(librarian: ILibrarian): Observable<EntityResponseType> {
    return this.http.put<ILibrarian>(this.resourceUrl, librarian, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILibrarian>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  findByLibraryId(libraryId: number): Observable<EntityArrayResponseType> {
    return this.http.get<ILibrarian[]>(`${this.resourceUrl + '/library'}/${libraryId}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILibrarian[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

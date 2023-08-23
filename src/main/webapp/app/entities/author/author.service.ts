import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAuthor } from 'app/shared/model/author.model';

type EntityResponseType = HttpResponse<IAuthor>;
type EntityArrayResponseType = HttpResponse<IAuthor[]>;

@Injectable({ providedIn: 'root' })
export class AuthorService {
  public resourceUrl = SERVER_API_URL + 'api/authors';
  public allResourceUrl = SERVER_API_URL + 'api/all-authors';


  constructor(protected http: HttpClient) {}

  create(author: IAuthor): Observable<EntityResponseType> {
    return this.http.post<IAuthor>(this.resourceUrl, author, { observe: 'response' });
  }
  submitFormData(author: IAuthor): Observable<EntityResponseType> {
    // Add any required headers here, e.g., authorization token

    return this.http.post<IAuthor>(this.resourceUrl, author, { observe: 'response' });
  }

  update(author: IAuthor): Observable<EntityResponseType> {
    return this.http.put<IAuthor>(this.resourceUrl, author, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAuthor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAuthor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IAuthor[]>(this.allResourceUrl, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

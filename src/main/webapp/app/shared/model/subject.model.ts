import { IFaculty } from 'app/shared/model/faculty.model';
import { IBook } from 'app/shared/model/book.model';
import {IBookLending} from "./book-lending.model";

export interface ISubject {
  id?: number;
  name?: string;
  subjectCode?: string;
  faculties?: IFaculty[];
  books?: IBook[];
  bookLendings?: IBookLending;
}

export class Subject implements ISubject {
  constructor(
    public id?: number,
    public name?: string,
    public subjectCode?: string,
    public faculties?: IFaculty[],
    public books?: IBook[],
    public bookLendings?: IBookLending
  ) {}
}

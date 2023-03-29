import {IBookLending} from "./book-lending.model";

export interface IStudent {
  id?: number;
  name?: string;
  address?: string;
  contactNo?: string;
  email?: string;
  semesterId?: number;
  semesterName?: string;
  bookLendings?: IBookLending[];


}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public contactNo?: string,
    public email?: string,
    public semesterId?: number,
    public semesterName?: string,
public bookLendings?: IBookLending[]
  ) {}
}

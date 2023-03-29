import { Moment } from 'moment';

export interface IBookLending {
  id?: number;
  reserveDate?: Moment;
  dueDate?: Moment;
  returnedDate?: Moment;
  note?: string;
  studentId?: number;
  bookId?: number;
  studentName?: string;
  bookName?: string;

}

export class BookLending implements IBookLending {
  constructor(
    public id?: number,
    public reserveDate?: Moment,
    public dueDate?: Moment,
    public note?: string,
    public studentId?: number,
    public bookId?: number,
    public studentName?: string,
    public bookName?: string,
    public   returnedDate?: Moment
  ) {}
}

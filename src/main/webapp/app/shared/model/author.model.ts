import { IBook } from 'app/shared/model/book.model';

export interface IAuthor {
  id?: number;
  name?: string;
  email? : string;
  image? : undefined;
}


export class Author implements IAuthor {
  constructor(public id?: number, public name?: string, public email? : string, public image? : undefined) {}
}

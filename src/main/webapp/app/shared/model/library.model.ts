import { ILibrarian } from 'app/shared/model/librarian.model';

export interface ILibrary {
  id?: number;
  name?: string;
  address?: string;
  contactNo?: string;
  librarians?: ILibrarian[];
}

export class Library implements ILibrary {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public contactNo?: string,
    public librarians?: ILibrarian[]
  ) {}
}

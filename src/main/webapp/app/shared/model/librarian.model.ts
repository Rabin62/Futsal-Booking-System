export interface ILibrarian {
  id?: number;
  name?: string;
  address?: string;
  contactNo?: string;
  email?: string;
  libraryId?: number;
  libraryName?: string;
}

export class Librarian implements ILibrarian {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public contactNo?: string,
    public email?: string,
    public libraryId?: number,
    public libraryName?: string
  ) {}
}

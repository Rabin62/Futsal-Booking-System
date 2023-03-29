export interface IBook {
  id?: number;
  name?: string;
  publication?: string;
  isbn?: string;
  edition?: string;
  isAssigned?: boolean;
  authorName?: string;
  authorId?: number;
  subjectId?: number;
  subjectName?:string;
  quantity?:number;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public name?: string,
    public publication?: string,
    public isbn?: string,
    public edition?: string,
    public isAssigned?: boolean,
    public authorId?: number,
    public subjectId?: number,
    public subjectName?: string,
    public authorName?: string,
 public  quantity?:number
  ) {
    this.isAssigned = this.isAssigned || false;
  }
}

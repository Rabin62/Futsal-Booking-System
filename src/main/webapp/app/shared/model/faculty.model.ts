import { ISubject } from 'app/shared/model/subject.model';

export interface IFaculty {
  id?: number;
  name?: string;
  subjects?: ISubject[];
}

export class Faculty implements IFaculty {
  constructor(public id?: number, public name?: string, public subjects?: ISubject[]) {}
}

export interface ISemester {
  id?: number;
  name?: string;
  facultyId?: number;
  facultyName?: string;
}

export class Semester implements ISemester {
  constructor(public id?: number, public name?: string, public facultyId?: number, public facultyName?: string) {}
}

import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from '../../../../../../main/webapp/app/shared/constants/input.constants';
import { BookLendingService } from '../../../../../../main/webapp/app/entities/book-lending/book-lending.service';
import { IBookLending, BookLending } from '../../../../../../main/webapp/app/shared/model/book-lending.model';

describe('Service Tests', () => {
  describe('BookLending Service', () => {
    let injector: TestBed;
    let service: BookLendingService;
    let httpMock: HttpTestingController;
    let elemDefault: IBookLending;
    let expectedResult: IBookLending | IBookLending[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BookLendingService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BookLending(0, currentDate, currentDate,  'AAAAAAA' );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            reserveDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            returnedDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a BookLending', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            reserveDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            returnedDate: currentDate.format(DATE_FORMAT),

          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reserveDate: currentDate,
            dueDate: currentDate,
            returnedDate: currentDate,
            note: 'BBBBBB',

          },
          returnedFromService
        );

        service.create(new BookLending()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BookLending', () => {
        const returnedFromService = Object.assign(
          {
            reserveDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            returnedDate: currentDate.format(DATE_FORMAT),

          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reserveDate: currentDate,
            dueDate: currentDate,
            returnedDate: currentDate,
            note: 'BBBBBB',

          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of BookLending', () => {
        const returnedFromService = Object.assign(
          {
            reserveDate: currentDate.format(DATE_FORMAT),
            dueDate: currentDate.format(DATE_FORMAT),
            returnedDate: currentDate.format(DATE_FORMAT),
            note: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            reserveDate: currentDate,
            dueDate: currentDate,
            returnedDate: currentDate,


          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a BookLending', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

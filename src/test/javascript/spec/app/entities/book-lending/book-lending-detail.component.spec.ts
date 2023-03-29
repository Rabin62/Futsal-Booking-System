import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { BookLendingDetailComponent } from 'app/entities/book-lending/book-lending-detail.component';
import { BookLending } from 'app/shared/model/book-lending.model';

describe('Component Tests', () => {
  describe('BookLending Management Detail Component', () => {
    let comp: BookLendingDetailComponent;
    let fixture: ComponentFixture<BookLendingDetailComponent>;
    const route = ({ data: of({ bookLending: new BookLending(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [BookLendingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BookLendingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BookLendingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bookLending on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bookLending).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { BookLendingUpdateComponent } from 'app/entities/book-lending/book-lending-update.component';
import { BookLendingService } from 'app/entities/book-lending/book-lending.service';
import { BookLending } from 'app/shared/model/book-lending.model';

describe('Component Tests', () => {
  describe('BookLending Management Update Component', () => {
    let comp: BookLendingUpdateComponent;
    let fixture: ComponentFixture<BookLendingUpdateComponent>;
    let service: BookLendingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [BookLendingUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BookLendingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BookLendingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BookLendingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BookLending(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BookLending();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

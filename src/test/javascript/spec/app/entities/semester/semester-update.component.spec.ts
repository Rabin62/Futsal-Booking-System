import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { SemesterUpdateComponent } from 'app/entities/semester/semester-update.component';
import { SemesterService } from 'app/entities/semester/semester.service';
import { Semester } from 'app/shared/model/semester.model';

describe('Component Tests', () => {
  describe('Semester Management Update Component', () => {
    let comp: SemesterUpdateComponent;
    let fixture: ComponentFixture<SemesterUpdateComponent>;
    let service: SemesterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [SemesterUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SemesterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SemesterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SemesterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Semester(123);
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
        const entity = new Semester();
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

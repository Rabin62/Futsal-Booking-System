import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LmsTestModule } from '../../../test.module';
import { FacultyUpdateComponent } from 'app/entities/faculty/faculty-update.component';
import { FacultyService } from 'app/entities/faculty/faculty.service';
import { Faculty } from 'app/shared/model/faculty.model';

describe('Component Tests', () => {
  describe('Faculty Management Update Component', () => {
    let comp: FacultyUpdateComponent;
    let fixture: ComponentFixture<FacultyUpdateComponent>;
    let service: FacultyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LmsTestModule],
        declarations: [FacultyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FacultyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacultyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacultyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Faculty(123);
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
        const entity = new Faculty();
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

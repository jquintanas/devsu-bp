import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { CoreService } from 'src/app/core/services/core.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close modal', () => {
    const core = TestBed.inject(CoreService);
    const coreSpy = spyOn(core, 'hideModal');
    component.cancelModal();
    expect(coreSpy).toHaveBeenCalled();
  });

  it('confirm', () => {
    const core = TestBed.inject(CoreService);
    const coreSpy = spyOn(core, 'nextModalState');
    component.confirm();
    expect(coreSpy).toHaveBeenCalled();
  });
});

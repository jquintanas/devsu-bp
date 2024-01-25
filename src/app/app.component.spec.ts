import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreService } from './core/services/core.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('sub true', () => {
      const coreService = TestBed.inject(CoreService);
      const spyCoreSubLoading = spyOn(coreService, 'subLoading').and.returnValue(of(true));
      const spySignalLoading = spyOn(component.showLoading, 'set');
      const spyCoreSubModal = spyOn(coreService, 'subModal').and.returnValue(of(true));
      const spySignalModal = spyOn(component.showModal, 'set')
      component.ngOnInit();
      expect(spyCoreSubLoading).toHaveBeenCalled();
      expect(spySignalLoading).toHaveBeenCalledOnceWith(true);
      expect(spyCoreSubModal).toHaveBeenCalled();
      expect(spySignalModal).toHaveBeenCalledOnceWith(true);
    });

    it('sub false', () => {
      const coreService = TestBed.inject(CoreService);
      const spyCoreSubLoading = spyOn(coreService, 'subLoading').and.returnValue(of(false));
      const spySignalLoading = spyOn(component.showLoading, 'set');
      const spyCoreSubModal = spyOn(coreService, 'subModal').and.returnValue(of(false));
      const spySignalModal = spyOn(component.showModal, 'set')
      component.ngOnInit();
      expect(spyCoreSubLoading).toHaveBeenCalled();
      expect(spySignalLoading).toHaveBeenCalledOnceWith(false);
      expect(spyCoreSubModal).toHaveBeenCalled();
      expect(spySignalModal).toHaveBeenCalledOnceWith(false);
    });
  });
});

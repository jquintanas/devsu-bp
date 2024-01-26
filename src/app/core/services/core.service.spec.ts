import { TestBed } from '@angular/core/testing';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';
import { ModalDismiss } from '../interfaces/modal.interface';

describe('CoreService', () => {
  let service: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Loading test', () => {
    it('return observable loading', () => {
      const subLoading = service.subLoading();
      expect(subLoading).toBeInstanceOf(Observable);
      expect(subLoading).toEqual(service['loading'].asObservable());
    });

    it('show loading', () => {
      service.showLoading();
      expect(service['loading'].value).toBe(true);
    });

    it('hide loading', () => {
      service.hideLoading();
      expect(service['loading'].value).toBe(false);
    });
  });

  describe('Modal test', () => {
    it('return observable modal', () => {
      const subModal = service.subModal();
      expect(subModal).toBeInstanceOf(Observable);
      expect(subModal).toEqual(service['modal'].asObservable());
    });

    it('show modal', () => {
      service.showModal();
      expect(service['modal'].value).toBe(true);
    });

    it('hide modal', () => {
      service.hideModal();
      expect(service['modal'].value).toBe(false);
    });
  });

  describe('Modal data', () => {
    it('next data', () => {
      const data: ModalDismiss = { status: "Ok" };
      service.nextModalState(data);
      expect(service['modalData'].value).toEqual(data);
    });

    it('return observable data modal', () => {
      const subModal = service.subModalData();
      expect(subModal).toBeInstanceOf(Observable);
      expect(subModal).toEqual(service['modalData'].asObservable());
    });

  });



  describe('alert', () => {

    it('show Alert', () => {
      const message = "Test message 1";
      const div = document.createElement("div");
      div.id = "snackbar";
      document.body.appendChild(div);
      const snackbar: any = document.getElementById("snackbar");
      service.showAlert(message);
      expect(snackbar.innerText).toBe(message);
      document.body.removeChild(div);
    });

    it('hide alert', () => {
      const message = "Test message 2";
      const div = document.createElement("div");
      div.id = "snackbar";
      document.body.appendChild(div);
      const setTimeoutSpy = spyOn(window, 'setTimeout');
      service.showAlert(message);
      expect(setTimeoutSpy).toHaveBeenCalled();
    });
  });
});

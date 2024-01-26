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
  });
});

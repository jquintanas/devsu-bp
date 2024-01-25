import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalDismiss } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  //#region private variables
  private loading = new BehaviorSubject(false);
  private modal = new BehaviorSubject(false);
  private modalData = new BehaviorSubject<ModalDismiss | undefined>(undefined);
  //#endregion

  //#region public methods
  public subLoading() {
    return this.loading.asObservable();
  }

  public showLoading() {
    this.loading.next(true);
  }

  public hideLoading() {
    this.loading.next(false);
  }

  public subModal() {
    return this.modal.asObservable();
  }

  public showModal() {
    this.modal.next(true);
  }

  public hideModal() {
    this.modal.next(false);
    this.clearModalState();
  }

  public nextModalState(data: ModalDismiss) {
    this.modalData.next(data);
  }

  public clearModalState() {
    this.modalData.next(undefined);
  }
  //#endregion
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalDismiss } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  //#region public variables
  public tituloProducto = "";
  //#endregion

  //#region private variables
  private loading = new BehaviorSubject(true);
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
    this.modalData.next(undefined);
  }

  public nextModalState(data: ModalDismiss) {
    this.modalData.next(data);
  }

  public subModalData() {
    return this.modalData.asObservable();
  }

  public showAlert(message: string) {
    const div: any = document.getElementById("snackbar");
    if (div) {
      div.classList = "show"
      div.innerText = message;
      setTimeout(() => {
        div.className = div.className.replace("show", "");
      }, 4000);
    }
  }
  //#endregion
}

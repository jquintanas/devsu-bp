import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public core: CoreService) { }

  //#region public methods
  public cancelModal() {
    this.core.hideModal()
  }

  public confirm() {
    this.core.nextModalState({ status: "Ok" });
  }
  //#endregion
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contextual-menu',
  templateUrl: './contextual-menu.component.html',
  styleUrls: ['./contextual-menu.component.scss']
})
export class ContextualMenuComponent {
  //#region angular communication component
  @Output("onDelete") eliminarEvent: EventEmitter<boolean> = new EventEmitter();
  @Output("onEdit") editarEvent: EventEmitter<boolean> = new EventEmitter();
  //#endregion

  //#region public methods
  public editarRegistro() {
    this.editarEvent.emit(true);
  }

  public deleteRegistro() {
    this.eliminarEvent.emit(true);
  }
  //#endregion
}

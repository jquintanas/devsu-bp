import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextualMenuComponent } from './contextual-menu/contextual-menu.component';
import { TableContentComponent } from './table-content/table-content.component';
import { LoadingComponent } from './loading/loading.component';
import { ModalComponent } from './modal/modal.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    ContextualMenuComponent,
    TableContentComponent,
    LoadingComponent,
    ModalComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableContentComponent,
    LoadingComponent,
    ModalComponent,
    AlertComponent
  ]
})
export class ComponentsModule { }

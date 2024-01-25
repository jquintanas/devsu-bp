import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CoreService } from './core/services/core.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //#region angular injetions
  private destroyRef = inject(DestroyRef)
  //#endregion

  //#region public variables
  public showLoading = signal(false);
  public showModal = signal(true);
  //#endregion

  constructor(private core: CoreService) {
  }

  //#region angular life cycle
  public ngOnInit() {
    this.core.subLoading().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      {
        next: val => {
          this.showLoading.set(val);
        }
      }
    );

    this.core.subModal().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      {
        next: val => {
          this.showModal.set(val);
        }
      }
    );
  }
  //#endregion
}

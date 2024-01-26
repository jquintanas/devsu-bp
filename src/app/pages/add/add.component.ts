import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoFinancieroListar, ProductoFinancieroRequest } from 'src/app/core/interfaces/producto.inteface';
import { BancaService } from 'src/app/core/services/banca.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  //#region public variables
  public form!: FormGroup;
  public minDay = "";
  public update = false;
  //#endregion

  //#region private variables
  private dataForm!: ProductoFinancieroListar;
  //#endregion

  constructor(
    private fb: FormBuilder,
    private banca: BancaService,
    private core: CoreService,
    private router: Router
  ) {
    const params = this.router.getCurrentNavigation()?.extras.state;
    const data: any = params ? params['data'] : null;
    this.dataForm = data;
    this.buildForm();
  }

  //#region angular life cycle
  ngOnInit() {
    if (this.router.url == "/add") {
      this.buildForm();
    } else if (this.router.url == "/edit" && this.dataForm) {
      this.buildFormWithData();
      this.update = true;
    } else {
      this.core.showAlert("Error, vista no configurada.");
      this.router.navigateByUrl("/home");
    }
  }
  //#endregion

  //#region public methods
  public actualizar() {
    this.core.showLoading();
    const revision = this.form.get("verificacion")?.value;
    const id = this.form.get("id")?.value;
    const { description, liberacion, name, logo } = this.form.value;
    const body: ProductoFinancieroRequest = {
      id,
      description,
      logo,
      name,
      date_release: liberacion,
      date_revision: revision
    }
    this.banca.updateProducto(body).subscribe(
      {
        next: () => {
          this.core.showAlert("Se actualizo el producto correctamente.");
          this.router.navigateByUrl("/home");
        },
        error: err => {
          console.error(err);
          this.core.hideLoading();
          this.core.showAlert("Error al actualizar el producto.")
        }
      }
    );
  }

  public enviar() {
    this.core.showLoading();
    const { id, description, liberacion, name, logo } = this.form.value;
    const revision = this.form.get("verificacion")?.value;
    this.banca.verificarId(id).subscribe(
      {
        next: resp => {
          if (!resp) {
            const body: ProductoFinancieroRequest = {
              id,
              description,
              logo,
              name,
              date_release: liberacion,
              date_revision: revision
            }
            this.insertProducto(body);
            return;
          }
          this.core.hideLoading();
        },
        error: err => {
          console.error(err);
          this.core.hideLoading();
          this.core.showAlert("Ocurrió un error al validar su ID.")
        }
      }
    );
  }

  public reiniciar() {
    if (this.router.url == "/add") {
      this.buildForm();
      return;
    }
    this.buildFormWithData();
  }

  public getErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control && (control.touched || control.dirty) && control.errors != null) {
      if (control.errors['required'] != null) {
        return "Este campo es requerido.";
      }
      if (control.errors['minlength'] != null) {
        return `Se requieren mínimo ${control.errors['minlength'].requiredLength} caracteres.`;
      }
      if (control.errors['maxlength'] != null) {
        return `Se requieren máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
      }
      if (control.errors['pattern'] != null) {
        return "No es una URL válida.";
      }
    }
    return "";
  }

  public updateFechaVerificacion(event: any) {
    const stringDate = event.target.value.split("-");
    if (stringDate.length == 3) {
      const anio = parseInt(stringDate[0], 10);
      const mes = parseInt(stringDate[1], 10) - 1;
      const dia = parseInt(stringDate[2], 10);
      const nextDate = new Date(anio, mes, dia);
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      this.form.get("verificacion")?.setValue(this.formatDateToString(nextDate));
      return;
    }
    this.form.get("verificacion")?.setValue("");
  }
  //#endregion

  //#region private methods
  private formatDateToString(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private buildForm() {
    const now = new Date();
    const nextDate = new Date();
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    this.form = this.fb.group(
      {
        id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
        logo: new FormControl('', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})+([/\w .-]*)*\/?$/)]),
        liberacion: new FormControl(this.formatDateToString(now), [Validators.required]),
        verificacion: new FormControl({ value: this.formatDateToString(nextDate), disabled: true }, [Validators.required])
      }
    );
    this.minDay = this.formatDateToString(now);
  }

  private buildFormWithData() {
    let nowDate = "";
    let nextDate = this.formatDateToString(this.dataForm.date_revision);
    if (this.dataForm.date_release >= new Date()) {
      nowDate = this.formatDateToString(this.dataForm.date_release);
    } else {
      nextDate = "";
    }
    this.form = this.fb.group(
      {
        id: new FormControl({ value: this.dataForm.id, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        name: new FormControl(this.dataForm.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        description: new FormControl(this.dataForm.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
        logo: new FormControl(this.dataForm.logo, [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})+([/\w .-]*)*\/?$/)]),
        liberacion: new FormControl(nowDate, [Validators.required]),
        verificacion: new FormControl({ value: nextDate, disabled: true }, [Validators.required])
      }
    );
    Object.keys(this.form.controls).forEach(e => {
      this.form.get(e)?.markAsTouched();
    });
    this.minDay = this.formatDateToString(new Date());
  }

  private insertProducto(body: ProductoFinancieroRequest) {
    this.banca.insertProducto(body).subscribe(
      {
        next: () => {
          this.core.showAlert("Se agrego el producto con éxito.")
          this.router.navigateByUrl("/home");
        },
        error: err => {
          console.error(err);
          this.core.hideLoading();
          this.core.showAlert("Error al ingresar el producto.")
        }
      }
    );
  }
  //#endregion

}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptor/token.interceptor';
import { ComponentsModule } from 'src/app/components/components.module';
import { CoreService } from 'src/app/core/services/core.service';
import { BancaService } from 'src/app/core/services/banca.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, ComponentsModule],
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('show loading', () => {
      const core = TestBed.inject(CoreService);
      const coreSpyShowLoading = spyOn(core, 'showLoading');
      component.ngOnInit();
      expect(coreSpyShowLoading).toHaveBeenCalled();
    });

    it('return data', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'getAllProductos').and.returnValue(of([]));
      const core = TestBed.inject(CoreService);
      const coreSpy = spyOn(core, 'hideLoading');
      component.ngOnInit();
      expect(component.productos().length).toBeGreaterThanOrEqual(0);
      expect(coreSpy).toHaveBeenCalled();
    });

    it('hide loading', () => {
      const banca = TestBed.inject(BancaService);
      spyOn(banca, 'getAllProductos').and.returnValue(throwError(() => { throw new Error('error') }));
      const error = spyOn(console, 'error');
      const core = TestBed.inject(CoreService);
      const coreSpy = spyOn(core, 'hideLoading');
      component.ngOnInit();
      expect(error).toHaveBeenCalled();
      expect(coreSpy).toHaveBeenCalled();
    });
  });

  it('redirect to add', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.addProduct();
    expect(routerSpy).toHaveBeenCalledWith('/add');
  });
});

import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor
      ],
      imports: [HttpClientModule]
    });
    interceptor = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('set authorId', () => {
    const request = new HttpRequest("GET", "bp/products", { Headers: new HttpHeaders() });
    const next = jasmine.createSpyObj("HttpHandler", ["handle"]);
    const nextRequest = request.clone(
      {
        setHeaders: { authorId: `${environment.authorId}` },
        url: `${environment.servidor}${request.url}`
      });
    interceptor.intercept(request, next);
    expect(next.handle).toHaveBeenCalledWith(nextRequest);
  });
});

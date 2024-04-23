import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('access_token');
  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: `${environment.apiBaseUrl}${req.url}`,
    });
  } else {
    authReq = req.clone({
      url: `${environment.apiBaseUrl}${req.url}`,
    });
  }

  return next(authReq);
};

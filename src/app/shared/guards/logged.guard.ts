import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return of(this.authService.isLoggedIn()).pipe(
      map((isLoggedIn: boolean) => {
        return this.validateLogin(isLoggedIn);
      })
    );
  }

  private validateLogin(isLoggedIn: boolean): boolean {
    const user = this.authService.getUser();

    let router = '/';
    if (user !== null && user !== undefined) {
      router = '/dashboard';
    }

    if (isLoggedIn) {
      this.router.navigate([router]);
      return false;
    }

    return true;
  }
}

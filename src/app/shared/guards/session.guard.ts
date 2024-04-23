import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return of(this.authService.isLoggedIn()).pipe(
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.canLoad();
  }
}

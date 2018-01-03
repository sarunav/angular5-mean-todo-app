import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class AccessGuard implements CanActivate {
//     constructor(
//               private authService: AuthService,
//               private router: Router
//             ) {}
//     canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
//     //   const requiresLogin = route.data.requiresLogin || false;
//     //   if (requiresLogin) {
//     //     // Check that the user is logged in...
//     //   }
//       if (!this.authService.getCurrentUser()) {
//               this.router.navigate(['login']);
//             }
//     }
//   }

// export class LoginActivate implements CanActivate {
//   constructor(
//       private authService: AuthService,
//       private router: Router
//     ) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean>|Promise<boolean>|boolean {
//     if (!this.authService.getCurrentUser()) {
//       this.router.navigate(['login']);
//     }
//     return true;
//   }
// }

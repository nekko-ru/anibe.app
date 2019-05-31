import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router, private user: UserService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    try {
      await this.user.getSelf();
      return true;
    } catch (error) {
      this.router.navigateByUrl('/login');
      return false;
    }
    // const token = await this.storage.get('token');

    // if (!token) {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // } else {
    //   return true;
    // }

  }
}

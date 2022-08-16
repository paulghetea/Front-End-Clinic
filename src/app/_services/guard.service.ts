import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../_modulo/menu';

import { LoginService } from './login.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{


  constructor(
    private login:LoginService,
    private menu:MenuService,
    private router:Router

  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
 
    let rpta= this.login.estaLogueado();

    if(!rpta){
      this.login.cerrarSesion();
      return false;
    }else{
      const helper= new JwtHelperService();
      let token= sessionStorage.getItem(environment.TOKEN_NAME)
      if(!helper.isTokenExpired(token)){
        let url=state.url;
        const decodedToken= helper.decodeToken(token)
        return this.menu.listarPorUsuario(decodedToken.user_name)
        .pipe(map((data:Menu[])=>{
          this.menu.setMenuCambio(data)

          let cont=0;
          for(let m of data){
            if(url.startsWith(m.url)){
              cont++;
              break;
            }
          }

          if(cont>0){
            return true;
          }else{
            this.router.navigate(['/pages/not-403'])
            return false
          }


        }));
      }else{
        this.login.cerrarSesion();
        return false;
      }
    }

  }
}

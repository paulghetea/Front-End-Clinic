import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Menu } from 'src/app/_modulo/menu';
import { LoginService } from 'src/app/_services/login.service';
import { MenuService } from 'src/app/_services/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];
  usuario: string;
  constructor(
    private menuService: MenuService,
    private router: Router,
    private ls:LoginService
    ) { }

  ngOnInit(): void {
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let tokenDecodificado =helper.decodeToken(token);
    this.usuario = tokenDecodificado.user_name;

    this.menuService.listarPorUsuario(this.usuario).subscribe(data => {
      this.menuService.setMenuCambio(data);
    });
    this.menuService.getMenuCambio().subscribe(
      x => this.menus = x
    );
  }

  navegar(url: string) {
    this.router.navigate([url]);
  }
  cerrarSesion(){
    this.ls.cerrarSesion();
  }

}

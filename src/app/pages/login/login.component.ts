import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup
  usuario: string
  password: string
  hide = true
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
    })

  }

  login() {
    this.loginService.cerrarSesion();

    this.usuario = this.form.value['username'];
    this.password = this.form.value['password'];

    //console.log(`usuario:${this.usuario} contraseña:${this.password}`);

    this.loginService.login(this.usuario, this.password).subscribe(data => {

      //console.log(data);

      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      this.router.navigate(['pages/inicio']);
    })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from 'src/app/_modulo/especialidad';
import { EspecialidadService } from 'src/app/_services/especialidad.service';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private especialidadService: EspecialidadService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('', [Validators.minLength(3)]),
      'descripcion': new FormControl('', [Validators.minLength(3)])
    });
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }

  initForm() {
    if (this.edicion) {
      this.especialidadService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idEspecialidad),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        })
      })
    }
  }

  operar() {
    let especialidad = new Especialidad;

    especialidad.idEspecialidad = this.form.value['id'];
    especialidad.nombre = this.form.value['nombre'];
    especialidad.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      this.especialidadService.modificar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.setEspecialidadCambio(data);
          this.especialidadService.setMensajeCambio("Se modifico");
        })
      })
      this.especialidadService.getMensajeCambio().subscribe(mensaje=>{
        this.snackBar.open(mensaje,"cerrar",{duration:2000})
      })
    }else{
      this.especialidadService.registrar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(data => {
          this.especialidadService.setEspecialidadCambio(data);
          this.especialidadService.setMensajeCambio("Se creo");
        })
      })
      this.especialidadService.getMensajeCambio().subscribe(mensaje=>{
        this.snackBar.open(mensaje,"cerrar",{duration:2000})
      })
    }

    this.router.navigate(['pages/especialidad']);
  }
}


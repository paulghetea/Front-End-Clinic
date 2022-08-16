import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Paciente } from 'src/app/_modulo/paciente';
import { PacientesService } from 'src/app/_services/pacientes.service';


@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {


  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private pacienteService: PacientesService, private snackBar : MatSnackBar) { }

  ngOnInit() : void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl('', [Validators.minLength(3)]),
      'apellidos': new FormControl('', [Validators.minLength(3)]),
      'dni': new FormControl('',[Validators.pattern(/(^[ABCDFGHJKLMNPQRSUVWabcdfghlmnpqrsuvw]([0-9]{7})([0-9A-Ja]$))|(^[0-9]{8}[A-Z]$)/), Validators.maxLength(9)]),
      'direccion': new FormControl('', [Validators.minLength(3)]),
      'telefono': new FormControl('', [Validators.maxLength(9), Validators.minLength(9),Validators.pattern(/(^[0-9]+$)/)]),//Validators.pattern(/(^[0-9]+$)/)]
      'email': new FormControl('', [Validators.email]),
    });
    //obtiene el parametro que tiene la ruta, te subscribes y guardas ese parámetro en este caso en una variable 'id'
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id']  != null;//cuando el id es distinto de null se vuelve true
      this.initForm();
    })

  }

  initForm() {
    if (this.edicion) {
      this.pacienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPaciente),
          'nombres': new FormControl(data.nombres, [Validators.minLength(3)]),
          'apellidos': new FormControl(data.apellidos, [Validators.minLength(3)]),
          'dni': new FormControl(data.dni,[Validators.pattern(/(^[ABCDFGHJKLMNPQRSUVWabcdfghlmnpqrsuvw]([0-9]{7})([0-9A-Ja]$))|(^[0-9]{8}[A-Z]$)/), Validators.maxLength(9)]),
          'direccion': new FormControl(data.direccion, [Validators.minLength(3)]),
          'telefono': new FormControl(data.telefono, [Validators.maxLength(9), Validators.minLength(9),Validators.pattern(/(^[0-9]+$)/)]),
          'email': new FormControl(data.email, [Validators.email]),
        });
      })
    }
  }

  aceptar() {

    let paciente = new Paciente();


    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.direccion = this.form.value['direccion'];
    paciente.telefono = this.form.value['telefono'];
    paciente.email = this.form.value['email'];


    /**
     * 1.Actualizamos el back con las actualizaciones del formulario
     * ()no queremos iterar sobre la data queremos
     * 2.Recobramos todos los pacientes
     */

    //cuando se hace el next

//recoger datos del formulario
    // si es edicion entonces llamamos a modificar y nos subscribirmos
    // volvemos a llamar a listar nos subscrbimos y empezamosa declarar nuestra variable subject

    // dentro de la subscripcion de modificar llamamos a listar ya actualizada
    //  y nos subcribimos y utilizamos la variable de tipo subject que está inicializada en el servicio
    //  tipo subject de u array paciente que a esa variable paciente le puedo hacer un método next
    //  cuando nos llegue la data va a anunciar a todos los que se subscriban a esa variable


    //Cuando mandamos modificar vamos a la base de datos y back a modificar y
    // nos contesta nos subscribimos luegovolveos a llamar al back
    //cuando nos responda el back guardamos esa lista en una variable de tipo subject
    //pacienteCambo es una variable subject cuando yo cambie su valor hago un método next
    //y entonces todos los que se subscriban a ese objeto van a recibir una notificación de que ha cambiado su valor

    if(this.edicion){
      this.pacienteService.modificar(paciente).subscribe(() =>{

        this.pacienteService.listar().subscribe(data=> {
          this.pacienteService.setPacienteCambio(data);

          this.pacienteService.setMensajeCambio("SE HA MODIFICADO");
        })
        this.pacienteService.getMensajeCambio().subscribe(mensaje=>{
          this.snackBar.open(mensaje,"cerrar", {duration : 1000})
        })
      });
    }else{
      this.pacienteService.registrar(paciente).pipe(switchMap(()=>{
        return this.pacienteService.listar();
      }))
      .subscribe(data => {
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajeCambio("SE HA REGISTRADO");
      })
      this.pacienteService.getMensajeCambio().subscribe(mensaje=>{
        this.snackBar.open(mensaje,"cerrar", {duration:1000})
      })
    }

    this.router.navigate(['/pages/paciente']);
  }

}





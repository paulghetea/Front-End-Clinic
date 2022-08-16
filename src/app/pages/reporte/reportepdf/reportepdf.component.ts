import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConsultaService } from 'src/app/_services/consulta.service';

@Component({
  selector: 'app-reportepdf',
  templateUrl: './reportepdf.component.html',
  styleUrls: ['./reportepdf.component.css']
})
export class ReportepdfComponent implements OnInit {

  constructor(private consultaService: ConsultaService,
    public dialogRef: MatDialogRef<ReportepdfComponent>,
    private router: Router) { }
  pdfSrc: any;
  ngOnInit(): void {
    this.verReporte();
  }
  verReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      //Crear un fichero ficticio
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        //console.log(this.pdfSrc);
      };
      reader.readAsArrayBuffer(data);
    });
  }
  cancelar() {
    this.dialogRef.close();
    this.router.navigate(['pages/reporte']);
  }
  descargarReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data); //Crear url temporal
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'Reporte Consultas.pdf';
      a.click();
    });
  }

}

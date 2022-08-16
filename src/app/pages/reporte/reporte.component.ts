import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/_services/consulta.service';
import { Chart} from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ReportepdfComponent } from './reportepdf/reportepdf.component';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  chart: any;
  tipo: string = 'bar';
  pdfSrc: any;

  constructor(private consultaService: ConsultaService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.dibujar();
  }

  dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
     let cantidades = data.map(x => x.cantidad);
     let fechas = data.map(x => x.fecha);
     this.chart = new Chart('canvas', {
      type: this.tipo,
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Cantidad',
            data: cantidades,
            borderColor: "#3cba9f",
            fill: false,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 0, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }],
        }
      }
    });
  });
  }

  cambiar(tipo: string){
    this.tipo = tipo;
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.dibujar();
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

  descargarReporte(){
    this.consultaService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data); //Crear url temporal
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
  }

  openDialog(): void {

    const dialogref = this.dialog.open(ReportepdfComponent, {

      width: '850px', //tamaño del dialogo

    });

  }

}

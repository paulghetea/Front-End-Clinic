import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Analitica } from 'src/app/_modulo/analitica';
import { AnaliticaService } from 'src/app/_services/analitica.service';
import { AnaliticaDialogoComponent } from './analitica-dialogo/analitica-dialogo.component';

@Component({
  selector: 'app-analitica',
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css']
})
export class AnaliticaComponent implements OnInit, AfterViewInit {

  firstLastButtons = true;
  id: number;
  origen: MatTableDataSource<Analitica>;
  columnasAMostrar: string[] = ['idAnalitica', 'nombre', 'descripcion', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private analiticaService: AnaliticaService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    this.analiticaService.listar().subscribe(data => {
      this.origen = new MatTableDataSource(data);

      this.analiticaService.getCambio().subscribe(data => {
        this.origen = new MatTableDataSource(data);
        this.origen.sort = this.sort;
        this.origen.paginator = this.paginator;
      })
    })
  }
  ngAfterViewInit() {
    this.origen.paginator = this.paginator;
    this.origen.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.origen.filter = filterValue.trim().toLowerCase();

    if (this.origen.paginator) {
      this.origen.paginator.firstPage();
    }
  }
  openDialog(analitica?: Analitica): void {

    const dialogo1 = this.dialog.open(AnaliticaDialogoComponent, {
      data: analitica
    });

  }

  eliminar(id:number){
    this.analiticaService.eliminar(id).subscribe({
      next:() => {
      this.analiticaService.listar().subscribe(data=>{
        this.analiticaService.setCambio(data);
        this.analiticaService.setMensajeCambio("ELIMINADO");
      })
    },

    error:()=>{
      this.snackBar.open("No se puede borrar, analítica asociada a una consulta", "cerrar", {duration: 1500});
    }
  })
    this.analiticaService.getMensajeCambio().subscribe(mensaje=>{
      this.snackBar.open(mensaje,"cerrar", {duration : 1000})
    })
  }

}


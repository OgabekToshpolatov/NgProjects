import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dialog:MatDialog,  private api:ApiService){}
  displayedColumns: string[] = ['productName', 'price', 'category', 'date','condition','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getAllProducts()
  }
  title = 'myapp';
  openDialog() {
    this.dialog.open(DialogComponent, {
       width:"30%"
    }).afterClosed().subscribe(res => {
      if(res ==="save"){
        this.getAllProducts();
      }
    });
  }

  getAllProducts(){
    return this.api.getProduct()
      .subscribe({
        next:(res) =>{
          this.dataSource = new MatTableDataSource(res) // bular table qilish uchun edi
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error:()=>{
          alert("Something went wrong ")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(res => {
      if(res ==="update"){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res) =>{
        alert("Product deleted succesfully")
        this.getAllProducts()
      },
      error:()=>{
        alert("Something went wrong while delete product")
      }
    })
  }
}
  export class ButtonOverviewExample {}

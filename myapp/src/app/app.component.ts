import { Component } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog:MatDialog){}
  title = 'myapp';
  openDialog() {
    this.dialog.open(DialogComponent, {
       width:"30%"
    });
  }
}
  export class ButtonOverviewExample {}

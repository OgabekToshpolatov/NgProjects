import { ApiService } from './../services/api.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

   condionProduct:string[] = ["New", "Second Hand", "B/Y"]
   productForm!:FormGroup
   actionBtn:string="Save"
   actionName:string="Add Product"
   constructor(
    private formBuilder:FormBuilder ,
    private api:ApiService,
    private matdialog:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any
    ) {}

   ngOnInit(): void {
   this.productForm = this.formBuilder.group({
      productName:["",Validators.required],
      category:["",Validators.required],
      condition:["",Validators.required],
      price:["",Validators.required],
      comment:["",Validators.required],
      date:["",Validators.required]
   })
   if(this.editData){
    this.actionBtn = "Update"
    this.actionName = "Update Product"
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['condition'].setValue(this.editData.condition);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
    this.productForm.controls['date'].setValue(this.editData.date);
   }
   }
   addProduct(){
    if(!this.editData)
    {
      if(this.productForm.valid){
        {
          this.api.postProduct(this.productForm.value)
          .subscribe({
            next:() => {
                alert("Product was added succesfully")
                this.productForm.reset() // agr next bolsa forma ichidag hamma valueni null qilib beradi
                this.matdialog.close("save") // agar next bolsa formani yopish vazifasini bajaradi.
            },
            error:() => {
                alert("Something went wrong while adding")
            }
          })
        }}
    }
    else{
      this.updateProduct()
    }
   }

   updateProduct(){
    this.api.putProduct(this.editData.id,this.productForm.value)
    .subscribe({
      next:(res) => {
       alert("Product update succesfully")
       this.productForm.reset()
       this.matdialog.close("update")

      },
      error:() =>{
       alert("Something went wrong while updating")
      }
    })
   }
}

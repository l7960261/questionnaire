import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnsenModule } from 'ngx-onsenui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OnsenModule, NgxDatatableModule],
  exports: [FormsModule, ReactiveFormsModule, OnsenModule, NgxDatatableModule],
  declarations: []
})
export class SharedModule {}

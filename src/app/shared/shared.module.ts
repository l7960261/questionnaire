import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnsenModule } from 'ngx-onsenui';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OnsenModule],
  exports: [FormsModule, ReactiveFormsModule, OnsenModule],
  declarations: []
})
export class SharedModule {}

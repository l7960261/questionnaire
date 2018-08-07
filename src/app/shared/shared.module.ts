import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnsenModule } from 'ngx-onsenui';

@NgModule({
  imports: [CommonModule, FormsModule, OnsenModule],
  exports: [FormsModule, OnsenModule],
  declarations: []
})
export class SharedModule {}

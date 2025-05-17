import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { HighlightDirective } from './highlight.directive';
import { CurrencyFormatPipe } from './currency-format.pipe';



@NgModule({
  declarations: [
    ButtonComponent,
    HighlightDirective,
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

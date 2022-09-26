import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormErrorComponent } from './form-error/form-error.component';
import { LoadingComponent } from './loading/loading.component';
import { ToneHexColorPipe } from './pipe/tone-hex-color.pipe';
import { LineSvgComponent } from './line-svg/line-svg.component';

@NgModule({
  declarations: [
    FormErrorComponent,
    LoadingComponent,
    ToneHexColorPipe,
    LineSvgComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  exports: [
    FormErrorComponent,
    LoadingComponent,
    MatIconModule,
    ToneHexColorPipe,
    LineSvgComponent
  ]
})
export class SharedModule { }
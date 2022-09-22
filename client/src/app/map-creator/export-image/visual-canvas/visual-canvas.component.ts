import { Block, Position } from '../../../core/shared/posts/map';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { GetLimitPoints } from '../../getLimitPoints';

@Component({
  selector: 'visual-canvas',
  templateUrl: './visual-canvas.component.html',
  styleUrls: ['./visual-canvas.component.scss']
})
export class VisualCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('showcase') showcase: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  public carregando: boolean = false;
  public blocks: Block[] = [];
  public closestPoint = new Position;
  public farestPoint = new Position;
  public width: number = 0;
  public height: number = 0;
  public spacingImageBorder: number = 60;

  constructor(public dialogRef: MatDialogRef<VisualCanvasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public getLimitPoints: GetLimitPoints) {
  }


  ngOnInit(): void {
    this.blocks = JSON.parse(JSON.stringify(this.data.blocks));

    var points = this.getLimitPoints.getClosestFartest(this.blocks);
    this.closestPoint = points.closestPoint;
    this.farestPoint = points.farestPoint;
    this.repositionBlock(this.blocks)
    this.width = this.farestPoint.x - this.closestPoint.x + this.spacingImageBorder + 14; // 14 = Considerar padding e borda
    this.height = this.farestPoint.y - this.closestPoint.y + this.spacingImageBorder + 14; // 14 = Considerar padding e borda
  }

  ngAfterViewInit(): void {
    this.generateImage()
  }

  generateImage() {
    this.carregando = true;
    setTimeout(() => {
      html2canvas(this.canvas.nativeElement).then(canvas => {
        this.showcase.nativeElement.src = canvas.toDataURL();
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'mapa-mental.png';
      });
      this.carregando = false
    }, 1000)
  }

  downloadImage() {
    this.downloadLink.nativeElement.click();
  }

  repositionBlock(blocks: Block[]) {
    blocks.forEach(b => {
      b.position.x -= this.closestPoint.x - this.spacingImageBorder / 2;
      b.position.y -= this.closestPoint.y - this.spacingImageBorder / 2;
      this.repositionBlock(b.blocks);
      return;
    });
  }
}

import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { startGame, stop, resize } from './assets/game';

@Component({
  selector: 'app-game',
  standalone: true,
  template: `
    <canvas #myCanvas style="border:none; background:white"></canvas>
  `,
  imports: [CommonModule]
})
export class AppGame implements AfterViewInit, OnDestroy {
  @ViewChild('myCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.initializeGame();
  }

  ngOnDestroy() {
    stop(); // ✅ call the imported `stop` function
  }

  initializeGame() {
    this.resizeCanvas();
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      stop(); // stop any previous game instance
      startGame(ctx, canvas); // ✅ correct usage
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 113;
    resize(canvas); // ✅ call the resize function from game.ts
  }
}

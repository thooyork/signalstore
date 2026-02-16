import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navigation } from './features/navigation/components/navigation/navigation';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {

}

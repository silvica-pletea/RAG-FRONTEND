import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from './shared/components/loading/loading';
import { ErrorList } from './shared/components/error-list/error-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading, ErrorList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  protected readonly title = signal('RAG-APP-FRONTEND');

}

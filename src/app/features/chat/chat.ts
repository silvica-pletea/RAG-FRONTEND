import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { RagService } from './services/rag-service';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  providers: [RagService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chat implements AfterViewInit{

  protected readonly chatService = inject(RagService);
  protected searchElement = viewChild.required<ElementRef<HTMLInputElement>>('search');

  ngAfterViewInit(): void {
    this.searchElement().nativeElement.focus({ preventScroll: true });
  }

  getAnswer(): void {
    const value = this.searchElement().nativeElement.value;
    this.searchElement().nativeElement.value = '';
    this.chatService.searchQuestion.set(value)
  }
}

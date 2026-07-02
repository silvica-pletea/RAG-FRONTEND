import { AfterContentInit, afterRenderEffect, ChangeDetectionStrategy, Component, ElementRef, input, viewChild } from '@angular/core';
import { MarkdownPipe } from '../pipes/markdown-pipe';
import { BaseRagService } from '../services/base-rag-service';

@Component({
  selector: 'app-chat',
  imports: [MarkdownPipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Chat implements AfterContentInit {

  readonly chatService = input.required<BaseRagService>();
  readonly header = input.required<string>();
  protected searchElement = viewChild.required<ElementRef<HTMLInputElement>>('search');
  protected scrollContainerElement = viewChild<ElementRef>('scrollContainer');

  constructor() {
    afterRenderEffect(() => {
      this.chatService().messages();
      this.scrollToBottom();
    });
  }

  ngAfterContentInit(): void {
    this.searchElement().nativeElement.focus({ preventScroll: true });
  }

  getAnswer(): void {
    if (this.chatService().isLoading()) {
      return;
    }
    const value = this.searchElement().nativeElement.value;
    this.searchElement().nativeElement.value = '';
    this.chatService().ask(value);
  }

  private scrollToBottom(): void {
    const el = this.scrollContainerElement()?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}

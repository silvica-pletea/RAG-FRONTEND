import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Chat } from './chat/chat';
import { HybridRagService } from './services/hybrid-rag-service';
import { SemanticRagService } from './services/semantic-rag-service';
import { BM25RagService } from './services/bm25-service';

@Component({
  selector: 'app-chat-container',
  imports: [ Chat ],
  template: `<section class="chat-container">
                <app-chat class="column" [chatService]="hybrid" header="Hybrid Search" />
            </section>`,
  styles: `.chat-container {
              display: flex;
              flex-direction: row;
              gap: 1rem;
              height: calc(100vh - 120px);
              max-width: 1400px;
              margin: 0 auto;
              padding: 1rem;
              box-sizing: border-box;
          }

          .column {
              flex: 1;
              min-width: 0; /* prevents overflow issues with flex children */
          }
        `,
  providers: [HybridRagService, SemanticRagService, BM25RagService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContainer {
  protected readonly hybrid = inject(HybridRagService);
  protected readonly semantic = inject(SemanticRagService);
  protected readonly bm25 = inject(BM25RagService);
}

import { Injectable } from '@angular/core';
import { BaseRagService } from './base-rag-service';

@Injectable()
export class BM25RagService extends BaseRagService {
  protected readonly type = 'bm25-search';
}

import { Injectable } from '@angular/core';
import { BaseRagService } from './base-rag-service';

@Injectable()
export class HybridRagService extends BaseRagService {
  protected readonly type = 'hybrid-search';
}

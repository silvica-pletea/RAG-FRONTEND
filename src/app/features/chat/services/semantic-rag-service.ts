import { Injectable } from '@angular/core';
import { BaseRagService } from './base-rag-service';

@Injectable()
export class SemanticRagService extends BaseRagService {
  protected readonly type = 'semantic-search';
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorService } from '../../services/error-service';
import { ErrorItem } from '../error-item/error-item';

@Component({
  selector: 'app-error-list',
  imports: [ErrorItem],
  templateUrl: './error-list.html',
  styleUrl: './error-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorList {
  protected readonly errorService = inject(ErrorService);
}

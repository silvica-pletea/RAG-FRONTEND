import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ErrorDetails } from '../../models/error-details';

@Component({
  selector: 'app-error-item',
  imports: [],
  templateUrl: './error-item.html',
  styleUrl: './error-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorItem {
  error = input.required<ErrorDetails>();
  remove = output<string>()
}

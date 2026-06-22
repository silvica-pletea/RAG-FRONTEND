import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error-item',
  imports: [],
  templateUrl: './error-item.html',
  styleUrl: './error-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorItem {
  error = input.required<string>();
}

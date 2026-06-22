import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-loading',
  imports: [],
  template: `
    @if(isLoading()) {
      <div class="overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: `
    /* overlay full-screen semi-transparent */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .spinner {
      border: 8px solid var(--spinner-border);
      border-top: 8px solid var(--primary-contrast);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loading {

  protected isLoading = inject(LoadingService).isLoading;

}

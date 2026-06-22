import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
    
  private counter = signal(0);
  isLoading = computed(() => this.counter() > 0);

  incrementCounter(): void {
    this.counter.update(count => count + 1);
  }

  decrementCounter(): void {
    this.counter.update(count => Math.max(0, count - 1))
  }
}

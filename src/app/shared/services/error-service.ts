import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ErrorDetails } from '../models/error-details';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  readonly #destroyRef = inject(DestroyRef);
  readonly #errors = signal<ErrorDetails[]>([]);
  readonly #dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();
  readonly #autoDismissTime = 5000;
  
  readonly errors = this.#errors.asReadonly();

  constructor() {
    // Clean up all timers when service is destroyed
    this.#destroyRef.onDestroy(() => this.#clearAllTimers());
  }
  handleGlobalError(error: unknown): void {
    // HTTP errors are already reported by the interceptor;
    if (error instanceof HttpErrorResponse) {
      return;
    }
    console.error(error);
    this.#add(error instanceof Error ? error.message : 'An unexpected error occurred');
  }

  handleHttpError(error: HttpErrorResponse): void {
    this.#add(getErrorMessage(error), error.status);
  }
  remove(id: string): void {
    const timer = this.#dismissTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.#dismissTimers.delete(id);
    }
    this.#errors.update(errors => errors.filter(e => e.id !== id));
  }
  
  #scheduleAutoDismiss(id: string): void {
    const timer = setTimeout(() => this.remove(id), this.#autoDismissTime);
    this.#dismissTimers.set(id, timer);
  }

  #add(message: string, status?: number): void {
    const error: ErrorDetails = {
      id: crypto.randomUUID(),
      message,
      status,
      timestamp: new Date()
    };
    this.#errors.update(errors => [...errors, error]);
    this.#scheduleAutoDismiss(error.id);
  }

  #clearAllTimers(): void {
    this.#dismissTimers.forEach(clearTimeout);
    this.#dismissTimers.clear();
  }
}

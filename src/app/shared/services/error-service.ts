import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ErrorDetails } from '../models/error-details';
import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _errors = signal<ErrorDetails[]>([]);
  readonly errors = this._errors.asReadonly();

  private readonly _dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly _autoDismissTime = 5000;

  constructor() {
    // Clean up all timers when service is destroyed
    this._destroyRef.onDestroy(() => this.clearAllTimers());
  }

  handleGlobalError(error: unknown): void {
    // HTTP errors are already reported by the interceptor;
    if (error instanceof HttpErrorResponse) {
      return;
    }
    console.error(error);
    this.add(error instanceof Error ? error.message : 'An unexpected error occurred');
  }

  handleHttpError(error: HttpErrorResponse): void {
    this.add(getErrorMessage(error), error.status);
  }

  remove(id: string): void {
    const timer = this._dismissTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this._dismissTimers.delete(id);
    }
    this._errors.update(errors => errors.filter(e => e.id !== id));
  }
  
  private scheduleAutoDismiss(id: string): void {
    const timer = setTimeout(() => this.remove(id), this._autoDismissTime);
    this._dismissTimers.set(id, timer);
  }

  private add(message: string, status?: number): void {
    const error: ErrorDetails = {
      id: crypto.randomUUID(),
      message,
      status,
      timestamp: new Date()
    };
    this._errors.update(errors => [...errors, error]);
    this.scheduleAutoDismiss(error.id);
  }

  private clearAllTimers(): void {
    this._dismissTimers.forEach(clearTimeout);
    this._dismissTimers.clear();
  }
}

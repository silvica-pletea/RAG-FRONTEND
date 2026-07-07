import { HttpClient, HttpContext } from '@angular/common/http';
import { DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Message, MessageResponse } from '../models/message';
import { SKIP_SPINNER } from '../../../shared/constants/constants';
import { environment } from '@environments/environment';

export abstract class BaseRagService {
  readonly #httpClient = inject(HttpClient);
  readonly #destroyRef = inject(DestroyRef);

  readonly #apiUrl = environment.apiUrl;
  readonly #messages = signal<Message[]>([]);
  readonly messages = this.#messages.asReadonly();
  readonly #isLoading = signal(false);
  readonly isLoading = this.#isLoading.asReadonly();
  

  protected abstract readonly type: string;

  /** Sends a question to the RAG backend and appends its answer to the message list. */
  ask(question: string): void {
    const query = question.trim();
    if (!query) return;

    this.#messages.update((messages) => [...messages, { question: query, answer: null, isCompleted: false }]);
    this.#isLoading.set(true);

    this.#httpClient
      .post<MessageResponse>(
        `${this.#apiUrl}/chat`,
        { question: query, type: `${this.type}`},
        { context: new HttpContext().set(SKIP_SPINNER, true) },
      )
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (response) => this.completeLast(response.answer),
        error: () => this.completeLast(null),
      });
  }

  /** Marks the most recent message complete with the given answer and clears the loading flag. */
  private completeLast(answer: string | null): void {
    this.#isLoading.set(false);
    this.#messages.update((messages) =>
      messages.map((msg, i) => (i === messages.length - 1 ? { ...msg, answer, isCompleted: true } : msg)),
    );
  }
}

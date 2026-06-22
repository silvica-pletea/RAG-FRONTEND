import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap, tap } from 'rxjs';
import { Message, MessageResponse } from '../models/message';

@Injectable()
export class RagService {
    private readonly httpClient = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8000';
    
    private readonly _messages = signal<Message[]>([]);
    
    searchQuestion = signal<string | null>(null);
    // 'What happened with INC-2023-04-011?'
    constructor() {
      toObservable(this.searchQuestion).pipe(
        filter(query => query !== null && query.trim().length > 0),
        tap((query) => {
          if(query) {
            this._messages.update(messages => [...messages, { question: query, answer: null } ])
          }
          this.searchQuestion.set(null);
        }),
        switchMap(query =>
          this.httpClient.post<MessageResponse>(`${this.apiUrl}/chat`, { question: query })
        ),
        takeUntilDestroyed()
      ).subscribe(response => {
        this._messages.update(messages =>
          messages.map((msg, index) =>
            index === messages.length - 1
              ? { ...msg, answer: response?.answer }
              : msg
          )
        );
      });
    }
    
    get messages(): Signal<Message[]> {
      return this._messages.asReadonly();
    }
}

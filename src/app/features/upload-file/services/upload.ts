import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { updateProperty } from '../../../shared/utils';
import { finalize } from 'rxjs';
import { DEFAULT_UPLOAD, Upload } from '../models/upload';
import { environment } from '@environments/environment';

@Injectable()
export class UploadService {

  readonly #httpClient = inject(HttpClient);
  readonly #destroyRef = inject(DestroyRef);
  
  readonly #apiUrl = environment.apiUrl;
  readonly #file = signal<Upload>(DEFAULT_UPLOAD);

  getFile(): Signal<Upload> {
    return this.#file.asReadonly();
  }
  setFile(file: File | null): void {
    if(!file) {
      this.reset();
    } else {
      /* validate file extension and size */
      const errors = [];
      const isValidPdf = file.name.toLowerCase().endsWith('.pdf') && file.type === 'application/pdf';
      if(!isValidPdf) {
        errors.push("File type not allowed!")
      }
      if(file.size > 10 * 1024 * 1024) {
        errors.push('File size exceeds the limit!');
      }
      this.#file.set({...DEFAULT_UPLOAD, file: file, errors: errors});
    }
  }
  upload(): void {
    const data: FormData = new FormData();
    const dataFile = this.#file().file;
    if(dataFile)
      data.append('file', dataFile);
    updateProperty(this.#file, 'uploading', true);
    this.#httpClient.post(`${this.#apiUrl}/files/upload`, data, { reportProgress: true, observe: 'events'})
      .pipe(
        finalize(() => {
          updateProperty(this.#file, 'uploading', false);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({
        next: (event: HttpEvent<unknown>) => {
          if(event.type === HttpEventType.UploadProgress) {
            const progress = Math.round(
              100 * event.loaded / (event.total || 1)
            );
            updateProperty(this.#file, 'progress', progress);
          } else if (event.type === HttpEventType.Response) {
            updateProperty(this.#file, 'completed', true);
          }
        },
        error: () => {
          updateProperty(this.#file, 'progress', 0);
          updateProperty(this.#file, 'completed', false);
        }
      });
  }

  reset(): void {
    this.#file.set(DEFAULT_UPLOAD);
  }
}

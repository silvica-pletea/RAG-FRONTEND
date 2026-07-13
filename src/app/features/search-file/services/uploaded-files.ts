import { HttpClient } from "@angular/common/http";
import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DEFAULT_UPLOADED_FILES, UploadedFiles } from "../models/uploaded-files";
import { environment } from '@environments/environment';

@Injectable()
export class UploadedFilesService {

    readonly #httpClient = inject(HttpClient);
    readonly #destroyRef = inject(DestroyRef);

    readonly #apiUrl = environment.apiUrl;
    readonly #uploadedFiles = signal<UploadedFiles>(DEFAULT_UPLOADED_FILES);
    
    readonly filterBy = signal<string>('')
    filteredUploadedFiles = computed(() => {
        const filterBy = this.filterBy().toLowerCase();
        return this.#uploadedFiles().files.filter(file => file.toLowerCase().includes(filterBy));
    })

    getFiles(): void {
        this.#httpClient.get<UploadedFiles>(`${this.#apiUrl}/files`).pipe(
            takeUntilDestroyed(this.#destroyRef)
        ).subscribe(files => {
            this.#uploadedFiles.set(files)
        })
    }
    deleteFile(fileName: string): void {
        const name = encodeURIComponent(fileName);
        this.#httpClient.delete(`${this.#apiUrl}/files/delete/${name}`).subscribe(
            () => this.#uploadedFiles.update((uploadedFiles) => {
                return {
                    files: uploadedFiles.files.filter(f => f !== fileName ),
                    total: uploadedFiles.total - 1
                }
            })
        )
    }
}
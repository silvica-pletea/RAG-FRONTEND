import { PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { UploadService } from './services/upload';
import { FileSizeFormatPipe } from './pipes/file-size-format';

@Component({
  selector: 'app-upload-file',
  imports: [ PercentPipe, FileSizeFormatPipe ],
  templateUrl: './upload-file.html',
  styleUrl: './upload-file.css',
  providers: [UploadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFile {

  private uploadService = inject(UploadService);
  protected file = this.uploadService.getFile();
  protected isDragging = signal(false);

  protected fileInputElement = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.uploadService.setFile(input.files ? input.files[0] : null);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave() {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.uploadService.setFile(event.dataTransfer?.files ? event.dataTransfer.files[0] : null);
  }
  onUpload() {
    if(!this.file()?.file) return;
    this.uploadService.upload();
  }

  onReset() {
    const fileInputControl = this.fileInputElement()?.nativeElement
    if(fileInputControl) {
      fileInputControl.value = '';
    }
    this.uploadService.reset();
  }
}

import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UploadedFilesService } from './services/uploaded-files';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-file',
  imports: [FormsModule],
  templateUrl: './search-file.html',
  styleUrl: './search-file.css',
  providers: [UploadedFilesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFile implements OnInit {

    //inject UploadedFilesService service
    protected uploadedFileSvc = inject(UploadedFilesService);
    
    ngOnInit(): void {
      this.uploadedFileSvc.getFiles();
    }

}

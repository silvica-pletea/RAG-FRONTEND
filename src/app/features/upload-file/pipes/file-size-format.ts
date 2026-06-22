import { Pipe, PipeTransform } from '@angular/core';
import { units } from '../../../shared/utils';

@Pipe({
  name: 'fileSizeFormat',
})
export class FileSizeFormatPipe implements PipeTransform {
  transform(bytes: number): string {
      let unit = 0;
    
      while ( bytes >= 1024 ) {
        bytes /= 1024;
        unit ++;
      }
      return bytes.toFixed(2) + ' ' + units[ unit ];
  }
}

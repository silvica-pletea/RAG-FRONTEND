import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../shared/services/loading-service';
import { finalize } from 'rxjs';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingErrorService = inject(LoadingService);
  loadingErrorService.incrementCounter();
  return next(req).pipe(
      finalize(() => {
          loadingErrorService.decrementCounter();
      })
  );
};
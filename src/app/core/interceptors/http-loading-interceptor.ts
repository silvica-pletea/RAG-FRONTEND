import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../shared/services/loading-service';
import { finalize } from 'rxjs';
import { SKIP_SPINNER } from '../../shared/constants/constants';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingErrorService = inject(LoadingService);
  const skipSpinner = req.context.get(SKIP_SPINNER);
  if (!skipSpinner) {
    loadingErrorService.incrementCounter();
  }
  return next(req).pipe(
      finalize(() => {
        if (!skipSpinner) {
          loadingErrorService.decrementCounter();
        }
      })
  );
};
import { ErrorHandler, inject, Injectable } from "@angular/core";
import { ErrorService } from "../../shared/services/error-service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    readonly #errorService = inject(ErrorService);

    handleError(error: unknown): void {
        this.#errorService.handleGlobalError(error);
    }
}

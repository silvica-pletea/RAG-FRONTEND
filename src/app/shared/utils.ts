import { HttpErrorResponse } from "@angular/common/http";
import { WritableSignal } from "@angular/core";

export function updateProperty<T, K extends keyof T >(sg: WritableSignal<T>, prop: K, value: T[K]) {
  sg.update(obj => ({
    ...obj,
    [prop]: value
  }));
}
export function getErrorMessage(err: HttpErrorResponse): string {
  let errorMessage = err.error?.detail?.errors ?? err.message;
  if (err.error instanceof ErrorEvent) {
    return `An error occurred: ${errorMessage}`;
  } 
  return `Backend returned code ${err.status}: ${errorMessage}`;

}

export const units = [ 'bytes', 'kb', 'MB', 'GB', 'TB', 'PB' ]
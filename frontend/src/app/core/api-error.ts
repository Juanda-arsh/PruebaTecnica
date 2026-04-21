import { HttpErrorResponse } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

interface ApiErrorBody {
  message?: string;
  details?: Record<string, string>;
}

export function getApiError(error: unknown): string {
  if (error instanceof TimeoutError) {
    return 'La peticion tardo demasiado. Revisa que el backend este corriendo en el puerto 8090';
  }

  if (error instanceof HttpErrorResponse) {
    const body = error.error as ApiErrorBody | null;

    if (body?.message) {
      return body.message;
    }

    if (body?.details) {
      return Object.values(body.details).join('. ');
    }

    if (error.status === 0) {
      return 'No se pudo conectar con el backend';
    }
  }

  return 'Ocurrio un error inesperado';
}

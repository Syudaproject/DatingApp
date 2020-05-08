import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterCeptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }

                if (error instanceof HttpErrorResponse) {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }

                    let serverError = error.error;
                    let modalState = '';
                    if (serverError.errors && typeof serverError.errors === 'object' ) {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modalState += serverError.errors[key] + '\n';
                            }
                        }
                    } else if (typeof serverError !== 'string') {
                        serverError = undefined;
                    }
                    return throwError(modalState || serverError || 'System Error');
                }
            })
        );
  }
}

export const ErrorInterCeptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterCeptor,
    multi: true
};

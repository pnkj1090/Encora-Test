import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private spinner: NgxSpinnerService,
        private toaster: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req)
            .pipe(catchError((err) => {
                this.spinner.hide();
                this.toaster.error(err.message, 'Oops! Server Error')
                return err;
            }))
            .pipe(map<any, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    this.spinner.hide();
                }
                return evt;
            }));
    }
}

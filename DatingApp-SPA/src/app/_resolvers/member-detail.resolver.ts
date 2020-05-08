import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_service/alertify.service';
import { UserService } from './../_service/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(router: ActivatedRouteSnapshot): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(router.params['id']).pipe(
            catchError(() => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}

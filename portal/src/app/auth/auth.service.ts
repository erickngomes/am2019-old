import { Injectable } from '@angular/core';
import {
    Config
} from '../model/config';
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    Response
} from '../model/response';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable({providedIn: 'root'})

export class AuthService {
    isLoggedIn = localStorage.userId && localStorage.userId != 'null' ? true : false;
    redirectUrl: string;
    message: string;
    private response: Object;
    public apiUrl: string;

    constructor(private http: HttpClient) {
    }

      login(login: string, password: string, config: Config, parentThis, callback) {
            this.showConfigResponse(login, password, function(response, self){
            if(response.status == 200){
                localStorage.userId = response.data[0]["ID_USUARIO"];
                self.isLoggedIn = true; 
            }else{
                self.isLoggedIn = false;
                self.message = "Usuário não encontrado";
            };
            callback(self, parentThis);
         });
    }


    logout(): void {
        localStorage.userId = null;
        this.isLoggedIn = false;
    }
    getConfigResponse(login: string, password: string): Observable < HttpResponse < Object >> {
        return this.http.post(this.apiUrl, {
            "login": login,
            "password": password
        }, {observe: 'response'}).pipe(
            catchError(this.handleError)
          );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      };
    
        showConfigResponse(login: string, password: string, callback) {
                this.getConfigResponse(login, password)
            .subscribe(resp => {
                this.response = {
                    ...resp.body
                };
                callback(this.response, this);
            }, err =>{
                var resp = {status: 404, data: err};
                callback(resp, this);
            });
    }

    

}

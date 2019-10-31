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
@Injectable({providedIn: 'root'})

export class AuthService {
    isLoggedIn = localStorage.userId ? true : false;
    redirectUrl: string;
    message: string;
    private response: Object;
    public apiUrl: string;

    constructor(private http: HttpClient) {
    }

      login(login: string, password: string, config: Config, parentThis, callback) {
            this.showConfigResponse(login, password, function(response, self){
            if(response.status == 200){
                self.isLoggedIn = true;
                localStorage.userId = response.data[0]["ID_USUARIO"];
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
        }, {observe: 'response'});
    }
    
        showConfigResponse(login: string, password: string, callback) {
                this.getConfigResponse(login, password)
            .subscribe(resp => {
                this.response = {
                    ...resp.body
                };
                callback(this.response, this);
            });
    }

    

}

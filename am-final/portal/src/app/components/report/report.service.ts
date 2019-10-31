import { Injectable } from '@angular/core';
import {
    Config
} from '../../model/config';
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
} from '../../model/response';
@Injectable({providedIn: 'root'})

export class ReportService {
    message: string;
    private response;
    public apiUrl: string;

    constructor(private http: HttpClient) {
    }

    getConfigResponse(ids: Array<Number>): Observable < HttpResponse < Response >> {
         return this.http.post<Response>(this.apiUrl, {
            "ids": ids
        }, {observe: 'response'});

    }
    

    

}

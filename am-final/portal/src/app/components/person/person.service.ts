import {
    Injectable
} from '@angular/core';
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
    catchError,
    retry
} from 'rxjs/operators';
import {
    Response
} from '../../model/response';
@Injectable({
    providedIn: 'root'
})
export class PersonService {
    public apiUrl: string;
    
    constructor(private http: HttpClient) {
    }
    
    getConfigResponse(): Observable < HttpResponse < Response >> {
        return this.http.get < Response > (
            this.apiUrl, {
                observe: 'response'
            });
    }
}

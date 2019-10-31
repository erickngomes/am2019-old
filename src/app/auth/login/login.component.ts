import {
    Component,
    OnInit
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    AuthService
} from '../auth.service';
import {
    User
} from '../../model/user';
import {
    HttpClient
} from '@angular/common/http';
import {
    Config
} from '../../model/config';
import {
    ConfigService
} from '../../config/config.service'
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ConfigService, AuthService]
})
export class LoginComponent implements OnInit {
    user: User;
    message: string;
    public config: Config;


    constructor(private configService: ConfigService, private http: HttpClient, public authService: AuthService, public router: Router) {}
    ngOnInit() {
        this.user = new User();
        this.showConfigResponse();
    }

    showConfigResponse() {
        this.configService.getConfigResponse()
            .subscribe(resp => {
                this.config = {
                    ...resp.body
                };
            });
    }

     login = async () => {
        this.message = "Realizando Login";
        M.toast({
            html: this.message
        })

        this.authService.apiUrl = this.config.url + this.config.auth + "/login";
        await this.authService.login(this.user.login, this.user.password, this.config, this, function(response, self){
        if (response.isLoggedIn) {
            self.message = "Login realizado com sucesso";
            let redirect = response.redirectUrl ? self.router.parseUrl(response.redirectUrl) : 'index';
            self.router.navigateByUrl(redirect); 
        } else {
            self.message = "Erro ao realizar login: " + response.message;
            self.user = new User();
        }
        M.toast({
            html: self.message
        })
        });
    }

}

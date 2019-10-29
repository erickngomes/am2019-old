import {
    Component,
    OnInit
} from '@angular/core';
import {
    AuthService
} from '../../auth/auth.service';
import {
    Router
} from '@angular/router';
@Component({
    selector: 'app-mainbar',
    templateUrl: './mainbar.component.html',
    styleUrls: ['./mainbar.component.scss']
})
export class MainbarComponent implements OnInit {
    logoPath: string;
    public searchFields = [
        {
            label: 'Nome Completo',
            column: 'name',
            value: ''
        },
        {
            label: 'CPF',
            column: 'cpf',
            value: ''
        },
        {
            label: 'RG',
            column: 'rg',
            value: ''
        }
    ];
    constructor(public authService: AuthService, public router: Router) {
        this.logoPath = 'assets/images/logo1.png';
    }

    ngOnInit() {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    }

    isLogged = () => {
        return localStorage.userId != null && localStorage.userId != 'null';
    };

    logout = () => {
        this.authService.logout();

        M.toast({
            html: 'Logout Realizado'
        });

        this.router.navigateByUrl('login');
    };
}

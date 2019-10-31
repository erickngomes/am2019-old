import {
    Component,
    OnInit
} from '@angular/core'
import {
    Injectable
} from '@angular/core';
import {
    ConfigService
} from './config.service'
import {
    Config
} from '../model/config'
@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss'],
    providers:  [ ConfigService ]
})

export class ConfigComponent implements OnInit {
    public config: Config;
    public error: string;
    public headers: Object;

    constructor(public configService: ConfigService) {}

    ngOnInit() {}


    showConfig() {
        this.configService.getConfig()
            .subscribe(
                (data: Config) => this.config = { ...data
                }, // success path
                error => this.error = error // error path
            );
    }

    showConfigResponse() {
        this.configService.getConfigResponse()
            // resp is of type `HttpResponse<Config>`
            .subscribe(resp => {
                // display its headers
                const keys = resp.headers.keys();
                this.headers = keys.map(key =>
                    `${key}: ${resp.headers.get(key)}`);

                // access the body directly, which is typed as `Config`.
                this.config = { ...resp.body
                };
            });
    }
}

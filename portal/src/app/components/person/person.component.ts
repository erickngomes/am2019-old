declare const M;
import {
    Component,
    OnInit,
    EventEmitter
} from '@angular/core';
import * as $ from 'jquery';
import {
    Person
} from '../../model/person';
import {
    Config
} from '../../model/config';
import {
    Response
} from '../../model/response';
import {
    Modal, Tabs
} from "materialize-css";
import {
    ConfigService
} from '../../config/config.service'
import {
    PersonService
} from './person.service'
@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styleUrls: ['./person.component.scss'],
    providers: [ConfigService, PersonService]
})
export class PersonComponent implements OnInit {
    public loadingPerson: boolean;
    public response: Response;
    public apiStatus: string;
    public objectKeys = Object.keys;
    public dataLoaded: boolean;
    public historic: Array<Object>;
    public selectedSection: string;
    public person: Person;
    public grid: Object;
    public config: Config;
    public isLoading = true;
    public selected: Array<Object>;

    constructor(private configService: ConfigService, private personService: PersonService) { }

    public search = () => {
        this.callApi('doc', this.person.cpf, this.person.rg, 9999, 'search');
    };

    getHistoric() {
        var url = this.config.url.concat(this.config.path) + '/historic?id=' + localStorage.userId;
        this.getApiData(url, 'historic', 'hist');
    }
    public callApi(type, cpf, rg, key, from) {
        if (cpf == '' || cpf == null)
            cpf = 9999;
        if (rg == '' || rg == null)
            rg = 9999;
        this.loadingPerson = true;
        var url = this.config.url.concat(this.config.path) + '/search?type=' + type + '&cpf=' + cpf + '&rg=' + rg + '&key=' + key + '&user=' + localStorage.userId;
        this.getApiData(url, 'person', from);
        this.isLoading = false;
    }
    showConfigResponse() {
        this.configService.getConfigResponse()
            .subscribe(resp => {
                this.config = {
                    ...resp.body
                };

                this.getHistoric();
            });
    }

    getApiData(url, type, from) {
        this.personService.apiUrl = url;
        if (type == 'person')
            this.showPersonResponse(from);
        else
            this.showHistoricResponse();
    }
    showPersonResponse(from) {
        this.personService.getConfigResponse()
            .subscribe(resp => {
                this.response = resp;
                if (this.response.status == 200 && !this.response.body.data[0]) {
                    this.apiStatus = 'sucesso';
                    this.parseGrid(this.response.body.data);
                } if (this.response.status == 200 && this.response.body.data[0] && this.response.body.data[0]['Error']) {
                    this.apiStatus = 'pendente';
                    this.dataLoaded = true;
                    this.loadingPerson = false;
                }
                this.isLoading = false;
                if (from == 'search')
                    this.getHistoric();

            });
    }

    showHistoricResponse() {
        this.personService.getConfigResponse()
            .subscribe(resp => {
                this.response = resp;
                this.historic = this.response.body.data;
                this.historic.sort((val1, val2)=>  {
                    if (val1["PESQUISA_STATUS"] < val2["PESQUISA_STATUS"]) {
                        return -1;
                    }
                    if (val2["PESQUISA_STATUS"] < val1["PESQUISA_STATUS"]) {
                        return 1;
                    }
                    return 0;
                });
                this.isLoading = false;

            });
    }

    parseGrid(data) {
        this.grid = null;
        var self = this;
        if (!this.grid)
            this.grid = data;


        for (var section in this.grid) {
            if (this.grid[section][0]) {
                self.grid[section].forEach(function (r, index) {
                    self.grid[section][index] = self.buildJson(self.grid[section][index]);
                });

            }
        }
        this.dataLoaded = true;
        this.loadingPerson = false;

    }


    buildJson(data) {
        if (data != null) {
            var index = 0;
            var self = this;
            data = Object.keys(data).map(function (key, index) {
                let obj = {
                    'name': self.adjustString(key),
                    'label': self.adjustString(key),
                    'value': typeof data[key] == 'string' && data[key].indexOf('T0') > -1 ? data[key].split('T0')[0] : data[key],
                    'order': index
                };
                index++
                return obj;
            });
            return data;
        }
    }

    adjustString(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ').replace("_"," ");
    }

    selectSection(position) {
        this.selectedSection = this.adjustString(position);
        this.selected = this.grid[position];
    }
    ngOnInit() {
        this.showConfigResponse();
        this.person = new Person();
        this.dataLoaded = false;
        this.loadingPerson = false;
        M.AutoInit();
    }




}
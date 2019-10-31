import {
    Component,
    OnInit,
    Input,
    ViewChildren,
    QueryList
} from '@angular/core';
import * as XLSX from 'xlsx';
import {
    Person
} from '../../model/person';
import {
    ConfigService
} from '../../config/config.service'
import {
    PersonService
} from '../person/person.service'
import { ReportService } from './report.service'
import {
    Config
} from '../../model/config';
import {
    Response
} from '../../model/response';
import { HttpResponse } from '@angular/common/http';
@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    providers: [ConfigService, PersonService, ReportService]
})
export class ReportComponent implements OnInit {
    public hasToRender: boolean;
    public response: HttpResponse<Response>;
    public responseReport: Response;
    public dataLoaded: boolean;
    public loadingPerson: boolean;
    public person: Person;
    public fieldsEnrolled: number;
    public peopleEnrolled: number;
    public isLoading: boolean;
    public config: Config;
    public isChecked = false;
    public grid: Array<Object>;
    public people: Array<Object> = [];
    public peopleExported: Array<Object>;
    public tableGrid;
    public userForm;
    constructor(private configService: ConfigService, private personService: PersonService, private reportService: ReportService) { }

    public setGrid = (data) => {
        var self = this;
        data.forEach(function (field) {
            self.grid.push({
                name: field.COLUMN_NAME,
                checked: true
            });
        });
        this.fieldsEnrolled = this.grid.length;
    }


    public checkField = (field, index) => {
        this[field][index].checked = !this[field][index].checked;
        if (field == 'grid')
            this[field][index].checked ? this.fieldsEnrolled-- : this.fieldsEnrolled++;
        else
            this[field][index].checked ? this.peopleEnrolled++ : this.peopleEnrolled--;
    };

    public selectAllFields(type) {
        var self = this;
        if (type == 'grid') {
            this.grid.forEach(function (f, index) {
                if (self.fieldsEnrolled == self.grid.length) {
                    self.grid[index]['checked'] = false;
                }
                else {
                    self.grid[index]['checked'] = true;
                }
            });

            self.fieldsEnrolled = self.fieldsEnrolled == self.grid.length ? 0 : self.grid.length;
        } else {
            this.people.forEach(function (f, index) {
                if (self.peopleEnrolled == self.people.length) {
                    self.people[index]['checked'] = false;
                }
                else {
                    self.people[index]['checked'] = true;
                }
            });

            self.peopleEnrolled = self.peopleEnrolled == self.people.length ? 0 : self.people.length;
        }
    }
    public generateReport = () => {
        this.isLoading = true;
        this.getReport();
    };

    showReport = () => {
        var elt = document.getElementById("export-table");
        var wb = XLSX.utils.table_to_book(elt, {
        });
        this.hasToRender = false;
        return XLSX.writeFile(wb, ('MPSP.xlsx'));
    }
    public canExport = () => {
        var people = true;
        var grid = true;
        this.people.forEach(function (person) {
            if (person['checked'])
                people = false;
        });
        this.grid.forEach(function (column) {
            if (column['checked'])
                grid = false;
        });

        return people || grid;
    };

    showHistoricResponse() {
        this.personService.getConfigResponse()
            .subscribe(resp => {
                this.response = resp;
                this.people = this.response.body.data;
                this.people = this.people.filter(person => person['PESQUISA_STATUS'] == 'Concluido');

                this.isLoading = false;

            });
    }

    showFieldsResponse() {
        this.personService.getConfigResponse()
            .subscribe(resp => {
                this.response = resp;
                if (this.response.status == 200) {
                    this.setGrid(this.response.body.data[0]);

                }
                this.isLoading = false;
            });
    }

    showConfigResponse() {
        this.configService.getConfigResponse()
            .subscribe(resp => {
                this.config = {
                    ...resp.body
                };

                this.getHistoric();
                this.getFields();
            });
    }

    showReportResponse() {
        var ids = new Array<Number>();
        this.people.forEach((p) => {
            if (p['checked'])
                ids.push(p['ID_PESSOA']);
        });

        this.reportService.getConfigResponse(ids)
            .subscribe(resp => {
                this.peopleExported = [];
                this.response = resp;
                this.response.body.data.forEach((f, index) => {
                    if (Array.isArray(f))
                        f.forEach(d => {
                            this.peopleExported.push(d);
                        });
                });
                this.isLoading = false;
                this.hasToRender = true;
            });
    }


    @ViewChildren('allTheseThings') things: QueryList<any>;

    ngAfterViewInit() {
        this.things.changes.subscribe(t => {
            if (this.hasToRender)
                this.showReport();
        })
    }
    getHistoric() {
        var url = this.config.url.concat(this.config.path) + '/historic?id=' + localStorage.userId;
        this.getApiData(url, 'historic');
    }

    getReport() {
        var url = this.config.url.concat(this.config.path) + '/report';
        this.getApiData(url, 'report');
    }

    getFields() {
        var url = this.config.url.concat(this.config.path) + '/fields';
        this.getApiData(url, 'fields');
    }

    getApiData(url, type) {
        if (type == 'report')
            this.reportService.apiUrl = url;
        else
            this.personService.apiUrl = url;
        if (type == 'fields')
            this.showFieldsResponse();
        else if (type == 'report')
            this.showReportResponse();
        else
            this.showHistoricResponse();
    }


    ngOnInit() {
        this.hasToRender = false;
        this.grid = new Array<Object>();
        this.showConfigResponse();
        this.peopleEnrolled = 0;
    }
}



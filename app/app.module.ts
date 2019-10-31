import {
    BrowserModule
} from '@angular/platform-browser';
import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    FormsModule
} from '@angular/forms';
import {
    HttpClientModule
} from '@angular/common/http';
import {
    AppComponent
} from './components/app/app.component';
import {
    PersonComponent
} from './components/person/person.component';
import {
    MainbarComponent
} from './components/mainbar/mainbar.component';
import {
    ReportComponent
} from './components/report/report.component';
import {
    LoginComponent
} from './auth/login/login.component';
import {
    AuthGuard
} from './auth/auth.guard';
import { ConfigComponent } from './config/config.component';
import { PersonExportComponent } from './components/person-export/person-export.component';
import { SafePipe } from './pipe/safe.pipe';

const appRoutes: Routes = [
    {
        path: 'search',
        canActivate: [AuthGuard],
        component: PersonComponent
    },
    {
        path: 'report',
        canActivate: [AuthGuard],
        component: ReportComponent
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: PersonComponent
    },
    {
        path: 'index',
        canActivate: [AuthGuard],
        component: PersonComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
    AppComponent,
    PersonComponent,
    MainbarComponent,
    ReportComponent,
    LoginComponent,
    ConfigComponent,
    PersonExportComponent,
    SafePipe
  ],
    imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
            appRoutes, {
                enableTracing: false
            }
    ),
    FormsModule
  ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}

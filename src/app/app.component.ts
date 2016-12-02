import { Component, OnInit, Input } from '@angular/core';
import { Event } from './event';
import { Activity } from './activity';
import { ZenithWebSiteService } from './zenith-web-site.service';
import { User } from './user';
import { NewUser } from './new-user';
import { Tokens } from './tokens';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ZenithWebSiteService]
})

export class AppComponent implements OnInit {
  title = 'Zenith Client Site';
  events: Event[];
  eventsSec: string[] = [];
  eventsList: { [key: string]: Event[] } = {};
  user: User = new User();
  newUser: NewUser = new NewUser();
  token: Tokens;
  weekCount: number = 0;
  login = false;
  registerBool = false;
  button: Boolean = false;
  errorBool = false;
  error: string = "";
 

  constructor(private ZenithWebSiteService: ZenithWebSiteService) { }

  getEvents(): void {
    this.ZenithWebSiteService.getEvents().then(events => this.changeData(events));
  }

  ngOnInit(): void {
    this.getEvents();
  }



  changeData(data: Event[]) {
    for (let event of data) {
      let fromDate = new Date(event.fromDate);
      let toDate = new Date(event.toDate);
      let key = fromDate.toDateString();

      if (!this.eventsSec.find(s => s == key)){
        this.eventsSec.push(key);
      }
      (this.eventsList[key] = this.eventsList[key] ? this.eventsList[key] : []).push(event);
    }
  }

  onRoleResult(result: string[]){
    this.button = result["value"] == "true" ? true : false;
  }

  isButtonsEnabled(): Boolean {
    return this.button;
  }

  getNextWeek(num: number): void {
    this.eventsSec = [];
    this.eventsList = {};
    this.weekCount += num;
    this.ZenithWebSiteService.getNewWeek(this.token.access_token, this.weekCount)
      .then(events => this.changeData(events))
  }

  verify(u:string, p: string): void {
    this.ZenithWebSiteService.getAPIToken(u, p)
      .then(token => this.onVerifyResult(token)).catch(error => this.handleRegisterError(error))
  }

  register(): void{
    this.ZenithWebSiteService.register(this.newUser)
      .then(response => this.onRegisterResult(response)).catch(error => this.handleRegisterError(error));
  }

  onRegisterResult(newUser: string[]){
    this.verify(this.newUser.Username, this.newUser.Password);
  }

  onVerifyResult(token: Tokens) {
        this.token = token;
        this.ZenithWebSiteService.getRolePermission(this.token.access_token)
          .then(result => this.onRoleResult(result)).catch(error => this.handleRegisterError(error))
  }

  handleRegisterError(error: any) {
    this.errorBool = true;
    this.error = "Error"
  }
}

import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Event } from './event';
import { Activity } from './activity';
import { Tokens } from './tokens';
import { NewUser } from './new-user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ZenithWebSiteService {

	private BASE_URL = "http://a2p1.comp4976.xyz/"
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private header1 = new Headers({ 'Accept': 'application/json' });

	constructor(private http: Http) { }

	getEvents(): Promise<Event[]>{
		return this.http.get(this.BASE_URL + 'api/EventsApi')
		.toPromise().then(response => response.json() as Event[])
		.catch(this.handleError);
	}

	getActivities(): Promise<Activity[]>{
		return this.http.get(this.BASE_URL + 'api/ActivitiesAPI')
		.toPromise().then(response => response.json() as Activity[])
		.catch(this.handleError);
	}

	getNewWeek(token: string, n: number): Promise<Event[]>{
		var body = '';
		this.header1.append('Authorization', 'Bearer '+ token);
		let options = new RequestOptions({ headers: this.header1 });

		return this.http.get(this.BASE_URL + 'api/eventsAPI/' + n.toString(), options)
		  .toPromise().then(response => response.json() as Event[])
		  .catch(this.handleError);
	}

	getRolePermission(token: string): Promise<string[]> {
		var body = '';
		this.header1.append('Authorization', 'Bearer '+ token);
		let options = new RequestOptions({ headers: this.header1 });

		return this.http.get(this.BASE_URL + 'connect/roles', options)
		  .toPromise().then(response => response.json() as string[])
		  .catch(this.handleError);
    }
	 
	getAPIToken(u: string, p: string): Promise<Tokens> {
	    var body =  'grant_type=password&username=' + u
	    			+ '&password=' + p;
	    let privateHeader = new Headers();
	    privateHeader.append('Content-Type', 'application/x-www-form-urlencoded');

	    return this.http.post(this.BASE_URL + 'connect/token', body, { headers: privateHeader })
	      .toPromise().then(response => response.json() as Tokens).catch(this.handleError);
	}

	register(nu: NewUser): Promise<string[]> {
		var body = 	'Username=' + nu.Username 
					+ '&FirstName=' + nu.FirstName
					+ '&LastName=' + nu.LastName
					+ '&Email=' + nu.Email 
					+ '&Password=' + nu.Password 
					+ '&ConfirmPassword=' + nu.ConfirmPassword;
		let privateHeader = new Headers();
		privateHeader.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.BASE_URL + 'connect/register', body, { headers: privateHeader })
		  .toPromise().then(response => response).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	    return Promise.reject(error.message || error);
	}

}

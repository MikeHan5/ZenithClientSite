import {Activity} from './activity';
export class Event {
	eventId:number;
	fromDate:string;
	toDate:string;
	isActive:boolean;
	createdBy:string;
	creationDate: string;
	activityId:number;
	activity: Activity; 
}


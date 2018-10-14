import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Observable string sources
  private componentMethodCallSource = new Subject<any>();
  private allUsersSource = new Subject<Array<Object>>();
  // why use a subject for the users? the data is random - every call gets something else
  // and in order to work properly with several components who must have the same data 
  // we subscribe only once (in the service) to that data and then we subscribe (as many times as we want)
  // to the subject itself. The data never changes, as it should be.
  public allUsersUrl: string = 'https://glacial-escarpment-40412.herokuapp.com/users/'

    constructor(private http: HttpClient) { 
  		this.sendAllUsers();
    }

	// Observable string streams
	componentMethodCalled$ = this.componentMethodCallSource.asObservable();

	// Service message commands
	callComponentMethod(data) {
	  this.componentMethodCallSource.next(data)
	}

    getAllUsersObs(): Observable<any> {
    	return this.http.get<any>(this.allUsersUrl);
  	}

  	getUser(id: number): Observable<any> {
    	return this.http.get<any>(this.allUsersUrl + id);
  	}

    sendAllUsers() {
    	this.http.get<any>(this.allUsersUrl)
    	.subscribe(
         	data => this.allUsersSource.next(data)
        );
    }

    getAllUsers(): Observable<Array<Object>> {
        return this.allUsersSource.asObservable();
    }
}



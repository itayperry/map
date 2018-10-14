import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  subscription: Subscription;
  
  public countriesLatLng = {
  	  USA: {lat: 40.730610, lng: -73.935242},
  	  Australia: {lat: -33.865143, lng: 151.209900},
	  Israel: {lat: 32.109333, lng: 34.855499},
	  France: {lat: 48.864716, lng: 2.349014},
	  Japan: {lat: 35.652832, lng: 139.839478}
  }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  	// this.subscription = this.usersService.getAllUsers()
   //  .subscribe(data => console.log(data));
  }

  callMethod(data) {
    this.usersService.callComponentMethod(data);
  }


}

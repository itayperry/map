import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	@Input() user;
	subscription: Subscription;
public centerPoint = {
	 name: "New York",
	 location: {
	 	lat: 40.730610,
	 	lng: -73.935242
	 }
};
  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  	callMethod(data) {
		this.usersService.callComponentMethod(data);
	}

}
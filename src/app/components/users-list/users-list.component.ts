import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
	subscription: Subscription;
	public someObject = {
		geoCoordinates: {lat: 48.864716, lng: 2.349014}, 
		zoomChoice: 8
	};
	public users = [];
	public centerPoint = {
		 name: "New York",
		 location: {
		 	lat: 40.730610,
		 	lng: -73.935242
		 }
	};

  constructor(private usersService: UsersService) {}
	ngOnInit() {
		this.subscription = this.usersService.getAllUsers()
			.subscribe(data => this.sortUsersByDistance(data)
		);
	}

	callMethod(data) {
		this.usersService.callComponentMethod(data);
	}

	sortUsersByDistance(data){
		for (var i = 0; i < data.length; i++) {
			var distance = this.getDistanceFromLatLonInKm(
				this.centerPoint.location.lat,
				this.centerPoint.location.lng,
				data[i].location.latitude,
				data[i].location.longitude
			)
			data[i].location.latitude = Number(data[i].location.latitude)
			data[i].location.longitude = Number(data[i].location.longitude)
			data[i].distance = distance.toFixed(3) //create a new key
		}
		
		data.sort((a, b) => { // sort by distance
		  return a.distance - b.distance;
		});
		console.log(data) //finished
		this.users = data
	}

	getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) { //inaccuracy: 0.5% in result
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	}

	deg2rad(deg) {
	  return deg * (Math.PI/180)
	}

// VM165:1 9112.184721568901
}
//     var items = [
//   { name: 'Edward', value: 21 },
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 },
//   { name: 'Magnetic', value: 13 },
//   { name: 'Zeros', value: 37 }
// ];

// // sort by value
// items.sort(function (a, b) {
//   return a.value - b.value;
// });
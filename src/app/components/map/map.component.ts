import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
title = 'map';
  public allUsers = [];
  subscription: Subscription;
  private map: any;

  constructor(private usersService: UsersService){
      // this.map = new google.maps.Map(document.getElementById('map'), {
      //     center: this.usersService.geoCoordinates,
      //     zoom: this.usersService.zoomChoice
      // });
      this.usersService.componentMethodCalled$.subscribe(
        (data) =>  this.initMap(data.geoCoordinates, data.zoomChoice)
      );
  }

    ngOnInit() {
        this.subscription = this.usersService.getAllUsers()
        .subscribe(
          data => {
            this.allUsers = data
            this.initMap({lat: 40.730610, lng: -73.935242}, 2);
          }
        );
    }

    initMap(LatLngObj, zoomChoice) {
    	this.map = new google.maps.Map(document.getElementById('map'), {
      		center: LatLngObj,
      		zoom: zoomChoice
    	});
      this.initClusters(this.allUsers)
    }

    initClusters(data){ //center geo-coordinates do not change
          var markers = []
          for (var i = 0; i < data.length; i++) {
            markers.push(new google.maps.Marker({
              position: 
                {
                  lat: Number(data[i].location.latitude), 
                  lng: Number(data[i].location.longitude)
                }, label: 'User ' + String(data[i].id)
            }));
          }
          //label: labels[i % labels.length]
          var markerCluster = new MarkerClusterer(this.map, markers,
              {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
          );
    }

}

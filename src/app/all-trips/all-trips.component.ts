import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';
import { TripModel } from '../core/trip.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent implements OnInit {
  tripCollection: AngularFirestoreCollection<TripModel>;
  trips: Observable<TripModel[]>;
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.tripCollection = this.afs.collection<TripModel>('trips')
    // this.tripCollection = this.afs.collection<TripModel>('trips', ref => {
    //   // return ref.where('loh', '==', 'loh');orderBy('loh')
    //   return ref.where('creator', '==', email);
    // });
    this.trips = this.tripCollection.valueChanges();
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }
}

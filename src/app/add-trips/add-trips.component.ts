import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripModel } from '../core/trip.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.css']
})
export class AddTripsComponent implements OnInit {
  tripCollection: AngularFirestoreCollection<TripModel>;
  addTripForm: FormGroup;
  successMessage = '';


  constructor(
    private afs: AngularFirestore,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.tripCollection = this.afs.collection<TripModel>('trips');
  }

  createForm() {
    this.addTripForm = this.fb.group({
      tripName: ['', Validators.required],
      days: ['', Validators.required],
      dayCost: ['', Validators.required],
      ticketsCost: ['', Validators.required],
      hotelCost: ['', Validators.required],
      transportCost: ['', Validators.required],
      startCity: ['', Validators.required],
      endCity: ['', Validators.required],
    });
  }


  addTrip(value) {
    const trip = new TripModel(value);
    const email = firebase.auth().currentUser.email;

    trip.creator = email;
    this.tripCollection.add({ ...trip });
    this.successMessage = 'Trip added';
    this.addTripForm.reset();
  }
}


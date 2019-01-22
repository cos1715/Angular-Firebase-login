export class TripModel {
  tripName: string;
  days: number;
  dayCost: number;
  ticketsCost: number;
  hotelCost: number;
  transportCost: number;
  startCity: string;
  endCity: string;
  creator?: string;


  constructor(trip) {
    const {
      tripName,
      days,
      dayCost,
      ticketsCost,
      hotelCost,
      transportCost,
      startCity,
      endCity
    } = trip;

    this.tripName = tripName;
    this.days = days;
    this.dayCost = dayCost;
    this.ticketsCost = ticketsCost;
    this.hotelCost = hotelCost;
    this.transportCost = transportCost;
    this.startCity = startCity;
    this.endCity = endCity;
  }
}


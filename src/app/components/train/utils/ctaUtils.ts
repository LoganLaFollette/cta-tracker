export function calculateEtaString(eta: any) {
    var estArrivalTime = new Date(eta).getTime();
    var currTime = new Date().getTime();
    // get total seconds between the times
    var delta = Math.abs(estArrivalTime - currTime) / 1000;
    // calculate (and subtract) whole days - should never really use days or hours
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    var seconds = Math.floor(delta % 60);  // in theory the modulus is not required
    
    return minutes === 0 ? seconds + " seconds" : minutes + " min and " + seconds + " seconds";
  }
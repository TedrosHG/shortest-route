function deliveryRouteOptimization(buildings, start) {
  // create a distance matrix
  const n = buildings.length;
  const dist = Array.from({ length: n }, () => new Array(n));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dist[i][j] = getDistance(buildings[i], buildings[j]);
    }
  }

  // initialize the tour [1,2, ..., n-1] 
  const tour = Array.from({ length: n }, (_, i) => i);
  // removes the starting building from the list 
  tour.splice(tour.indexOf(start), 1);
  //  add the starting building in the beginning of the tour
  tour.unshift(start);


  // perform 2-opt iterations until no further improvement can be made
//   The 2-opt algorithm works by iteratively swapping pairs of edges in 
//   the tour to create a new tour, and if the new tour is shorter than 
//   the original tour, the new tour becomes the current tour.
  let improve = true;
  while (improve) {
    improve = false;
    for (let i = 1; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        const newTour = twoOptSwap(tour, i, j);
        const newDist = computeTourDistance(newTour, dist);
        if (newDist < computeTourDistance(tour, dist)) {
          tour.splice(0, tour.length, ...newTour);
          improve = true;
        }
      }
    }
  }

  return tour.map(i => buildings[i]);
}

// compute the Euclidean distance between two buildings
function getDistance(building1, building2) {
  const dx = building1.x - building2.x;
  const dy = building1.y - building2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// perform a 2-opt swap between two edges in the tour
function twoOptSwap(tour, i, j) {
  const newTour = tour.slice(0, i);
  for (let k = j; k >= i; k--) {
    newTour.push(tour[k]);
  }
  for (let k = j + 1; k < tour.length; k++) {
    newTour.push(tour[k]);
  }
  return newTour;
}

// compute the total distance of the tour
function computeTourDistance(tour, dist) {
  let totalDist = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    totalDist += dist[tour[i]][tour[i + 1]];
  }
  totalDist += dist[tour[tour.length - 1]][tour[0]];
  return totalDist;
}


// building is the list of building to be visited with thier names 
// and x and y coordination to calculate thier distance between each of the building
let building = [
    { name:"A", x:3, y:5},
    { name:"B", x:5, y:3},
    { name:"C", x:1, y:1},
    { name:"D", x:0, y:2},
    { name:"E", x:4, y:2},
  ]
  //starting is the starting index of the list of building
  let starting= 0

  // Implement a route planning algorithm for a delivery company.
  let output = deliveryRouteOptimization(building, starting)
  console.log(output)
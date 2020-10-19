import { interval } from 'rxjs';

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(1000);
// Subscribe to begin publishing values
const b = secondsCounter.subscribe((n) =>
  console.log(`It's been ${n} seconds since subscribing!`)
);

setTimeout(() => {
  b.unsubscribe();
}, 10000);

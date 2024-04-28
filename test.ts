async function myFunction() {
  // Your asynchronous code here
}

const result = myFunction();

if (result instanceof Promise) {
  console.log("myFunction returns a Promise");
} else {
  console.log("myFunction does not return a Promise");
}

function gasPrices(){
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.collectapi.com/gasPrice/stateUsaPrice?state=OK");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 6vjOawSf4Vpge2UVbZjfks:5jknEs6yNGdo8yvmsi97op");

xhr.send(data);
console.log(data.regular);
vanFuelCost = data.regular;

return data.regular
};


export gasPrices;

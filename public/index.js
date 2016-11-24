

//function to output the list of cars in the database

function updateCarList(transaction, results) {
		console.log(transaction);
    console.log(results);
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("carlist");

    //clear cars list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.make + " - " + row.model + " (<a href='javascript:void(0);' onclick='deleteCar(" + row.id + ");'>Delete Car</a>)";
    }

}

//function to get the list of cars from the database

function outputCars() {
    //get the current list of cars as a JSON object

        var response = null;
       var xmlhttp = new XMLHttpRequest();
        var reqStr = "/carList";
        xmlhttp.open("GET",reqStr,true);

      xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                response = xmlhttp.responseText; //if you need to do something with the returned value
                console.log(response);
            }
        }


        xmlhttp.send();

}

//function to add the car to the database

function addCar() {

        //get the values of the make and model text inputs
        var make = document.getElementById("carmake").value;
        var model = document.getElementById("carmodel").value;

        var xmlhttp = new XMLHttpRequest();
        var reqStr = "/add?make="+make+"&model="+model;
        xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var response = xmlhttp.responseText; //if you need to do something with the returned value
        }
        }

        xmlhttp.open("GET",reqStr,true);
        xmlhttp.send();

        
        setTimeout(outputCars, 2000);
 
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteCar(id) {

    var xmlhttp = new XMLHttpRequest();
    var reqStr = "/remove?id="+id;
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    var response = xmlhttp.responseText; //if you need to do something with the returned value
  }
}

xmlhttp.open("GET",reqStr,true);
xmlhttp.send();

setTimeout(outputCars, 2000);
}

outputCars();

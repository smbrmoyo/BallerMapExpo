/*import courts from "./src/assets/data/courts";

const geocodeAddresses = async function () {
  const courts = require("./courts.json"); //Courts.json should be the file with the courts and the adresses
  const fs = require("fs");
  const https = require("https");
  const key = "AIzaSyCAWRoRAT1jDaCuwACpmYsseOgW1-_XrNg";

  console.table(courts);

  let geocodedCourts = [];
  courts.forEach((court) => {
    try {
      let url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        court.address.replaceAll(" ", "+") +
        "&key=" +
        key;
      console.log("url => ", url);
      https.get(url, (res) => {
        try {
          console.log("Got response: " + res.statusCode);
          res.on("data", function (data) {
            res = JSON.parse(data);
            console.log("res: " + res);
            let geoCourt = {
              name: court.name,
              lat:
                res.results.length > 0
                  ? res.results[0].geometry.location.lat()
                  : null,
              lng:
                res.results.length > 0
                  ? res.results[0].geometry.location.lng()
                  : null,
            };
            geocodedCourts.push(geoCourt);
          });
        } catch (error) {
          console.error(error.message);
        }
      });
    } catch (err) {
      console.error(err);
    }
  });

  console.table(geocodedCourts);
  if (geocodedCourts.length > 0) {
    fs.writeFile("geocodedCourts.json", geocodedCourts.toString(), (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  }
};
*/

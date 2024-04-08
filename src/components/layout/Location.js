"use client";

import { UserContext } from "@/app/_context/User";
import { useContext, useEffect } from "react";

export default function Location() {
  const { userDetails, socket } = useContext(UserContext);

  function success(pos) {
    const { latitude, longitude, accuracy } = pos.coords;
    const { _id, username, email } = userDetails;
    console.log("Your current position is:");

    socket.emit("location", {
      user: { _id, username, email },
      location: { latitude, longitude, accuracy },
    });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log(socket);

  return <>Rajat</>;
}

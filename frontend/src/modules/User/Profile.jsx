import React, { useEffect, useState } from "react";
import { axiosclient } from "../../api";
import { ProfileCard } from "../../components";

const Profile = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosclient
      .get("/api/packages/user")
      .then((res) => {
        setPackages(res.data.packages);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosclient
      .get("/api/booking/")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <div className="w-screen overflow-x-hidden min-h-screen dark:bg-gray-900">
        <div className="flex flex-col justify-center items-center !overflow-x-hidden px-2 bg-cover h-[30vh] bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dxrksxul/image/upload/v1661526398/SLIIT/TravelApp/zurich-switzerland_1_nxhu2l.svg')]"></div>

        <div className="dark:bg-gray-900">
          <div className="px-24 my-10">
            <h2 class="text-4xl text-gray-900  font-extrabold font-primary dark:text-white">
              Your Profile
            </h2>
            {packages.length > 0 && (
              <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here are your custom packages you created
              </p>
            )}

            {packages &&
              packages.map((p) => (
                <ProfileCard
                  destination={p.destination?.name}
                  destinationPrice={
                    p.destination.price ? p.destination.price : 0
                  }
                  flight={p.flight?.name}
                  hotel={p.hotel?.name}
                  hotelPrice={p.hotel?.price ? p.hotel?.price : 0}
                  vehicle={p.vehicle?.name}
                  vehiclePrice={p.vehicle?.price ? p.vehicle?.price : 0}
                  flightPrice={p.flight?.price ? p.flight.price : 0}
                />
              ))}

            {bookings.length > 0 && (
              <p class="font-primary text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Here are your tours you booked
              </p>
            )}

            {bookings &&
              bookings.map((p) => (
                <ProfileCard
                  destination={p.country}
                  price={p.price}
                  nuOfAdults={p.adult}
                  nuOfChild={p.children}
                  bookedBy={p.email}
                  type="booking"
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

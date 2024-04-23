"use client";

import { Cafe } from "@prisma/client";
import Link from "next/link";
import { getCafeByName } from "~/queries";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { get } from "http";
import { useEffect, useState } from "react";
import { set } from "zod";
import { LoadingCafes } from "~/components/LoadingCafes";

type LocationProps = {
  cafes: Cafe[];
};

export function GetLocation(props: LocationProps) {
  const { cafes } = props;
  // navigator.permissions && navigator.permissions.query({name: 'geolocation'})
  // .then(function(PermissionStatus) {
  // if (PermissionStatus.state == 'granted') {
  //     console.log("geolocation available");
  const [closeCafes, setCloseCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    getCloseCafes(cafes).then((cafes) => {
      setCloseCafes(cafes);
    });
  }, []);
  if (closeCafes.length === 0) {
    return (
        <LoadingCafes />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {closeCafes.map((cafe) => (
        <Link href={`/cafe/${cafe.name}`} key={cafe.id}>
          <Card key={cafe.id}>
            <CardHeader>
              <CardTitle>{cafe.name}</CardTitle>
              <CardDescription>{cafe.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}

async function getCloseCafes(cafes: Cafe[]) {
  let filteredCafes: Cafe[] = [];
  const userLocation = await getUserLocation();
  const cafeToDistance = new Map();
  const lat = userLocation[0];
  const lon = userLocation[1];

    cafes.forEach((cafe) => {
      if (cafe.latitude != null && cafe.longitude != null) {
        const distance = calcCrow(lat, lon, cafe.latitude, cafe.longitude);
        console.log(distance);
        cafeToDistance.set(cafe, distance);
      }
    });
    const sortedCafes = [...cafeToDistance.entries()].sort(
      (a, b) => a[1] - b[1],
    );
    //get the first 3 cafes from sortedCafes
    const firstThreeCafes = sortedCafes.slice(0, 3);
    filteredCafes = firstThreeCafes.map((cafe) => cafe[0]);
    return filteredCafes;
}

function getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
        navigator.permissions && navigator.permissions.query({name: 'geolocation'})
        .then(function(PermissionStatus) {
          if (PermissionStatus.state == 'granted') {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                reject(error);
            },
            );
        } else if (PermissionStatus.state == 'prompt') {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
                reject(error);
            },
            );
        } else {
            console.log("geolocation not available")
            resolve([37.871541, -122.253547]);
        }})
    });

}
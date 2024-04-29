"use client";

import { type Cafe } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingCards } from "~/components/LoadingCards";
import { toast } from "sonner";
import { CafeCard } from "~/components/CafeCard";

type LocationProps = {
  cafes: Cafe[];
};

export function ClosestCafes(props: LocationProps) {
  const { cafes } = props;
  const [closeCafes, setCloseCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    getCloseCafes(cafes)
      .then((cafes) => {
        setCloseCafes(cafes);
      })
      .catch((error) => {
        toast.error("Error getting location" + error);
      });
  }, [cafes]);

  if (closeCafes.length === 0) {
    return <LoadingCards cafe={true} />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {closeCafes.map((cafe) => (
        <Link href={`/cafe/${cafe.name}`} key={cafe.id}>
          <CafeCard cafe={cafe} />
        </Link>
      ))}
    </div>
  );
}

function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}

async function getCloseCafes(cafes: Cafe[]) {
  let filteredCafes: Cafe[] = [];
  const userLocation = await getUserLocation();
  const cafeToDistance = new Map<Cafe, number>();
  const lat = userLocation[0];
  const lon = userLocation[1];

  cafes.forEach((cafe) => {
    if (cafe.latitude != null && cafe.longitude != null) {
      const distance = calcCrow(lat, lon, cafe.latitude, cafe.longitude);
      cafeToDistance.set(cafe, distance);
    }
  });
  const sortedCafes = [...cafeToDistance.entries()].sort((a, b) => a[1] - b[1]);
  //get the first 3 cafes from sortedCafes
  const firstThreeCafes = sortedCafes.slice(0, 3);
  filteredCafes = firstThreeCafes.map((cafe) => cafe[0]);
  return filteredCafes;
}

function getUserLocation(): Promise<[number, number]> {
  return new Promise((resolve) => {
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then(function (PermissionStatus) {
        if (PermissionStatus.state == "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve([position.coords.latitude, position.coords.longitude]);
            },
            () => {
              resolve([37.871541, -122.253547]);
            },
          );
        } else if (PermissionStatus.state == "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve([position.coords.latitude, position.coords.longitude]);
            },
            () => {
              resolve([37.871541, -122.253547]);
            },
          );
        } else {
          resolve([37.871541, -122.253547]);
        }
      })
      .catch(() => {
        resolve([37.871541, -122.253547]);
      });
  });
}

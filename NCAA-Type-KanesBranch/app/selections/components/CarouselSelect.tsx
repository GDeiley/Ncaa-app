"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarouselRegion from "./CarouselRegion";
import useSWR from "swr";
import LoadingScreen from "@/components/loadingScreen";
import ErrorScreen from "@/components/errorScreen";

const regions = ["Midwest", "West", "South", "East", "Finalists", "Champion"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Team = {
  id: number;
  Region: string;
  School: string;
  Seed: number;
  created_at: string; // ISO timestamp
};

export default function CarouselSelect({ id }: { id: string }) {
  const { data: picks, error: picksError, isLoading: picksLoading } = useSWR(
    `/api/userpicks?id=${id}`,
    fetcher
  );
  const { data: teams, error: teamsError, isLoading: teamsLoading } = useSWR(
    `/api/teams`,
    fetcher
  );
  if (picksLoading || teamsLoading) return <LoadingScreen />;
  if (picksError || teamsError) return <ErrorScreen />;

  const teamsData: Team[] = teams?.data || [];
  
  return (
    <div className="flex flex-col items-center">
      {/* Carousel */}
      <div  className="flex justify-center h-[80vh]">
        <Carousel className="w-[70vw] h-full">
          <div className="relative h-full">
            <CarouselContent className="h-full" data-carousel-content>
              {regions.map((region, index) => (
                <CarouselRegion key={index} region={region} teams={teamsData} id={id} picks={picks.data[0]} />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

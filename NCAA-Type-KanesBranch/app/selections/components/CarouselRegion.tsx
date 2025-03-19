"use client"
 import { useState, useEffect } from "react";
import {
    CarouselItem,
  } from "@/components/ui/carousel";
  import { Card, CardContent } from "@/components/ui/card"
  import Select from "react-select";
  import { Button } from "@/components/ui/button";
  import { toast } from "sonner";


  type Team = {
    id: number;
    Region: string;
    School: string;
    Seed: number;
    created_at: string; // ISO timestamp
  };

  type RegionalPicks = {
    region: string|null;
    cinderella: number|null;
    elite_one: number|null;
    elite_two: number|null;
    final_four: number|null;
    user: string;
  };

  type FinalistPicks = {
    region: string|null;
    finalist_one: number|null;
    finalist_two: number|null;
    user: string;
  }

  type ChampionPicks = {
    region: string|null;
    champion: number|null;
    score: number|null;
    user: string;
  }

function CarouselRegion({region, teams, id, picks}: {region: string, teams: Team[], id: string, picks: any} ) {

  useEffect(() => {
    if (picks?.[region]) {
      setIsComplete(true);
      setScore(picks['total_score'])
    } else {
      setIsComplete(false); 
    }
  }, [picks]);

    const [finalist_one, setFinalist_one] = useState<number | null>(null);
    const [finalist_two, setFinalist_two] = useState<number | null>(null);
    const [cinderella, setCinderella] = useState<number | null>(null);
    const [champion, setChampion] = useState<number | null>(null);
    const [elite_one, setElite_one] = useState<number | null>(null);
    const [elite_two, setElite_two] = useState<number | null>(null);
    const [final_four, setFinal_four] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [score, setScore] = useState<number | "">("");
    const [isComplete, setIsComplete]= useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setScore(value === "" ? "" : Number(value));
      };

    const teamOptions = teams.map((team) => ({
        value: team.id,
        label: `${team.Seed} - ${team.School}`,
        region: team.Region
      }));

      const regionOptions = teams.filter(team => team.Region === region )
      .map((team) => ({
        value: team.id,
        label: `${team.Seed} - ${team.School}`,
        region: team.Region
      }));

      const cinderellaOptions = teams
    .filter(team => team.Region === region && team.Seed >= 11)
    .map(team => ({
        value: team.id,
        label: `${team.Seed} - ${team.School}`,
  }));
  const addRegionPicks = async (picks:RegionalPicks) =>{
    try {
        const response = await fetch("/api/addpicks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ picks }),
        });
  
        if (!response.ok) throw new Error("Failed to send score");
  
        const data = await response.json();
        console.log("Response from API:", data);
      } catch (error) {
        console.error("Error sending score:", error);
      }
  }

  const addFinalistPicks = async (picks:FinalistPicks) =>{
    try {
        const response = await fetch("/api/addpicks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ picks }),
        });
  
        if (!response.ok) throw new Error("Failed to send score");
  
        const data = await response.json();
        console.log("Response from API:", data);
      } catch (error) {
        console.error("Error sending score:", error);
      }
  }

  const addChampionPicks = async (picks:ChampionPicks) =>{
    try {
        const response = await fetch("/api/addpicks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ picks }),
        });
  
        if (!response.ok) throw new Error("Failed to send score");
  
        const data = await response.json();
        console.log("Response from API:", data);
      } catch (error) {
        console.error("Error sending score:", error);
      }
  }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true)
        e.preventDefault(); // Prevent page refresh
        if (region === "East" || region === "West" || region === "South" || region === "Midwest") {
            addRegionPicks({region: region, cinderella: cinderella, elite_one: elite_one, elite_two: elite_two, final_four: final_four, user: id});
            toast(region + " Picks have been added  ✅")
        }
        if (region === "Finalists"){
          addFinalistPicks({region: region, finalist_one: finalist_one, finalist_two: finalist_two, user: id});
          toast(region + " Picks have been added  ✅")

        }
        if (region === "Champion"){
          addChampionPicks({region: region, champion: champion, score: score as number, user: id});
            toast(region + " Picks have been added  ✅")
        }
        setIsComplete(true)
        setIsSubmitting(false)
      };
      
    
    if(region === "Finalists"){
return (
    <CarouselItem className="h-full" >
            <div className="p-1 h-full">
              <Card className="h-full"> 
              <CardContent className="flex flex-col items-center justify-between p-6 h-full">
                  <span className="text-4xl font-semibold mb-4">{region}</span>
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                    <p>Finalist One</p>
                    <Select className="mb-8"
                    defaultValue={picks===undefined?null:
                      teamOptions.find(option => option.value === picks["finalist_1"]) || null}
                    isDisabled={isComplete}
                    options={teamOptions.filter(team => team.value !== finalist_two)}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setFinalist_one(selectedOption ? selectedOption.value : null)}
                    />
                <p>Finalist Two</p>
                <Select className="mb-8"
                    defaultValue={picks===undefined?null:
                      teamOptions.find(option => option.value === picks["finalist_2"]) || null}
                    isDisabled={isComplete}
                    options={teamOptions.filter(team => team.value !== finalist_one)}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setFinalist_two(selectedOption ? selectedOption.value : null)}
                    />
                    {isComplete? (<Button
                    className="bg-green-700 disabled:opacity-100" 
                    disabled={ true}
                    >Complete</Button>):
                    <Button 
                    disabled={finalist_one === null || finalist_two === null}
                    type="submit">{isSubmitting? "submitting...": "Submit"}
                    </Button>     
                    }                 
                    </form>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
  )
    }
    if(region === "Champion"){
        return(
        <CarouselItem className="h-full" >
            <div className="p-1 h-full">
              <Card className="h-full"> 
              <CardContent className="flex flex-col items-center justify-between p-6 h-full">
                  <span className="text-4xl font-semibold mb-4">{region}</span>
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                    <p>Champion</p>
                    <Select className="mb-8"
                    defaultValue={picks===undefined?null:
                      teamOptions.find(option => option.value === picks["champion"]) || null}
                    isDisabled={isComplete}
                    options={teamOptions}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setChampion(selectedOption ? selectedOption.value : null)}
                    />
                      <p>Final Total Combined Score:</p>
                      <div className="">
                      <input
                        type="number"
                        placeholder="Enter a number"
                        className={`mb-8 w-full p-2 border rounded-lg shadow-sm outline-none 
                          ${isComplete ? "bg-gray-200 text-gray-500 border-gray-300 " : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 text-gray-700"}`}
                        value={score}
                        onChange={handleChange}
                        disabled={isComplete}
                      />
                        </div>
                                   {isComplete? (<Button
                    className="bg-green-700 disabled:opacity-100" 
                    disabled={ true}
                    >Complete</Button>):
                    <Button 
                    disabled={champion === null || score === ""}
                    type="submit">{isSubmitting? "submitting...": "Submit"}
                    </Button>   
                    }    
                    </form>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        )
    }
  return (
    <CarouselItem className="h-full" >
            <div className="p-1 h-full">
              <Card className="h-full"> 
              <CardContent className="flex flex-col items-center justify-between p-6 h-full">
                  <span className="text-4xl font-semibold mb-4">{region}</span>
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                    <p>Cinderella</p>
                    <Select className="mb-8"
                    defaultValue={picks===undefined?null:
                      cinderellaOptions.find(option => option.value === picks["cinderella_"+region.toLowerCase()]) || null}
                    isDisabled={isComplete}
                    options={cinderellaOptions}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setCinderella(selectedOption ? selectedOption.value : null)}
                    />
                <p>Elite 8 One</p>
                <Select className="mb-8"
                    defaultValue={picks===undefined?null:
                      teamOptions.find(option => option.value === picks["elite_8_"+region.toLowerCase()+"_1"]) || null}
                    isDisabled={isComplete}
                    options={regionOptions.filter(team => team.value !== elite_two)}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setElite_one(selectedOption ? selectedOption.value : null)}
                    />
                    <p>Elite Eight Two</p>
                    <Select className="mb-8"
                     defaultValue={picks===undefined?null:
                      teamOptions.find(option => option.value === picks["elite_8_"+region.toLowerCase()+"_2"]) || null}
                     isDisabled={isComplete}
                    options={regionOptions.filter(team => team.value !== elite_one)}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setElite_two(selectedOption ? selectedOption.value : null)}
                    />
                      <p>Final Four</p>
                      <Select  className="mb-8"
                       defaultValue={picks===undefined?null:
                        teamOptions.find(option => option.value === picks["final_four_"+region.toLowerCase()]) || null}
                       isDisabled={isComplete}
                    options={regionOptions}
                    placeholder="Select a Team"
                    isSearchable
                    onChange={(selectedOption) => setFinal_four(selectedOption ? selectedOption.value : null)}
                    />
                    {isComplete? (<Button
                    className="bg-green-700 disabled:opacity-100" 
                    disabled={ true}
                    >Complete</Button>):
                    <Button 
                    disabled={ cinderella === null || elite_one === null || elite_two === null || final_four === null}
                    type="submit">{isSubmitting? "submitting...": "Submit"}</Button>
                    }
                  </form>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
  )
}

export default CarouselRegion
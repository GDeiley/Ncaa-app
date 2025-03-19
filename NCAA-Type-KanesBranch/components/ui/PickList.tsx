"use client";
import useSWR from "swr";
import ErrorScreen from "../errorScreen";
import LoadingScreen from "../loadingScreen";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function PicksList() {
    const { data: picks, error, isLoading } = useSWR("/api/picks", fetcher);
    if (isLoading) return <LoadingScreen />;
    if (error) return <ErrorScreen />;
    console.log("Raw picks data:", picks.data);

    if (!picks || !picks.data || picks.data.length === 0) {
        return <p>No users or picks available.</p>; // Return "No users" message
    }

    // Group picks by user
    const groupedPicks = picks.data.reduce((acc: any, pick: any) => {
        if (!acc[pick.email]) acc[pick.email] = [];
        acc[pick.email].push(pick);
        return acc;
    }, {});
    console.log(groupedPicks, "Grouped picks"); // Add this line to check if the picks data is being correctly populated


    return (
        <div className="space-y-6 p-6 min-h-screen">
        <h1 className="text-xl font-semibold">Users Picks</h1>
            {Object.keys(groupedPicks).map((user) => {
                const firstPick = groupedPicks[user][0];
                return (
                    <div key={user} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 truncate w-auto">{firstPick.email}</h3>
                        <div className="grid gap-4 text-gray-800">
                            {groupedPicks[user].map((pick: any, index: number) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    <p className="text-lg font-medium">
                                        🏀 <span className="font-semibold">{pick.finalist_1}</span> vs. <span className="font-semibold">{pick.finalist_2}</span>
                                    </p>
                                    <div className="grid md:grid-cols-4 gap-4 mt-2">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">East</p>
                                            <p><strong>Cinderella:</strong> {pick.cinderella_east}</p>
                                            <p><strong>Elite 8:</strong> {pick.elite_8_east_1}, {pick.elite_8_east_2}</p>
                                            <p><strong>Final Four:</strong> {pick.final_four_east}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">Midwest</p>
                                            <p><strong>Cinderella:</strong> {pick.cinderella_midwest}</p>
                                            <p><strong>Elite 8:</strong> {pick.elite_8_midwest_1}, {pick.elite_8_midwest_2}</p>
                                            <p><strong>Final Four:</strong> {pick.final_four_midwest}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">South</p>
                                            <p><strong>Cinderella:</strong> {pick.cinderella_south}</p>
                                            <p><strong>Elite 8:</strong> {pick.elite_8_south_1}, {pick.elite_8_south_2}</p>
                                            <p><strong>Final Four:</strong> {pick.final_four_south}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-600">West</p>
                                            <p><strong>Cinderella:</strong> {pick.cinderella_west}</p>
                                            <p><strong>Elite 8:</strong> {pick.elite_8_west_1}, {pick.elite_8_west_2}</p>
                                            <p><strong>Final Four:</strong> {pick.final_four_west}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-lg font-semibold">
                                        <p>🏆 Champion: <span className="text-blue-600">{pick.champion}</span></p>
                                        <p>📊 Total Score: <span className="text-green-600">{pick.total_score}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );


}

export default PicksList;
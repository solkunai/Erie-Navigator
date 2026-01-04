// Data exports from JSON files
import restaurantsData from "@/data/restaurants.json";
import eventsData from "@/data/events.json";
import activitiesData from "@/data/activities.json";
import programsData from "@/data/programs.json";
import groupsData from "@/data/groups.json";

import type { Restaurant, Event, Activity, AutismProgram, SocialGroup } from "@/types";

// Export data from JSON files
export const restaurants: Restaurant[] = restaurantsData as Restaurant[];
export const events: Event[] = eventsData as Event[];
export const activities: Activity[] = activitiesData as Activity[];
export const autismPrograms: AutismProgram[] = programsData as AutismProgram[];
export const socialGroups: SocialGroup[] = groupsData as SocialGroup[];

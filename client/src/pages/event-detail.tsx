import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function EventDetail() {
  const [, params] = useRoute("/events/:id");

  const { data: eventResponse, isLoading } = useQuery({
    queryKey: [`/api/events/${params?.id}`],
    queryFn: async () => {
      const response = await fetch(`/api/events/${params?.id}`);
      if (!response.ok) throw new Error("Failed to fetch event");
      return response.json();
    },
    enabled: !!params?.id,
  });

  const event = eventResponse?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCF4F8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E74C3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FCF4F8] flex items-center justify-center p-4">
        <Card className="bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] max-w-md w-full">
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, we couldn't find this event.</p>
            <Link href="/events">
              <Button className="bg-[#E74C3C] hover:bg-[#C0392B] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#FCF4F8] relative overflow-hidden">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #E74C3C 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link href="/events">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-white/50 font-bold text-gray-900 border-2 border-transparent hover:border-black rounded-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Card */}
            <Card className="bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] overflow-hidden">
              {event.imageUrl && (
                <div className="relative h-64 md:h-96 border-b-4 border-black">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#E74C3C] text-white border-2 border-black hover:bg-[#E74C3C] font-bold text-sm">
                    {event.category}
                  </Badge>
                  {event.isFree ? (
                    <Badge className="bg-[#27AE60] text-white border-2 border-black hover:bg-[#27AE60] font-bold text-sm">
                      FREE
                    </Badge>
                  ) : event.price && (
                    <Badge className="bg-[#FFD700] text-black border-2 border-black hover:bg-[#FFD700] font-bold text-sm">
                      {event.price}
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                  {event.title}
                </h1>

                <h2 className="text-2xl font-black text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>

                {event.ticketUrl && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button className="w-full sm:w-auto bg-[#E74C3C] hover:bg-[#C0392B] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                      <Ticket className="h-4 w-4 mr-2" />
                      Get Tickets
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] sticky top-6">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-black text-gray-900 mb-4 pb-3 border-b-2 border-black">
                  Event Details
                </h3>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#E74C3C] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm mb-1">Date</p>
                    <p className="text-gray-700 text-sm leading-relaxed break-words">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#3A96CB] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm mb-1">Time</p>
                    <p className="text-gray-700 text-sm leading-relaxed break-words">
                      {event.time}
                      {event.endTime && ` - ${event.endTime}`}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-sm bg-[#8E44AD] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm mb-1">Venue</p>
                    <p className="text-gray-700 text-sm leading-relaxed break-words">
                      {event.venue}
                    </p>
                    {event.address && (
                      <p className="text-gray-600 text-xs mt-1 break-words">
                        {event.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price */}
                {(event.isFree || event.price) && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#FFD700] border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]">
                      <DollarSign className="h-5 w-5 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm mb-1">Price</p>
                      <p className="text-gray-700 text-sm leading-relaxed break-words">
                        {event.isFree ? "Free" : event.price}
                      </p>
                    </div>
                  </div>
                )}

                {/* Map Link */}
                {event.address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${event.venue}, ${event.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full bg-white text-gray-900 border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-bold"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

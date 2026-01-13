import { useState, useMemo } from "react";
import { Search, Filter, Calendar as CalendarIcon, Clock, MapPin, Ticket, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RealTimeClock } from "@/components/real-time-clock";
import { events } from "@/lib/erieData";
import { eventCategories, type EventCategory } from "@shared/schema";

export default function Events() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (category: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearch("");
    setSelectedDate(null);
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesSearch =
          search === "" ||
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.venue.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(event.category);

        const matchesDate = !selectedDate || event.date === selectedDate;

        return matchesSearch && matchesCategory && matchesDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [search, selectedCategories, selectedDate]);

  const hasActiveFilters = selectedCategories.length > 0 || search !== "" || selectedDate !== null;

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  const calendarDays = [];
  const totalDays = daysInMonth(currentMonth);
  const startDay = firstDayOfMonth(currentMonth);

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-4 text-[#3A96CB] uppercase tracking-wide text-sm">Event Type</h3>
        <div className="space-y-3">
          {eventCategories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-event-category-${category.toLowerCase()}`}
                className="border-2 border-black data-[state=checked]:bg-[#3A96CB] data-[state=checked]:border-[#3A96CB]"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer font-medium"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          onClick={clearFilters}
          className="w-full gap-2 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
          data-testid="button-clear-event-filters"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCF4F8] relative">
      {/* Dotted Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #d4d4d4 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="bg-[#3A96CB] border-b-4 border-black py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div>
                <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold text-xs px-3 py-1 mb-4 hover:bg-[#FFD700]">
                  HAPPENING NOW
                </Badge>
                <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none text-white italic" data-testid="text-events-page-title">
                  What's On
                </h1>
                <p className="text-white text-lg max-w-2xl font-medium">
                  Concerts, festivals, sports, and community events happening in Erie, PA.
                </p>
              </div>
              <div className="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <RealTimeClock />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-10 h-12 border-2 border-black rounded-sm focus:ring-2 focus:ring-black font-medium bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="input-search-events"
                />
              </div>

              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    className="lg:hidden gap-2 h-12 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                    data-testid="button-mobile-event-filters"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge className="bg-[#FF851A] text-white border-0 ml-1">
                        {selectedCategories.length + (selectedDate ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-[#FCF4F8] border-l-4 border-black">
                  <SheetHeader>
                    <SheetTitle className="font-black text-2xl">Filter Events</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with Calendar */}
            <aside className="lg:w-80 flex-shrink-0 space-y-6">
              <Card className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] p-6" data-testid="calendar-widget">
                <div className="flex items-center justify-between mb-6">
                  <Button
                    onClick={prevMonth}
                    className="h-10 w-10 p-0 bg-[#FFD700] hover:bg-[#ffe44d] border-2 border-black rounded-sm"
                    data-testid="button-prev-month"
                  >
                    <ChevronLeft className="h-5 w-5 text-black" />
                  </Button>
                  <h3 className="font-black text-lg">{formatMonthYear(currentMonth)}</h3>
                  <Button
                    onClick={nextMonth}
                    className="h-10 w-10 p-0 bg-[#FFD700] hover:bg-[#ffe44d] border-2 border-black rounded-sm"
                    data-testid="button-next-month"
                  >
                    <ChevronRight className="h-5 w-5 text-black" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-3">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-center text-xs font-bold text-gray-600 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dayEvents = getEventsForDate(day);
                    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={`aspect-square flex flex-col items-center justify-center rounded-sm text-sm font-bold border-2 transition-all ${
                          isToday(day) ? "bg-[#FF851A] text-white border-black shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]" :
                          isSelected ? "bg-[#3A96CB] text-white border-black shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]" :
                          "bg-white border-black hover:bg-[#FFD700] hover:shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                        }`}
                        data-testid={`calendar-day-${day}`}
                      >
                        <span>{day}</span>
                        {dayEvents.length > 0 && (
                          <div className="flex gap-0.5 mt-1">
                            {dayEvents.slice(0, 3).map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 h-1 rounded-full ${isToday(day) || isSelected ? "bg-white" : "bg-[#FF851A]"}`}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 pt-4 border-t-2 border-black">
                    <Button
                      onClick={() => setSelectedDate(null)}
                      className="w-full gap-2 bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)]"
                    >
                      <X className="h-4 w-4" />
                      Clear Date
                    </Button>
                  </div>
                )}
              </Card>

              <div className="hidden lg:block bg-white p-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <h2 className="font-black mb-6 flex items-center gap-2 text-xl">
                  <Filter className="h-5 w-5 text-[#3A96CB]" />
                  Filters
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <p className="text-gray-700 font-bold" data-testid="text-event-results-count">
                  {selectedDate
                    ? `Events on ${new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                    : `Showing ${filteredEvents.length} events`
                  }
                </p>

                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        className="cursor-pointer gap-1 bg-[#3A96CB] text-white border-2 border-black rounded-sm font-bold hover:bg-[#4da8db]"
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        <X className="h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-xl bg-[#3A96CB] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                    <CalendarIcon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">No events found</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    Try adjusting your filters or selecting a different date.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden"
                      data-testid={`card-event-${event.id}`}
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Date Badge */}
                        <div className="sm:w-32 flex-shrink-0 p-6 flex sm:flex-col items-center justify-center bg-[#3A96CB] border-b-4 sm:border-b-0 sm:border-r-4 border-black">
                          <div className="text-center">
                            <p className="text-sm font-bold text-white uppercase">
                              {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                            </p>
                            <p className="text-5xl font-black text-white">
                              {new Date(event.date + "T12:00:00").getDate()}
                            </p>
                            <p className="text-xs font-bold text-white uppercase">
                              {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                            </p>
                          </div>
                        </div>

                        <CardContent className="flex-1 p-6">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="font-black text-xl">{event.title}</h3>
                            <div className="flex gap-2 flex-shrink-0">
                              {event.isFree ? (
                                <Badge className="bg-[#4ade80] text-black border-2 border-black rounded-sm font-bold hover:bg-[#4ade80]">Free</Badge>
                              ) : event.price && (
                                <Badge className="bg-[#FFD700] text-black border-2 border-black rounded-sm font-bold hover:bg-[#FFD700]">{event.price}</Badge>
                              )}
                            </div>
                          </div>

                          <Badge className="bg-[#FF851A] text-white border-2 border-black rounded-sm font-bold text-xs mb-4 hover:bg-[#FF851A]">
                            {event.category}
                          </Badge>

                          <p className="text-sm text-gray-700 mb-4 line-clamp-2 font-medium">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#3A96CB]" />
                              <span className="font-medium">{event.time}{event.endTime && ` - ${event.endTime}`}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-[#FF851A]" />
                              <span className="font-medium">{event.venue}</span>
                            </div>
                          </div>

                          {event.ticketUrl && (
                            <a
                              href={event.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#3A96CB] hover:bg-[#4da8db] border-2 border-black rounded-sm py-2 px-4 shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                            >
                              <Ticket className="h-4 w-4" />
                              Get Tickets
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <h3 className="font-semibold mb-3">Event Type</h3>
        <div className="space-y-2">
          {eventCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                data-testid={`checkbox-event-category-${category.toLowerCase()}`}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full gap-2"
          data-testid="button-clear-event-filters"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-events-page-title">
                Erie Events Calendar
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Discover concerts, festivals, sports, and community events happening in Erie, PA.
              </p>
            </div>
            <RealTimeClock />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search-events"
              />
            </div>
            
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2" data-testid="button-mobile-event-filters">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" size="sm">
                      {selectedCategories.length + (selectedDate ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Events</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0 space-y-6">
            <Card className="p-4" data-testid="calendar-widget">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={prevMonth} data-testid="button-prev-month">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-semibold">{formatMonthYear(currentMonth)}</h3>
                <Button variant="ghost" size="icon" onClick={nextMonth} data-testid="button-next-month">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
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
                      className={`aspect-square flex flex-col items-center justify-center rounded-md text-sm transition-colors hover-elevate ${
                        isToday(day) ? "bg-primary text-primary-foreground font-bold" :
                        isSelected ? "bg-primary/20 text-primary font-semibold" :
                        "hover:bg-muted"
                      }`}
                      data-testid={`calendar-day-${day}`}
                    >
                      <span>{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayEvents.slice(0, 3).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${isToday(day) || isSelected ? "bg-current" : "bg-primary"}`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {selectedDate && (
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDate(null)}
                    className="w-full gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear Date Selection
                  </Button>
                </div>
              )}
            </Card>

            <div className="hidden lg:block bg-card p-4 rounded-lg border">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-muted-foreground" data-testid="text-event-results-count">
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
                      variant="secondary"
                      className="cursor-pointer gap-1"
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
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or selecting a different date.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover-elevate overflow-hidden" data-testid={`card-event-${event.id}`}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-32 flex-shrink-0 p-4 flex sm:flex-col items-center justify-center bg-primary/10">
                        <div className="text-center">
                          <p className="text-sm font-medium text-primary">
                            {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                          </p>
                          <p className="text-3xl font-bold">
                            {new Date(event.date + "T12:00:00").getDate()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                          </p>
                        </div>
                      </div>
                      
                      <CardContent className="flex-1 py-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <div className="flex gap-2 flex-shrink-0">
                            {event.isFree ? (
                              <Badge variant="secondary" size="sm">Free</Badge>
                            ) : event.price && (
                              <Badge variant="outline" size="sm">{event.price}</Badge>
                            )}
                          </div>
                        </div>
                        
                        <Badge variant="outline" size="sm" className="mb-3">
                          {event.category}
                        </Badge>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}{event.endTime && ` - ${event.endTime}`}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                        
                        {event.ticketUrl && (
                          <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
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
  );
}

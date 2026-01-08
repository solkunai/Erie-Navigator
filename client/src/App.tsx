import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AIChat } from "@/components/ai-chat";
import Home from "@/pages/home";
import Explore from "@/pages/explore";
import Restaurants from "@/pages/restaurants";
import Events from "@/pages/events";
import ThingsToDo from "@/pages/things-to-do";
import AutismPrograms from "@/pages/autism-programs";
import SocialGroups from "@/pages/social-groups";
import AddBusiness from "@/pages/add-business";
import NotFound from "@/pages/not-found";

function Router({ onOpenAI }: { onOpenAI: () => void }) {
  return (
    <Switch>
      <Route path="/" component={() => <Home onOpenAI={onOpenAI} />} />
      <Route path="/explore" component={Explore} />
      <Route path="/restaurants" component={Restaurants} />
      <Route path="/events" component={Events} />
      <Route path="/things-to-do" component={ThingsToDo} />
      <Route path="/autism-programs" component={AutismPrograms} />
      <Route path="/social-groups" component={SocialGroups} />
      <Route path="/add-business" component={AddBusiness} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const openAI = () => setIsAIChatOpen(true);
  const closeAI = () => setIsAIChatOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Header
              onOpenAI={openAI}
              searchQuery={globalSearch}
              onSearchChange={setGlobalSearch}
            />
            <main>
              <Router onOpenAI={openAI} />
            </main>
            <AIChat isOpen={isAIChatOpen} onClose={closeAI} />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

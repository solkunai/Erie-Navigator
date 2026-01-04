import { useState } from "react";
import { Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubmitBusiness() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Netlify will handle the form submission automatically
    // We'll show a success message after submission
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Submission Received!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for submitting your business. We'll review your submission and add it to our directory soon.
            </p>
            <Button onClick={() => setSubmitted(false)}>
              Submit Another Business
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Submit Your Business</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Add your business to the Erie Navigator directory. Fill out the form below and we'll review your submission.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              name="business-submission"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="business-submission" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name *</Label>
                <Input
                  id="business-name"
                  name="business-name"
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="event">Event/Venue</SelectItem>
                    <SelectItem value="activity">Activity/Attraction</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="social">Social Group</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your business"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Hours of Operation</Label>
                <Input
                  id="hours"
                  name="hours"
                  placeholder="Mon-Fri 9am-5pm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information</Label>
                <Textarea
                  id="additional-info"
                  name="additional-info"
                  placeholder="Any other details you'd like us to know"
                  rows={3}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" size="lg">
                  Submit Business
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree that your business information may be displayed on the Erie Navigator directory.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Building2, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const listingTypes = [
  { value: "restaurant", label: "Restaurant" },
  { value: "event", label: "Event" },
  { value: "activity", label: "Activity / Things to Do" },
  { value: "program", label: "Community Service / Program" },
  { value: "group", label: "Social Group" },
];

const restaurantCategories = [
  "American", "Italian", "Mexican", "Chinese", "Japanese", "Thai", "Indian",
  "Mediterranean", "Seafood", "Pizza", "BBQ", "Vegetarian", "Vegan",
  "Fast Food", "Fine Dining", "Casual Dining", "Cafe", "Bakery", "Bar & Grill", "Other"
];

const eventCategories = [
  "Music", "Arts & Culture", "Food & Drink", "Sports", "Family",
  "Community", "Education", "Business", "Holiday", "Outdoor", "Other"
];

const activityCategories = [
  "Outdoor Recreation", "Arts & Culture", "Entertainment", "Sports & Fitness",
  "Education", "Family Activities", "Tours", "Shopping", "Wellness", "Other"
];

const programCategories = [
  "Autism Support", "Disability Services", "Mental Health", "Youth Programs",
  "Senior Services", "Family Support", "Education", "Employment", "Healthcare", "Other"
];

const groupCategories = [
  "Hobby & Interest", "Professional", "Support", "Sports & Recreation",
  "Arts & Culture", "Social", "Community Service", "Religious", "Educational", "Other"
];

interface FormData {
  listingType: string;
  businessName: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
  priceRange: string;
  contactName: string;
  additionalInfo: string;
}

const initialFormData: FormData = {
  listingType: "",
  businessName: "",
  category: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  hours: "",
  priceRange: "",
  contactName: "",
  additionalInfo: "",
};

export default function AddBusiness() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/submit-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit");
      }
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Submission Received!",
        description: "Thank you! We'll review your listing and get back to you soon.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.listingType || !formData.businessName || !formData.description || !formData.email) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    submitMutation.mutate(formData);
  };

  const getCategoriesForType = () => {
    switch (formData.listingType) {
      case "restaurant": return restaurantCategories;
      case "event": return eventCategories;
      case "activity": return activityCategories;
      case "program": return programCategories;
      case "group": return groupCategories;
      default: return [];
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="pt-12 pb-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your business listing has been submitted for review. We'll get back to you
              at <strong>{formData.email}</strong> once it's been approved.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setLocation("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(initialFormData);
                  setSubmitted(false);
                }}
              >
                Submit Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Add Your Business</h1>
          </div>
          <p className="text-muted-foreground">
            Submit your Erie-area business, event, or organization to be featured in our directory.
            All submissions are reviewed before being published.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Fields marked with * are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Listing Type */}
              <div className="space-y-2">
                <Label htmlFor="listingType">Listing Type *</Label>
                <Select
                  value={formData.listingType}
                  onValueChange={(value) => {
                    handleChange("listingType", value);
                    handleChange("category", ""); // Reset category when type changes
                  }}
                >
                  <SelectTrigger id="listingType">
                    <SelectValue placeholder="Select a listing type" />
                  </SelectTrigger>
                  <SelectContent>
                    {listingTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName">Business / Event Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  placeholder="Enter the name"
                />
              </div>

              {/* Category */}
              {formData.listingType && (
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoriesForType().map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your business, event, or organization..."
                  rows={4}
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Street address, City, PA ZIP"
                />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="(814) 555-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  placeholder="https://www.example.com"
                />
              </div>

              {/* Hours and Price Range (for restaurants/activities) */}
              {(formData.listingType === "restaurant" || formData.listingType === "activity") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours of Operation</Label>
                    <Input
                      id="hours"
                      value={formData.hours}
                      onChange={(e) => handleChange("hours", e.target.value)}
                      placeholder="Mon-Fri 9AM-5PM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Select
                      value={formData.priceRange}
                      onValueChange={(value) => handleChange("priceRange", value)}
                    >
                      <SelectTrigger id="priceRange">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$ - Budget-friendly</SelectItem>
                        <SelectItem value="$$">$$ - Moderate</SelectItem>
                        <SelectItem value="$$$">$$$ - Upscale</SelectItem>
                        <SelectItem value="$$$$">$$$$ - Fine Dining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Contact Name */}
              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              {/* Additional Info */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange("additionalInfo", e.target.value)}
                  placeholder="Any other details you'd like us to know..."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Review
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting, you agree that the information provided is accurate.
                We'll review your submission and contact you if approved.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

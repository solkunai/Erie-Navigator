import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { businessCategories, type BusinessCategory } from "@shared/schema";

const commonFeatures = [
  "Free WiFi",
  "Wheelchair Accessible",
  "Parking Available",
  "Accepts Credit Cards",
  "Family Friendly",
  "Pet Friendly",
  "Appointments Available",
  "Walk-ins Welcome",
  "Delivery",
  "Curbside Pickup",
  "Online Ordering",
  "Gift Cards",
];

export default function AddBusiness() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "" as BusinessCategory | "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    hours: "",
    features: [] as string[],
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    logo: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Business name is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.ownerName.trim()) newErrors.ownerName = "Your name is required";
    if (!formData.ownerEmail.trim()) {
      newErrors.ownerEmail = "Your email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.ownerEmail)) {
      newErrors.ownerEmail = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === 'logo') {
          if (formData.logo) {
            submitData.append('logo', formData.logo);
          }
        } else if (key === 'features') {
          submitData.append('features', JSON.stringify(formData.features));
        } else {
          submitData.append(key, (formData as any)[key]);
        }
      });

      const response = await fetch("/api/submit-business", {
        method: "POST",
        body: submitData, // Send as FormData, not JSON
      });

      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        toast({
          title: "Success!",
          description: data.message,
        });
      } else {
        throw new Error(data.error || "Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your business. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-6">
              Your business has been submitted successfully. We'll review your listing and add it to the directory shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/businesses">
                <Button variant="outline" className="w-full sm:w-auto">
                  Browse Businesses
                </Button>
              </Link>
              <Link href="/">
                <Button className="w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-12">
          <Link href="/businesses">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Businesses
            </Button>
          </Link>
          
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Free Listing
          </p>
          <h1 className="text-3xl md:text-4xl font-serif">Add Your Business</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Get your business listed in Erie's local directory and connect with customers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Fill out the details below to add your business to Discover Erie. All submissions are reviewed before being published.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Business Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Joe's Coffee Shop"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as BusinessCategory })}
                    >
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell customers what makes your business special..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={errors.description ? "border-red-500" : ""}
                      rows={4}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Business Logo or Image (optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Check file size (max 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              toast({
                                title: "File too large",
                                description: "Please select an image under 5MB",
                                variant: "destructive",
                              });
                              e.target.value = '';
                              return;
                            }
                            setFormData({ ...formData, logo: file });
                          }
                        }}
                        className="cursor-pointer"
                      />
                      {formData.logo && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Selected: {formData.logo.name}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Upload your business logo or a representative image (PNG, JPG, or GIF - max 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St, Erie, PA 16501"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={errors.address ? "border-red-500" : ""}
                      />
                      {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        placeholder="(814) 555-1234"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@yourbusiness.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website (optional)</Label>
                      <Input
                        id="website"
                        placeholder="https://www.yourbusiness.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Business Hours (optional)</Label>
                    <Input
                      id="hours"
                      placeholder="e.g., Mon-Fri 9AM-5PM, Sat 10AM-3PM"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Features & Amenities</h3>
                  <p className="text-sm text-muted-foreground">Select all that apply to your business:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                        />
                        <Label
                          htmlFor={`feature-${feature}`}
                          className="text-sm cursor-pointer"
                        >
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Owner Information */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold text-lg">Your Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    This information is for verification purposes and won't be displayed publicly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Your Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="John Smith"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className={errors.ownerName ? "border-red-500" : ""}
                      />
                      {errors.ownerName && <p className="text-sm text-red-500">{errors.ownerName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail">Your Email *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="you@email.com"
                        value={formData.ownerEmail}
                        onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                        className={errors.ownerEmail ? "border-red-500" : ""}
                      />
                      {errors.ownerEmail && <p className="text-sm text-red-500">{errors.ownerEmail}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Your Phone (optional)</Label>
                    <Input
                      id="ownerPhone"
                      placeholder="(814) 555-1234"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Business"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting, you confirm that you are authorized to represent this business 
                    and that all information provided is accurate.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

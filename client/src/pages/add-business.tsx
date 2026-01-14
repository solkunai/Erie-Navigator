import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Building2, CheckCircle2, Loader2, Upload } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { businessCategories, type BusinessCategory } from "@shared/schema";
import { getCsrfHeaders } from "@/lib/csrf";

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

    const isIndependentBusiness = formData.category === "Independent/Pop-up";

    if (!formData.name.trim()) newErrors.name = "Business name is required";
    if (!formData.category) newErrors.category = "Please select a category";

    // Address is required for all except Independent/Pop-up businesses
    if (!isIndependentBusiness && !formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // For Independent/Pop-up businesses, require at least website OR business email
    if (isIndependentBusiness && !formData.website.trim() && !formData.email.trim()) {
      newErrors.website = "Website or business email is required for mobile/pop-up businesses";
      newErrors.email = "Website or business email is required for mobile/pop-up businesses";
    }

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
        headers: getCsrfHeaders(),
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
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your business. Please try again.",
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
      <div className="min-h-screen bg-[#FCF4F8] relative overflow-hidden flex items-center justify-center p-4">
        {/* Dotted Background Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        <div className="relative z-10 max-w-md w-full bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FFD700] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
            <CheckCircle2 className="h-12 w-12 text-black" />
          </div>
          <h2 className="text-3xl font-black mb-3 text-gray-900">Thank You!</h2>
          <p className="text-gray-700 font-medium mb-8 leading-relaxed">
            Your business has been submitted successfully. We'll review your listing and add it to the directory shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/businesses">
              <Button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-black font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                Browse Businesses
              </Button>
            </Link>
            <Link href="/">
              <Button className="w-full sm:w-auto bg-[#3A96CB] hover:bg-[#4da8db] text-white font-bold border-2 border-black rounded-sm shadow-[2px_2px_0px_0px_rgba(35,24,15,1)] hover:shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="bg-[#FFD700] border-b-4 border-black py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Link href="/businesses">
              <button className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border-4 border-black rounded-sm font-bold text-gray-900 shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                <ArrowLeft className="w-5 h-5" />
                BACK TO BUSINESSES
              </button>
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(35,24,15,1)]">
                <Building2 className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div className="bg-black text-[#FFD700] border-2 border-black rounded-sm font-bold text-xs px-3 py-1">
                FREE LISTING
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-none text-gray-900 italic">
              Add Your Business
            </h1>
            <p className="text-gray-800 text-lg max-w-2xl font-medium">
              Get your business listed in Erie's local directory and connect with customers. It's free and easy!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border-4 border-black rounded-sm shadow-[8px_8px_0px_0px_rgba(35,24,15,1)] p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Business Details */}
                <div className="space-y-6">
                  <div className="bg-[#3A96CB] border-4 border-black px-4 py-2 inline-block shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                    <h2 className="font-black text-2xl text-white">Business Details</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-bold text-gray-900">Business Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Joe's Coffee Shop"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-sm text-red-500 font-bold">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-bold text-gray-900">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as BusinessCategory })}
                    >
                      <SelectTrigger className={`border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.category ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="border-2 border-black rounded-sm">
                        {businessCategories.map((category) => (
                          <SelectItem key={category} value={category} className="font-medium">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-red-500 font-bold">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="font-bold text-gray-900">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell customers what makes your business special..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`border-2 border-black rounded-sm font-medium bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.description ? "border-red-500" : ""}`}
                      rows={4}
                    />
                    {errors.description && <p className="text-sm text-red-500 font-bold">{errors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo" className="font-bold text-gray-900">Business Logo or Image (optional)</Label>
                    <div className="border-4 border-black border-dashed rounded-sm p-6 text-center bg-[#FFD700]/10 hover:bg-[#FFD700]/20 transition-colors">
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="h-8 w-8 text-gray-700" />
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
                          className="cursor-pointer font-medium bg-white"
                        />
                        {formData.logo && (
                          <p className="text-sm font-bold text-[#3A96CB]">
                            ✓ Selected: {formData.logo.name}
                          </p>
                        )}
                        <p className="text-xs text-gray-600 font-medium">
                          Upload your business logo or a representative image (PNG, JPG, or GIF - max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="font-bold text-gray-900">
                        Address {formData.category !== "Independent/Pop-up" ? "*" : "(optional)"}
                      </Label>
                      <Input
                        id="address"
                        placeholder={formData.category === "Independent/Pop-up" ? "Physical address (if applicable)" : "123 Main St, Erie, PA 16501"}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.address ? "border-red-500" : ""}`}
                      />
                      {formData.category === "Independent/Pop-up" && !errors.address && (
                        <p className="text-xs text-gray-600 font-medium">For mobile/pop-up businesses, include website or social media below</p>
                      )}
                      {errors.address && <p className="text-sm text-red-500 font-bold">{errors.address}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-bold text-gray-900">Phone *</Label>
                      <Input
                        id="phone"
                        placeholder="(814) 555-1234"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && <p className="text-sm text-red-500 font-bold">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-bold text-gray-900">Business Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@yourbusiness.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="font-bold text-gray-900">Website (optional)</Label>
                      <Input
                        id="website"
                        placeholder="https://www.yourbusiness.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours" className="font-bold text-gray-900">Business Hours (optional)</Label>
                    <Input
                      id="hours"
                      placeholder="e.g., Mon-Fri 9AM-5PM, Sat 10AM-3PM"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      className="border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  <div className="bg-[#FF851A] border-4 border-black px-4 py-2 inline-block shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                    <h2 className="font-black text-2xl text-white">Features & Amenities</h2>
                  </div>
                  <p className="text-gray-700 font-medium">Select all that apply to your business:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {commonFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-3 bg-[#FCF4F8] p-3 border-2 border-black rounded-sm">
                        <Checkbox
                          id={`feature-${feature}`}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                          className="border-2 border-black"
                        />
                        <Label
                          htmlFor={`feature-${feature}`}
                          className="text-sm font-bold cursor-pointer text-gray-900"
                        >
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Owner Information */}
                <div className="space-y-6 pt-4 border-t-4 border-black">
                  <div className="bg-[#FFD700] border-4 border-black px-4 py-2 inline-block shadow-[3px_3px_0px_0px_rgba(35,24,15,1)]">
                    <h2 className="font-black text-2xl text-gray-900">Your Contact Information</h2>
                  </div>
                  <div className="bg-[#3A96CB]/10 border-2 border-black p-4 rounded-sm">
                    <p className="text-sm font-bold text-gray-800">
                      ℹ️ This information is for verification purposes and won't be displayed publicly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerName" className="font-bold text-gray-900">Your Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="John Smith"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className={`border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.ownerName ? "border-red-500" : ""}`}
                      />
                      {errors.ownerName && <p className="text-sm text-red-500 font-bold">{errors.ownerName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail" className="font-bold text-gray-900">Your Email *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="you@email.com"
                        value={formData.ownerEmail}
                        onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                        className={`border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black ${errors.ownerEmail ? "border-red-500" : ""}`}
                      />
                      {errors.ownerEmail && <p className="text-sm text-red-500 font-bold">{errors.ownerEmail}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone" className="font-bold text-gray-900">Your Phone (optional)</Label>
                    <Input
                      id="ownerPhone"
                      placeholder="(814) 555-1234"
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      className="border-2 border-black rounded-sm font-medium h-12 bg-white focus:bg-white focus:ring-2 focus:ring-[#FFD700] focus:border-black"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-[#3A96CB] hover:bg-[#4da8db] text-white font-black text-lg border-4 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(35,24,15,1)] hover:shadow-[6px_6px_0px_0px_rgba(35,24,15,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        SUBMITTING...
                      </>
                    ) : (
                      "SUBMIT BUSINESS"
                    )}
                  </Button>
                  <p className="text-xs text-gray-600 font-medium text-center mt-4">
                    By submitting, you confirm that you are authorized to represent this business
                    and that all information provided is accurate.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

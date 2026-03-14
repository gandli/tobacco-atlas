import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { UploadIcon, PlusIcon, XIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { useTranslation } from "react-i18next";
import OptimizedImage from "@/components/OptimizedImage";

const SubmitData = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['submit', 'common']);
  const [submissionType, setSubmissionType] = useState<"brand" | "product" | "manufacturer">("brand");
  const [formData, setFormData] = useState({
    // Common fields
    email: "",
    // Brand fields
    brandName: "",
    brandRegion: "",
    brandDescription: "",
    // Product fields
    productName: "",
    productBrand: "",
    productCategory: "",
    productPriceRange: "",
    productDescription: "",
    // Manufacturer fields
    manufacturerName: "",
    manufacturerCountry: "",
    manufacturerWebsite: "",
    manufacturerDescription: "",
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email) {
      toast({
        title: t('submit:enterEmail'),
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('submit:invalidEmail'),
        variant: "destructive",
      });
      return;
    }

    // Type-specific validation
    if (submissionType === "brand") {
      if (!formData.brandName || !formData.brandRegion) {
        toast({
          title: t('submit:enterBrandNameRegion'),
          variant: "destructive",
        });
        return;
      }
    } else if (submissionType === "product") {
      if (!formData.productName || !formData.productBrand) {
        toast({
          title: t('submit:enterProductNameBrand'),
          variant: "destructive",
        });
        return;
      }
    } else if (submissionType === "manufacturer") {
      if (!formData.manufacturerName || !formData.manufacturerCountry) {
        toast({
          title: t('submit:enterManufacturerNameCountry'),
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual submission logic
      // This should call backend API to submit the data
      
      toast({
        title: t('submit:submitSuccess'),
        description: t('submit:submitSuccessDesc'),
      });
      
      // Reset form
      setFormData({
        email: "",
        brandName: "",
        brandRegion: "",
        brandDescription: "",
        productName: "",
        productBrand: "",
        productCategory: "",
        productPriceRange: "",
        productDescription: "",
        manufacturerName: "",
        manufacturerCountry: "",
        manufacturerWebsite: "",
        manufacturerDescription: "",
      });
      setPreviewImages([]);
    } catch (error) {
      toast({
        title: t('submit:submitFailed'),
        description: t('submit:tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t('submit:title')}</CardTitle>
              <CardDescription>
                {t('submit:description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Submission Type */}
              <div className="space-y-2">
                <Label>{t('submit:submissionType')}</Label>
                <Select value={submissionType} onValueChange={(value: "brand" | "product" | "manufacturer") => setSubmissionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('submit:selectType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">{t('submit:brand')}</SelectItem>
                    <SelectItem value="product">{t('submit:product')}</SelectItem>
                    <SelectItem value="manufacturer">{t('submit:manufacturer')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('submit:yourEmail')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {t('submit:emailNotice')}
                </p>
              </div>

              {/* Dynamic Form Fields */}
              {submissionType === "brand" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('submit:brandInfo')}</h3>
                  <div className="space-y-2">
                    <Label htmlFor="brandName">{t('submit:brandName')} *</Label>
                    <Input
                      id="brandName"
                      name="brandName"
                      placeholder={t('submit:brandNamePlaceholder')}
                      value={formData.brandName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandRegion">{t('submit:brandRegion')} *</Label>
                    <Input
                      id="brandRegion"
                      name="brandRegion"
                      placeholder={t('submit:brandRegionPlaceholder')}
                      value={formData.brandRegion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandDescription">{t('submit:brandDescription')}</Label>
                    <Textarea
                      id="brandDescription"
                      name="brandDescription"
                      placeholder={t('submit:brandDescPlaceholder')}
                      value={formData.brandDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {submissionType === "product" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('submit:productInfo')}</h3>
                  <div className="space-y-2">
                    <Label htmlFor="productName">{t('submit:productName')} *</Label>
                    <Input
                      id="productName"
                      name="productName"
                      placeholder={t('submit:productNamePlaceholder')}
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productBrand">{t('submit:productBrand')} *</Label>
                    <Input
                      id="productBrand"
                      name="productBrand"
                      placeholder={t('submit:productBrandPlaceholder')}
                      value={formData.productBrand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">{t('submit:productCategory')}</Label>
                    <Input
                      id="productCategory"
                      name="productCategory"
                      placeholder={t('submit:productCategoryPlaceholder')}
                      value={formData.productCategory}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productPriceRange">{t('submit:priceRange')}</Label>
                    <Input
                      id="productPriceRange"
                      name="productPriceRange"
                      placeholder={t('submit:priceRangePlaceholder')}
                      value={formData.productPriceRange}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">{t('submit:productDescription')}</Label>
                    <Textarea
                      id="productDescription"
                      name="productDescription"
                      placeholder={t('submit:productDescPlaceholder')}
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {submissionType === "manufacturer" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('submit:manufacturerInfo')}</h3>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerName">{t('submit:manufacturerName')} *</Label>
                    <Input
                      id="manufacturerName"
                      name="manufacturerName"
                      placeholder={t('submit:manufacturerNamePlaceholder')}
                      value={formData.manufacturerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerCountry">{t('submit:manufacturerCountry')} *</Label>
                    <Input
                      id="manufacturerCountry"
                      name="manufacturerCountry"
                      placeholder={t('submit:manufacturerCountryPlaceholder')}
                      value={formData.manufacturerCountry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerWebsite">{t('submit:manufacturerWebsite')}</Label>
                    <Input
                      id="manufacturerWebsite"
                      name="manufacturerWebsite"
                      placeholder={t('submit:manufacturerWebsitePlaceholder')}
                      value={formData.manufacturerWebsite}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerDescription">{t('submit:manufacturerDescription')}</Label>
                    <Textarea
                      id="manufacturerDescription"
                      name="manufacturerDescription"
                      placeholder={t('submit:manufacturerDescPlaceholder')}
                      value={formData.manufacturerDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>{t('submit:images')}</Label>
                <div className="flex flex-wrap gap-2">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <OptimizedImage
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded border"
                        sizes="96px"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-muted-foreground rounded cursor-pointer hover:bg-muted">
                    <UploadIcon className="h-6 w-6 text-muted-foreground" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('submit:imagesNotice')}
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/">{t('submit:backHome')}</Link>
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? t('submit:submitting') : t('submit:submitData')}
            </Button>
          </CardFooter>
        </Card>
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default SubmitData;

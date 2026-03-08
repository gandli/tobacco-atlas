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

const SubmitData = () => {
  const navigate = useNavigate();
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
        title: "错误",
        description: "请输入您的邮箱地址",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "错误",
        description: "请输入有效的邮箱地址",
        variant: "destructive",
      });
      return;
    }

    // Type-specific validation
    if (submissionType === "brand") {
      if (!formData.brandName || !formData.brandRegion) {
        toast({
          title: "错误",
          description: "请填写品牌名称和所属地区",
          variant: "destructive",
        });
        return;
      }
    } else if (submissionType === "product") {
      if (!formData.productName || !formData.productBrand) {
        toast({
          title: "错误",
          description: "请填写产品名称和所属品牌",
          variant: "destructive",
        });
        return;
      }
    } else if (submissionType === "manufacturer") {
      if (!formData.manufacturerName || !formData.manufacturerCountry) {
        toast({
          title: "错误",
          description: "请填写制造商名称和国家",
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
        title: "提交成功",
        description: "感谢您的贡献！管理员将审核您的提交。",
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
        title: "提交失败",
        description: "请稍后重试",
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
              <CardTitle className="text-2xl font-bold">提交数据</CardTitle>
              <CardDescription>
                帮助我们完善烟草图谱数据库。您可以提交新的品牌、产品或制造商信息。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Submission Type */}
              <div className="space-y-2">
                <Label>提交类型</Label>
                <Select value={submissionType} onValueChange={(value: any) => setSubmissionType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择提交类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand">品牌</SelectItem>
                    <SelectItem value="product">产品</SelectItem>
                    <SelectItem value="manufacturer">制造商</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="email">您的邮箱地址</Label>
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
                  我们会通过邮箱通知您审核结果
                </p>
              </div>

              {/* Dynamic Form Fields */}
              {submissionType === "brand" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">品牌信息</h3>
                  <div className="space-y-2">
                    <Label htmlFor="brandName">品牌名称 *</Label>
                    <Input
                      id="brandName"
                      name="brandName"
                      placeholder="例如：中华、万宝路"
                      value={formData.brandName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandRegion">所属地区 *</Label>
                    <Input
                      id="brandRegion"
                      name="brandRegion"
                      placeholder="例如：中国、美国、日本"
                      value={formData.brandRegion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brandDescription">品牌描述</Label>
                    <Textarea
                      id="brandDescription"
                      name="brandDescription"
                      placeholder="品牌历史、特点等信息"
                      value={formData.brandDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {submissionType === "product" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">产品信息</h3>
                  <div className="space-y-2">
                    <Label htmlFor="productName">产品名称 *</Label>
                    <Input
                      id="productName"
                      name="productName"
                      placeholder="例如：中华（软）"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productBrand">所属品牌 *</Label>
                    <Input
                      id="productBrand"
                      name="productBrand"
                      placeholder="例如：中华"
                      value={formData.productBrand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">产品类别</Label>
                    <Input
                      id="productCategory"
                      name="productCategory"
                      placeholder="例如：烤烟型、混合型"
                      value={formData.productCategory}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productPriceRange">价格区间</Label>
                    <Input
                      id="productPriceRange"
                      name="productPriceRange"
                      placeholder="例如：50-100元"
                      value={formData.productPriceRange}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productDescription">产品描述</Label>
                    <Textarea
                      id="productDescription"
                      name="productDescription"
                      placeholder="产品特点、包装、口感等信息"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {submissionType === "manufacturer" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">制造商信息</h3>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerName">制造商名称 *</Label>
                    <Input
                      id="manufacturerName"
                      name="manufacturerName"
                      placeholder="例如：上海烟草集团"
                      value={formData.manufacturerName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerCountry">国家/地区 *</Label>
                    <Input
                      id="manufacturerCountry"
                      name="manufacturerCountry"
                      placeholder="例如：中国、美国"
                      value={formData.manufacturerCountry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerWebsite">官方网站</Label>
                    <Input
                      id="manufacturerWebsite"
                      name="manufacturerWebsite"
                      placeholder="https://example.com"
                      value={formData.manufacturerWebsite}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturerDescription">制造商描述</Label>
                    <Textarea
                      id="manufacturerDescription"
                      name="manufacturerDescription"
                      placeholder="公司历史、规模、主要产品等信息"
                      value={formData.manufacturerDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>相关图片</Label>
                <div className="flex flex-wrap gap-2">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded border"
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
                  支持上传品牌logo、产品包装、制造商标识等相关图片
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/">返回首页</Link>
            </Button>
            <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "提交中..." : "提交数据"}
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
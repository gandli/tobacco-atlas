import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本验证
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      toast({
        title: t('register.fillAllFields'),
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: t('register.invalidEmail'),
        variant: "destructive",
      });
      return;
    }

    if (formData.username.length < 2) {
      toast({
        title: t('register.usernameTooShort'),
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('register.passwordMismatch'),
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: t('register.passwordTooShort'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: 实现实际的注册逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('register.registerSuccess'),
        description: t('register.welcomeCommunity'),
      });
      
      // 注册成功后跳转到登录页面
      navigate("/login");
    } catch (error) {
      toast({
        title: t('register.registerFailed'),
        description: t('register.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      <div className="p-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common:back')}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t('register.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('register.description')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('register.email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">{t('register.username')}</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={t('register.usernamePlaceholder')}
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('register.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('register.passwordPlaceholder')}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('register.confirmPassword')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t('register.confirmPasswordPlaceholder')}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t('register.submitting') : t('register.submit')}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                {t('register.hasAccount')}{" "}
                <Link to="/login" className="text-primary hover:underline">
                  {t('register.loginNow')}
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
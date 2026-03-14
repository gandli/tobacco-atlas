import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t('validation.enterEmailPassword'),
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: t('validation.invalidEmail'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: 实现登录逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('login.loginSuccess'),
        description: t('login.welcomeBack'),
      });
      
      // 登录成功后跳转到首页
      navigate('/');
    } catch (error) {
      toast({
        title: t('login.loginFailed'),
        description: t('login.invalidCredentials'),
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
            <CardTitle className="text-2xl font-bold text-center">{t('login.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('login.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('login.password')}</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      {t('login.forgotPassword')}
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
              </div>
              <Button 
                className="w-full mt-6"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? t('login.submitting') : t('login.submit')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t('common:or')}
                </span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // TODO: 实现第三方登录
                toast({
                  title: t('common:loading'),
                  description: t('login.googleLoginDev'),
                });
              }}
            >
              {t('login.googleLogin')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('login.noAccount')}{' '}
              <Link to="/register" className="text-primary hover:underline">
                {t('login.registerNow')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
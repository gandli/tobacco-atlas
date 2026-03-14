import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import "@/lib/i18n"; // Initialize i18n

// 懒加载页面组件，减少首屏加载时间
const Index = lazy(() => import("./legacy-pages/Index"));
const BrandList = lazy(() => import("./legacy-pages/BrandList"));
const BrandDetail = lazy(() => import("./legacy-pages/BrandDetail"));
const SkuDetail = lazy(() => import("./legacy-pages/SkuDetail"));
const Community = lazy(() => import("./legacy-pages/Community"));
const Chat = lazy(() => import("./legacy-pages/Chat"));
const Gallery = lazy(() => import("./legacy-pages/Gallery"));
const Feed = lazy(() => import("./legacy-pages/Feed"));
const MyPage = lazy(() => import("./legacy-pages/MyPage"));
const Login = lazy(() => import("./legacy-pages/Login"));
const Register = lazy(() => import("./legacy-pages/Register"));
const ForgotPassword = lazy(() => import("./legacy-pages/ForgotPassword"));
const SubmitData = lazy(() => import("./legacy-pages/SubmitData"));
const AdminDashboard = lazy(() => import("./legacy-pages/AdminDashboard"));
const ManufacturerDetail = lazy(() => import("./legacy-pages/ManufacturerDetail"));
const ManufacturerList = lazy(() => import("./legacy-pages/ManufacturerList"));
const Changelog = lazy(() => import("./legacy-pages/Changelog"));
const NotFound = lazy(() => import("./legacy-pages/NotFound"));

const queryClient = new QueryClient();

// 页面加载骨架屏
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/brands" element={<BrandList />} />
              <Route path="/brand/:pinyin" element={<BrandDetail />} />
              <Route path="/sku/:id" element={<SkuDetail />} />
              <Route path="/community" element={<Community />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/my" element={<MyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/submit" element={<SubmitData />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/manufacturers" element={<ManufacturerList />} />
              <Route path="/manufacturer/:name" element={<ManufacturerDetail />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

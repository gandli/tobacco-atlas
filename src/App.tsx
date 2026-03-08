import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import "@/lib/i18n"; // Initialize i18n

// 懒加载页面组件，减少首屏加载时间
const Index = lazy(() => import("./pages/Index"));
const BrandList = lazy(() => import("./pages/BrandList"));
const BrandDetail = lazy(() => import("./pages/BrandDetail"));
const SkuDetail = lazy(() => import("./pages/SkuDetail"));
const Community = lazy(() => import("./pages/Community"));
const Chat = lazy(() => import("./pages/Chat"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Feed = lazy(() => import("./pages/Feed"));
const MyPage = lazy(() => import("./pages/MyPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const SubmitData = lazy(() => import("./pages/SubmitData"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ManufacturerDetail = lazy(() => import("./pages/ManufacturerDetail"));
const ManufacturerList = lazy(() => import("./pages/ManufacturerList"));
const Changelog = lazy(() => import("./pages/Changelog"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
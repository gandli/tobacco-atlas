"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { getRecommendations, getRecommendedProducts } from "@/lib/recommendation-algo";
import type { Recommendation } from "@/data/types";

export default function TestRecommendPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const recs = getRecommendations({ limit: 5 });
      setRecommendations(recs);
      
      const productsWithDetails = getRecommendedProducts(recs);
      setProducts(productsWithDetails);
      
      console.log("Recommendations loaded:", recs.length);
      console.log("Products loaded:", productsWithDetails.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error loading recommendations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <div className="pt-[var(--nav-height)] p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">推荐系统测试页面</h1>
          
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>
              刷新页面
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/recommend"}>
              前往正式页面
            </Button>
          </div>

          {loading && <p>加载中...</p>}
          {error && (
            <div className="p-4 bg-red-100 border border-red-300 rounded text-red-800">
              <h3 className="font-bold">错误:</h3>
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">推荐结果 ({recommendations.length})</h2>
            {recommendations.map((rec, i) => (
              <div key={i} className="p-4 border rounded bg-card">
                <p><strong>产品 ID:</strong> {rec.productId}</p>
                <p><strong>类型:</strong> {rec.type}</p>
                <p><strong>分数:</strong> {rec.score}</p>
                <p><strong>原因:</strong> {rec.reasons.join(", ")}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">产品详情 ({products.length})</h2>
            {products.map((product) => (
              <div key={product.sku_id} className="p-4 border rounded bg-card">
                <p><strong>ID:</strong> {product.sku_id}</p>
                <p><strong>名称:</strong> {product.name}</p>
                <p><strong>品牌:</strong> {product.brand}</p>
                <p><strong>价格:</strong> ¥{product.packPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileNav />
    </main>
  );
}

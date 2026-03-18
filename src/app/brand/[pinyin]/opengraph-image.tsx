import { ImageResponse } from 'next/og';
import { getBrandByPinyin } from '@/data/brand-catalog';
import { getProductsByBrand } from '@/data/product-catalog';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { pinyin: string } }) {
  const brand = getBrandByPinyin(params.pinyin);
  const products = getProductsByBrand(params.pinyin);
  const productCount = products.length;

  // Fetch Inter Bold font
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter (web)/Inter-Bold.woff2'
  ).then((res) => res.arrayBuffer());

  const brandName = brand?.name || params.pinyin;
  const companyName = brand?.company || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Brand Badge */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #e94560 0%, #c73e54 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 60px rgba(233, 69, 96, 0.3)',
            fontSize: '70px',
          }}
        >
          🚬
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '28px',
              color: '#e94560',
              fontWeight: '600',
              fontFamily: 'Inter',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Brand Profile
          </div>

          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-2px',
              fontFamily: 'Inter',
            }}
          >
            {brandName}
          </h1>

          {companyName && (
            <p
              style={{
                fontSize: '24px',
                color: '#b2ada7',
                margin: '10px 0 0 0',
                fontFamily: 'Inter',
                maxWidth: '800px',
              }}
            >
              {companyName}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#e94560',
                  fontFamily: 'Inter',
                }}
              >
                {productCount}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#666661',
                  fontFamily: 'Inter',
                }}
              >
                Products
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '60px',
            right: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '18px',
            color: '#666661',
            fontFamily: 'Inter',
          }}
        >
          <span>Tobacco Atlas - 中国烟草博物馆</span>
          <span>tobacco-atlas.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}

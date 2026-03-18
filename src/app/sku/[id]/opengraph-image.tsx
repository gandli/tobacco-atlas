import { ImageResponse } from 'next/og';
import { getProductById } from '@/data/product-catalog';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const product = getProductById(Number(params.id));

  // Fetch Inter Bold font
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter (web)/Inter-Bold.woff2'
  ).then((res) => res.arrayBuffer());

  const productName = product?.name || 'Unknown Product';
  const brandName = product?.brand || '';
  const region = product?.region || '';
  const tar = product?.tar;
  const price = product?.price;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left Side - Product Info */}
        <div
          style={{
            width: '65%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px',
            gap: '24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Brand Label */}
          <div
            style={{
              fontSize: '24px',
              color: '#e94560',
              fontWeight: '600',
              fontFamily: 'Inter',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {brandName}
          </div>

          {/* Product Name */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-1px',
              fontFamily: 'Inter',
              lineHeight: 1.1,
            }}
          >
            {productName}
          </h1>

          {/* Product Details */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            {tar && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#e94560',
                    fontFamily: 'Inter',
                  }}
                >
                  {tar}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#666661',
                    fontFamily: 'Inter',
                  }}
                >
                  Tar
                </div>
              </div>
            )}
            {price && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#e94560',
                    fontFamily: 'Inter',
                  }}
                >
                  ¥{price}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#666661',
                    fontFamily: 'Inter',
                  }}
                >
                  Price
                </div>
              </div>
            )}
            {region && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#e94560',
                    fontFamily: 'Inter',
                  }}
                >
                  {region === 'hkmo' ? '🇭🇰' : region === 'international' ? '🌍' : '🇨🇳'}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: '#666661',
                    fontFamily: 'Inter',
                  }}
                >
                  Region
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Decorative */}
        <div
          style={{
            width: '35%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(233, 69, 96, 0.05) 100%)',
            position: 'relative',
          }}
        >
          {/* Large Cigarette Icon */}
          <div
            style={{
              fontSize: '200px',
              filter: 'drop-shadow(0 20px 60px rgba(233, 69, 96, 0.3))',
            }}
          >
            🚬
          </div>

          {/* Decorative Circles */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.2) 0%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.2) 0%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
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

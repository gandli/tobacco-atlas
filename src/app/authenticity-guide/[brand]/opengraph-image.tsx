import { ImageResponse } from 'next/og';
import { getAuthenticityGuideByBrand } from '@/data/authenticity-guides';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { brand: string } }) {
  // 兼容性处理：chungwa -> zhonghua
  const resolvedBrand = params.brand === 'chungwa' ? 'zhonghua' : params.brand;
  const guide = getAuthenticityGuideByBrand(resolvedBrand);

  // Fetch Inter Bold font
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter (web)/Inter-Bold.woff2'
  ).then((res) => res.arrayBuffer());

  const brandNameZh = guide?.brandNameZh || 'Unknown';
  const brandNameEn = guide?.brandNameEn || params.brand;

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
        {/* Left Side - Brand Info */}
        <div
          style={{
            width: '60%',
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
          {/* Label */}
          <div
            style={{
              fontSize: '24px',
              color: '#10b981',
              fontWeight: '600',
              fontFamily: 'Inter',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Authenticity Guide
          </div>

          {/* Brand Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-2px',
              fontFamily: 'Inter',
              lineHeight: 1.1,
            }}
          >
            {brandNameZh}
          </h1>

          {brandNameEn && brandNameEn !== brandNameZh && (
            <p
              style={{
                fontSize: '32px',
                color: '#b2ada7',
                margin: '10px 0 0 0',
                fontFamily: 'Inter',
              }}
            >
              {brandNameEn}
            </p>
          )}

          {/* Verification Points */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#10b981',
                  fontFamily: 'Inter',
                }}
              >
                📦
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#666661',
                  fontFamily: 'Inter',
                }}
              >
                Packaging
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#10b981',
                  fontFamily: 'Inter',
                }}
              >
                🚬
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#666661',
                  fontFamily: 'Inter',
                }}
              >
                Cigarette
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#10b981',
                  fontFamily: 'Inter',
                }}
              >
                👃
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#666661',
                  fontFamily: 'Inter',
                }}
              >
                Smell
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#10b981',
                  fontFamily: 'Inter',
                }}
              >
                🔥
              </div>
              <div
                style={{
                  fontSize: '16px',
                  color: '#666661',
                  fontFamily: 'Inter',
                }}
              >
                Burn
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Decorative Shield */}
        <div
          style={{
            width: '40%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            position: 'relative',
          }}
        >
          {/* Large Shield Icon */}
          <div
            style={{
              fontSize: '280px',
              filter: 'drop-shadow(0 20px 60px rgba(16, 185, 129, 0.3))',
            }}
          >
            🛡️
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
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, transparent 100%)',
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
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, transparent 100%)',
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

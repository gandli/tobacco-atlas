import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Chinese Cigarette Museum - 中国烟草博物馆';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  // Fetch Inter Bold font
  const fontData = await fetch(
    'https://cdn.jsdelivr.net/npm/inter-ui@3.19.3/Inter (web)/Inter-Bold.woff2'
  ).then((res) => res.arrayBuffer());

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
        
        {/* Decorative Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(233, 69, 96, 0.05) 100%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(233, 69, 96, 0.05) 100%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Logo/Icon */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #e94560 0%, #c73e54 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 60px rgba(233, 69, 96, 0.3)',
            fontSize: '60px',
          }}
        >
          🚬
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-2px',
              fontFamily: 'Inter',
            }}
          >
            Tobacco Atlas
          </h1>
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '32px',
              color: '#e94560',
              fontWeight: '600',
              fontFamily: 'Inter',
            }}
          >
            <span>中国烟草博物馆</span>
          </div>

          <p
            style={{
              fontSize: '24px',
              color: '#b2ada7',
              margin: '20px 0 0 0',
              maxWidth: '800px',
              textAlign: 'center',
              fontFamily: 'Inter',
              lineHeight: 1.5,
            }}
          >
            探索中国烟草品牌和产品的综合数据库
          </p>
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
          <span>Comprehensive Guide to Chinese Tobacco Products</span>
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

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MobileNav from '@/components/MobileNav';

interface Manufacturer {
  id: string;
  name: string;
  nameEn: string;
  logo?: string;
  brandCount: number;
  region: string;
}

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredManufacturers, setFilteredManufacturers] = useState<Manufacturer[]>([]);

  // Mock data - in a real app this would come from an API
  const mockManufacturers: Manufacturer[] = [
    {
      id: '1',
      name: '中国烟草总公司',
      nameEn: 'China National Tobacco Corporation',
      brandCount: 98,
      region: '中国大陆'
    },
    {
      id: '2',
      name: '香港烟草有限公司',
      nameEn: 'Hong Kong Tobacco Co. Ltd.',
      brandCount: 5,
      region: '港澳台'
    },
    {
      id: '3',
      name: '菲利普莫里斯国际',
      nameEn: 'Philip Morris International',
      brandCount: 12,
      region: '国际'
    },
    {
      id: '4',
      name: '英美烟草公司',
      nameEn: 'British American Tobacco',
      brandCount: 15,
      region: '国际'
    },
    {
      id: '5',
      name: '日本烟草国际',
      nameEn: 'Japan Tobacco International',
      brandCount: 8,
      region: '国际'
    },
    {
      id: '6',
      name: '历史烟草公司',
      nameEn: 'Historical Tobacco Company',
      brandCount: 73,
      region: '历史'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setManufacturers(mockManufacturers);
    setFilteredManufacturers(mockManufacturers);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredManufacturers(manufacturers);
    } else {
      const filtered = manufacturers.filter(
        manufacturer =>
          manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          manufacturer.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredManufacturers(filtered);
    }
  }, [searchTerm, manufacturers]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[var(--nav-height)] pb-mobile-nav md:pb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                Manufacturers
              </p>
              <h1 className="text-3xl font-bold">制造商</h1>
              <p className="text-muted-foreground mt-2">
                浏览所有烟草制造商及其品牌
              </p>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索制造商..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredManufacturers.map((manufacturer) => (
              <Link 
                key={manufacturer.id} 
                to={`/manufacturer/${manufacturer.id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="text-xl">{manufacturer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{manufacturer.nameEn}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {manufacturer.region}
                      </span>
                      <Button variant="outline" size="sm">
                        {manufacturer.brandCount} 个品牌
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredManufacturers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">未找到匹配的制造商</p>
            </div>
          )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
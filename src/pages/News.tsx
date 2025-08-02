import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Clock, User, TrendingUp } from 'lucide-react';
import { cryptoNews, newsCategories, NewsArticle } from '@/data/news';
import Navbar from '@/components/Navbar';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNews = useMemo(() => {
    return cryptoNews.filter((article: NewsArticle) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getCategoryColor = (category: string) => {
    const colors = {
      analysis: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      'new-coins': 'bg-green-500/10 text-green-500 border-green-500/20',
      investors: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      whale: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      general: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Berita Kripto Terkini
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Analisis mendalam, info coin baru, pergerakan investor, dan whale alert terbaru
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {newsCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <Link key={article.id} to={`/news/${article.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getCategoryColor(article.category)} font-medium`}>
                      {newsCategories.find(cat => cat.id === article.category)?.name}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime} min
                      </div>
                    </div>
                    <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah kata kunci pencarian atau kategori</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
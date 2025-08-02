import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, User, Calendar, Share } from 'lucide-react';
import { cryptoNews, newsCategories } from '@/data/news';
import Navbar from '@/components/Navbar';
import ReactMarkdown from 'react-markdown';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = cryptoNews.find(article => article.id === id);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
          <Button onClick={() => navigate('/news')}>Kembali ke Berita</Button>
        </div>
      </div>
    );
  }

  const categoryInfo = newsCategories.find(cat => cat.id === article.category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/news')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Berita
        </Button>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Badge className="mb-4">
              {categoryInfo?.icon} {categoryInfo?.name}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {article.readTime} menit baca
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Image */}
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Share Button */}
          <div className="mt-8 pt-8 border-t">
            <Button 
              variant="outline" 
              onClick={() => navigator.share?.({ title: article.title, url: window.location.href })}
            >
              <Share className="h-4 w-4 mr-2" />
              Bagikan Artikel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
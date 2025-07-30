import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { allArticles, categories } from '@/data/articles';
import { ArrowLeft, Clock, User, Star, Send, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  createdAt: string;
  rating?: number;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const article = allArticles.find(a => a.id === id);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Load comments from localStorage
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      const allComments = JSON.parse(savedComments);
      setComments(allComments.filter((comment: Comment) => comment.articleId === id));
    }
  }, [currentUser, id, navigate]);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !currentUser) return;

    const comment: Comment = {
      id: uuidv4(),
      articleId: id!,
      author: currentUser.email!,
      content: newComment,
      createdAt: new Date().toISOString(),
      rating: userRating > 0 ? userRating : undefined
    };

    // Save to localStorage
    const savedComments = localStorage.getItem('comments');
    const allComments = savedComments ? JSON.parse(savedComments) : [];
    allComments.push(comment);
    localStorage.setItem('comments', JSON.stringify(allComments));

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setUserRating(0);

    toast({
      title: "Komentar Berhasil Ditambahkan",
      description: "Terima kasih atas feedback Anda!",
    });
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
            <Button onClick={() => navigate('/articles')}>
              Kembali ke Artikel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === article.category);
  const averageRating = comments.filter(c => c.rating).length > 0 
    ? comments.filter(c => c.rating).reduce((acc, c) => acc + (c.rating || 0), 0) / comments.filter(c => c.rating).length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <article className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/articles')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Artikel
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">
                {category?.icon} {category?.name}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-foreground/60">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min baca</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-foreground/60 mb-6">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            {/* Rating Display */}
            {averageRating > 0 && (
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= averageRating ? 'fill-primary text-primary' : 'text-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/60">
                  {averageRating.toFixed(1)} ({comments.filter(c => c.rating).length} rating)
                </span>
              </div>
            )}
          </div>

          {/* Article Header */}
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <span className="text-8xl">📖</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12 text-foreground/90 leading-relaxed">
            <ReactMarkdown 
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold mb-6 gradient-text">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="mb-4 text-foreground/80 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                li: ({children}) => <li className="text-foreground/80">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-foreground/70 bg-card/50 p-4 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                code: ({children}) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Comments Section */}
          <Card className="crypto-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Komentar & Rating</h3>
                <span className="text-sm text-foreground/60">({comments.length})</span>
              </div>

              {/* Add Comment Form */}
              <div className="mb-8 p-4 bg-card/50 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Berikan Rating (Opsional)</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer transition-colors ${
                          star <= (hoverRating || userRating) 
                            ? 'fill-primary text-primary' 
                            : 'text-foreground/30 hover:text-primary/50'
                        }`}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                  </div>
                </div>
                
                <Textarea
                  placeholder="Tulis komentar Anda..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                  rows={3}
                />
                
                <Button 
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="w-full md:w-auto"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Komentar
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-center text-foreground/60 py-8">
                    Belum ada komentar. Jadilah yang pertama!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border border-border/50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {comment.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{comment.author}</p>
                            <p className="text-xs text-foreground/60">
                              {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        {comment.rating && (
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= comment.rating! ? 'fill-primary text-primary' : 'text-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-foreground/80">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Artikel Terkait</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allArticles
                .filter(a => a.id !== article.id && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Card 
                    key={relatedArticle.id}
                    className="crypto-card hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/article/${relatedArticle.id}`)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <span className="text-4xl">📖</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">{relatedArticle.title}</h4>
                      <p className="text-sm text-foreground/70 line-clamp-2">{relatedArticle.excerpt}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-foreground/60">
                        <span>{relatedArticle.readTime} min</span>
                        <span>{new Date(relatedArticle.publishedAt).toLocaleDateString('id-ID')}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
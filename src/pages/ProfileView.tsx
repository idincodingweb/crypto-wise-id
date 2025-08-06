import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Settings, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

interface Profile {
  id?: string;
  user_id: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  social_media: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  created_at?: string;
  updated_at?: string;
}

const ProfileView = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const fetchProfile = async () => {
    if (!currentUser) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          id: data.id,
          user_id: data.user_id,
          display_name: data.display_name || '',
          avatar_url: data.avatar_url || '',
          bio: data.bio || '',
          social_media: (typeof data.social_media === 'object' && data.social_media !== null && !Array.isArray(data.social_media)) ? data.social_media as any : {},
          created_at: data.created_at,
          updated_at: data.updated_at
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <p>Silakan login untuk mengakses halaman profil.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-2xl mx-auto text-center">
            <p>Memuat profil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="gradient-text">Profil</span>
            </h1>
            <Button 
              onClick={() => navigate('/profile/settings')}
              variant="outline"
              size="sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              Edit Profil
            </Button>
          </div>

          <Card className="crypto-card">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {profile?.display_name?.[0] || currentUser.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {profile?.display_name || 'Pengguna'}
                  </CardTitle>
                  <p className="text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Bio Section */}
              {profile?.bio && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Bio</h3>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
              )}

              {/* Social Media Links */}
              {profile?.social_media && Object.keys(profile.social_media).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                  <div className="flex flex-wrap gap-3">
                    {profile.social_media.twitter && (
                      <Badge variant="secondary" className="p-2">
                        <Twitter className="h-4 w-4 mr-2" />
                        {profile.social_media.twitter}
                      </Badge>
                    )}
                    {profile.social_media.linkedin && (
                      <Badge variant="secondary" className="p-2">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Badge>
                    )}
                    {profile.social_media.instagram && (
                      <Badge variant="secondary" className="p-2">
                        <Instagram className="h-4 w-4 mr-2" />
                        {profile.social_media.instagram}
                      </Badge>
                    )}
                    {profile.social_media.website && (
                      <Badge variant="secondary" className="p-2">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Account Info */}
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-2">Informasi Akun</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Email: {currentUser.email}</p>
                  {profile?.created_at && (
                    <p>Bergabung: {new Date(profile.created_at).toLocaleDateString('id-ID')}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
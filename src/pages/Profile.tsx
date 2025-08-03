import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, User, Link as LinkIcon, Save, Loader2 } from 'lucide-react';
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
}

interface DbProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  social_media: any;
  created_at: string;
  updated_at: string;
}

const Profile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    user_id: currentUser?.uid || '',
    display_name: '',
    avatar_url: '',
    bio: '',
    social_media: {}
  });

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
        .eq('user_id', currentUser.uid)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          id: data.id,
          user_id: data.user_id,
          display_name: data.display_name || '',
          avatar_url: data.avatar_url || '',
          bio: data.bio || '',
          social_media: (typeof data.social_media === 'object' && data.social_media !== null && !Array.isArray(data.social_media)) ? data.social_media as any : {}
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal mengambil data profil",
        variant: "destructive",
      });
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser?.uid}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setProfile(prev => ({ ...prev, avatar_url: data.publicUrl }));

      toast({
        title: "Berhasil",
        description: "Avatar berhasil diupload",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      const profileData = {
        user_id: currentUser.uid,
        display_name: profile.display_name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        social_media: profile.social_media
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) {
        throw error;
      }

      toast({
        title: "Berhasil",
        description: "Profil berhasil disimpan",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menyimpan profil",
        variant: "destructive",
      });
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">Profil Saya</span>
          </h1>

          <Card className="crypto-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informasi Profil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {profile.display_name?.[0] || currentUser.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full p-2"
                    disabled={uploading}
                  >
                    <label htmlFor="avatar" className="cursor-pointer">
                      {uploading ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Upload className="h-3 w-3" />
                      )}
                    </label>
                  </Button>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Klik icon upload untuk mengubah avatar
                </p>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="display_name">Nama Tampilan</Label>
                  <Input
                    id="display_name"
                    value={profile.display_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, display_name: e.target.value }))}
                    placeholder="Masukkan nama tampilan"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={currentUser.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Ceritakan tentang diri Anda..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>Social Media</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profile.social_media.twitter || ''}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        social_media: { ...prev.social_media, twitter: e.target.value }
                      }))}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.social_media.linkedin || ''}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        social_media: { ...prev.social_media, linkedin: e.target.value }
                      }))}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={profile.social_media.instagram || ''}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        social_media: { ...prev.social_media, instagram: e.target.value }
                      }))}
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.social_media.website || ''}
                      onChange={(e) => setProfile(prev => ({ 
                        ...prev, 
                        social_media: { ...prev.social_media, website: e.target.value }
                      }))}
                      placeholder="https://website.com"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <Button 
                onClick={saveProfile} 
                className="w-full crypto-glow"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan Profil
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
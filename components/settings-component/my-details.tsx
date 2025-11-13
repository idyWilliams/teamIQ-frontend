'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axiosInstance, { tokenStorage } from '@/services/axios';
import { jwtDecode } from 'jwt-decode';
import { Loader2 } from 'lucide-react';

type TokenPayload = { id: number };

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  profile_image: string | null;
  cover_image: string | null;
};

const MyDetails = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingInfo, setEditingInfo] = useState<keyof User | null>(null);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [editType, setEditType] = useState<'profile' | 'cover' | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = tokenStorage.get();
        if (!token) throw new Error('Not logged in');
        const decoded = jwtDecode<TokenPayload>(token);
        const res = await axiosInstance.get(`/users/${decoded.id}`);
        setUser(res.data.data);
        setFormData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (key: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveInfo = async (key: keyof User) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const payload = { [key]: formData[key] };
      const token = tokenStorage.get();
      if (!token) throw new Error('Not logged in');
      const decoded = jwtDecode<TokenPayload>(token);
      const res = await axiosInstance.put(`/users/${decoded.id}`, payload);
      setUser(res.data.data);
      setEditingInfo(null);
    } catch (err) {
      console.error('Failed to save info:', err);
      setError('Failed to update field.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleUploadImage = async () => {
    if (!editType || !fileInputRef.current?.files?.[0] || !user) return;
    const file = fileInputRef.current.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('image_type', editType);
    formDataUpload.append('update_db', 'true');

    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.post('/image', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUser(prev =>
        prev ? { ...prev, [`${editType}_image`]: res.data.data.url } : prev
      );
      setPreview(null);
      setEditType(null);
      setIsUploadDialogOpen(false);
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      {/* Cover & Profile */}
      <div className="relative">
        <div className="bg-muted-foreground h-[200px] w-full rounded-tl-[96px] relative">
          <Image
            src={user?.cover_image || '/placeholder-cover.jpg'}
            alt="Cover"
            className="rounded-tl-[96px] object-cover"
            fill
            priority
          />
        </div>
        <div className="absolute top-[75%] left-[10%] w-[150px] h-[150px] rounded-full border-4 border-white overflow-hidden">
          <Image
            src={user?.profile_image || '/placeholder-profile.jpg'}
            alt="Profile"
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      <Button onClick={() => setIsMainDialogOpen(true)}>Edit Images</Button>

      {/* Main Dialog */}
      <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setEditType('profile');
                setIsUploadDialogOpen(true);
                setIsMainDialogOpen(false);
              }}
            >
              Upload Profile
            </Button>
            <Button
              onClick={() => {
                setEditType('cover');
                setIsUploadDialogOpen(true);
                setIsMainDialogOpen(false);
              }}
            >
              Upload Cover
            </Button>
            <Button variant="outline" onClick={() => setIsMainDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType === 'profile' ? 'Upload Profile' : 'Upload Cover'}
            </DialogTitle>
          </DialogHeader>

          {!preview ? (
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
          ) : (
            <>
              <div className="w-full relative h-40">
                <Image
                  src={preview}
                  alt="Preview"
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <div className="flex justify-between mt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsUploadDialogOpen(false);
                    setPreview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUploadImage} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin size-5" /> : 'Save'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Profile Fields */}
      <div className="space-y-4">
        {user &&
          (['name', 'email', 'phone', 'location'] as (keyof User)[]).map(key => (
            <div key={key} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">
                  {key === 'name'
                    ? 'Full Name'
                    : key === 'phone'
                    ? 'Contact'
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                {editingInfo === key ? (
                  <input
                    className="border rounded-md px-2 py-1"
                    value={formData[key] || ''}
                    onChange={e => handleChange(key, e.target.value)}
                  />
                ) : (
                  <p>{formData[key]}</p>
                )}
              </div>

              {key !== 'email' && (
                <Button onClick={() => (editingInfo === key ? handleSaveInfo(key) : setEditingInfo(key))}>
                  {editingInfo === key ? 'Save' : 'Edit'}
                </Button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyDetails;

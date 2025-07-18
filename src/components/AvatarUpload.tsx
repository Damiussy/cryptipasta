'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarUpdate?: (newUrl: string) => void;
  username: string;
}

export default function AvatarUpload({ currentAvatarUrl, onAvatarUpdate, username }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatarUrl || null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session, update } = useSession();



  useEffect(() => {
    if (currentAvatarUrl && currentAvatarUrl.trim() !== '') {
      setAvatarUrl(currentAvatarUrl);
    } else {
      setAvatarUrl(null);
    }
  }, [currentAvatarUrl]);

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true);

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('The file must be less than 5MB');
        return;
      }

      // Check file type (no GIFs)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG, PNG and WebP files are allowed');
        return;
      }

      if (!session?.user?.id) {
        alert('You must be connected to upload an image');
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file via API...');

      // Upload via API route (server-side)
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      console.log('API response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('API response data:', responseData);
        
        const newAvatarUrl = responseData.url;
        
        // Force a complete re-render by setting to null first
        setAvatarUrl(null);
        setTimeout(() => {
          setAvatarUrl(newAvatarUrl);
          onAvatarUpdate?.(newAvatarUrl);
        }, 100);
        
        // Force session refresh to update avatar_url in session
        await update();
      } else {
        const errorText = await response.text();
        console.error('API error response:', errorText);
      }

    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
  };

  const removeAvatar = async () => {
    if (!session?.user?.id) return;

    try {
      setUploading(true);

      console.log('Deleting avatar via API...');

      // Delete via API route
      const response = await fetch('/api/delete-avatar', {
        method: 'DELETE',
      });

      console.log('Delete API response status:', response.status);
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('Delete API response data:', responseData);
        setAvatarUrl(null);
        onAvatarUpdate?.('');
        
        // Force session refresh to update avatar_url in session
        await update();
      } else {
        const errorText = await response.text();
        console.error('Delete API error response:', errorText);
      }

    } catch (error) {
      console.error('Error removing avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-image-container">
      <div 
        className={`avatar-upload-container ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        {avatarUrl && avatarUrl.trim() !== '' ? (
          <img 
            src={`${avatarUrl}${avatarUrl.includes('?') ? '&' : '?'}cb=${Date.now()}`}
            alt="Avatar"
            className="avatar-image"
            key={`avatar-${Date.now()}`}
          />
        ) : (
          <div className="profile-avatar-placeholder">
            <span className="linear-text-gradient sixtyfour-convergence-title">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        <div className="avatar-overlay">
          {uploading ? (
            <div className="linear-text-gradient">Uploading...</div>
          ) : (
            <div className="linear-text-gradient">
              {avatarUrl ? 'Change' : 'Add'} photo
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={uploading}
      />

      {avatarUrl && avatarUrl.trim() !== '' && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            removeAvatar();
          }}
          className="auth-button avatar-remove-btn"
          disabled={uploading}
        >
          <span className="linear-text-gradient">Delete</span>
        </button>
      )}
    </div>
  );
} 
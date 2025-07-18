'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import AvatarUpload from '@/components/AvatarUpload';


export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { update } = useSession();
  const router = useRouter();
  const [memberSince, setMemberSince] = useState<string>('');
  const [editingName, setEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isLoading, isAuthenticated, router]);

  // Derived variables
  const username = user?.name || user?.email?.split('@')[0] || 'Anonymous';
  const email = user?.email || 'No email provided';

  // Update URL when user change
  useEffect(() => {
    if (user?.avatar_url) {
      setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  const handleAvatarUpdate = (newUrl: string) => {
    setAvatarUrl(newUrl);
    // Optional : update session
    update();
  };

  useEffect(() => {
    const fetchUserCreationDate = async () => {
      if (!user?.email) return;
      
      try {
        const response = await fetch('/api/user/creation-date');
        if (response.ok) {
          const data = await response.json();
          if (data.created_at) {
            const createdDate = new Date(data.created_at);
            setMemberSince(createdDate.toLocaleDateString('en-EN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching creation date:', error);
        // Fallback in case of error
        const joinDate = new Date();
        joinDate.setMonth(joinDate.getMonth() - Math.floor(Math.random() * 12));
        setMemberSince(joinDate.toLocaleDateString('en-EN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }));
      }
    };

    fetchUserCreationDate();
  }, [user]);

  // Update title dynamically
  useEffect(() => {
    if (username && isAuthenticated) {
      document.title = `Cryptipasta - Profile of ${username}`;
    }
  }, [username, isAuthenticated]);

  const updateDisplayName = async () => {
    if (!newDisplayName.trim()) return;

    setUpdating(true);
    try {
      console.log('Sending request with:', { display_name: newDisplayName.trim() });
      
      const response = await fetch('/api/users/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ display_name: newDisplayName.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success response:', data);
        
        await update();
        
        // Trigger comments refresh to update usernames
        window.dispatchEvent(new CustomEvent('refreshComments'));
        
        setEditingName(false);
      } else {
        const errorText = await response.text();
        console.log('Error response text:', errorText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="titleI linear-text-gradient sixtyfour-convergence-title">
          Loading...
        </div>
      </Layout>
    );
  }



  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
        <div className="profile-layout profile-page">
        <aside className="profile-sidebar">
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h2 className="titleBis2 simple-text-blink">
              <u>Profile</u>
            </h2>
          </div>

          <div className="barSectioning"></div>

          {/* Avatar Section */}
          <div className="center">
            <AvatarUpload 
              currentAvatarUrl={avatarUrl || user?.avatar_url || undefined}
              onAvatarUpdate={handleAvatarUpdate}
              username={username}
            />
          </div>

          {/* User Info with option edit */}
          <div className="linear-text-gradient bona-nova-sc-bold">
            {editingName ? (
              <div className="profile-edit-name-container">
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  placeholder="Enter display name"
                  className="auth-input profile-edit-input"
                />
                <div className="profile-edit-buttons">
                  <button 
                    onClick={updateDisplayName} 
                    disabled={updating}
                    className="auth-button" 
                  >
                    <span className="linear-text-gradient">
                      {updating ? 'Saving...' : 'Save'}
                    </span>
                  </button>
                  <button 
                    onClick={() => setEditingName(false)} 
                    disabled={updating}
                    className="auth-button"
                  >
                    <span className="linear-text-gradient">Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-display-name-container">
                <h3 className="profile-username simple-text-blink">
                  {username}
                </h3>
                <div className="profile-edit-button-container">
                  <button 
                    onClick={() => {
                      setEditingName(true);
                      setNewDisplayName(username === user?.email?.split('@')[0] ? '' : username);
                    }}
                    className="auth-button profile-edit-name-btn"
                  >
                    <span className="linear-text-gradient">Edit Name</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bona-nova-sc-regular">
            <p className="profile-member-since-visible">
              Member since {memberSince}
            </p>
          </div>

          <div className="barSectioning2"></div>

          {/* Profile Stats */}
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h4 className="titleBis2">
              <u>Statistics</u>
            </h4>
          </div>

          <div className="profile-stats-list linear-textT-gradient bona-nova-sc-regular">
            <div className="profile-stat-item">
              <p><strong>Cryptids Discovered:</strong></p>
              <p>{Math.floor(Math.random() * 15) + 1}</p>
            </div>
            <div className="profile-stat-item">
              <p><strong>Outliers Met:</strong></p>
              <p>{Math.floor(Math.random() * 8) + 1}</p>
            </div>
            <div className="profile-stat-item">
              <p><strong>Maps Explored:</strong></p>
              <p>{Math.floor(Math.random() * 5) + 1}</p>
            </div>
          </div>

          <div className="barSectioning2"></div>

          {/* Quick Actions */}
          <div className="linear-text-gradient bona-nova-sc-bold">
            <h4 className="titleBis2">
              <u>Actions</u>
            </h4>
          </div>

          <nav className="linear-textT-gradient bona-nova-sc-regular">
            <ul className="menuAside">
              <li>
                <Link href="/profile/settings" className="profile-nav-link liensMenu simple-gray-blink">
                  ❍ Settings
                </Link>
                <Link href="/profile/favorites" className="profile-nav-link liensMenu simple-gray-blink">
                  ❍ Favorites
                </Link>
                <Link href="/profile/history" className="profile-nav-link liensMenu simple-gray-blink">
                  ❍ History
                </Link>
                <button
                  onClick={handleSignOut}
                  className="profile-nav-link liensMenu logout-button simple-gray-blink"
                >
                  ❍ Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-main-content">
          <div>
            <h1 className="titleI sixtyfour-convergence-title linear-text-gradient simple-text-blink">
              Welcome back, {username}
            </h1>
          </div>

          <div className="barSectioning"></div>

          {/* Account Information */}
          <section>
            <div>
              <h2 className="titleD bona-nova-sc-bold linear-text-gradient simple-text-blink">
                <u>Account Information</u>
              </h2>
            </div>

            <div className="linear-textT-gradient bona-nova-sc-regular textI">
              <div className="limitedSpace">
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Account Status:</strong> <span className="virusColor">Active</span></p>
              </div>
            </div>
          </section>

          <div className="barSectioning2"></div>

          {/* Recent Activity */}
          <section>
            <div>
              <h2 className="titleD bona-nova-sc-bold linear-text-gradient simple-text-blink">
                <u>Recent Activity</u>
              </h2>
            </div>

            <div className="linear-textT-gradient bona-nova-sc-regular textI">
              <ul>
                <li>TBA</li>
              </ul>
            </div>
          </section>

          <div className="barSectioning2"></div>

          {/* Quick Links */}
          <section>
            <div>
              <h2 className="titleD bona-nova-sc-bold linear-text-gradient simple-text-blink">
                <u>Quick Navigation</u>
              </h2>
            </div>

            <div className="linear-textT-gradient bona-nova-sc-regular textI">
              <div className="profile-quick-links">
                <div className="profile-link-column">
                  <h4 className="linear-text-gradient bona-nova-sc-bold">Explore</h4>
                  <Link href="/cryptids" className="profile-nav-link liensMenu">❍ Cryptids Database</Link>
                  <Link href="/outliers" className="profile-nav-link liensMenu">❍ Outliers Archive</Link>
                  <Link href="/maps" className="profile-nav-link liensMenu">❍ Maps Collection</Link>
                  <Link href="/perks" className="profile-nav-link liensMenu">❍ Perks & Items</Link>
                </div>
                <div className="profile-link-column">
                  <h4 className="linear-text-gradient bona-nova-sc-bold">Account</h4>
                  <Link href="/profile/settings" className="profile-nav-link liensMenu">❍ Profile Settings</Link>
                  <Link href="/profile/security" className="profile-nav-link liensMenu">❍ Security Options</Link>
                  <Link href="/profile/notifications" className="profile-nav-link liensMenu">❍ Notifications</Link>
                  <Link href="/profile/data" className="profile-nav-link liensMenu">❍ Export Data</Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}


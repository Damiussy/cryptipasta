// Types pour les données du site
export interface MenuItem {
    label: string;
    href: string;
    subItems?: MenuItem[];
}
  
export interface CryptidData {
    id: string;
    name: string;
    displayName: string;
    description: string;
    image?: string;
}
  
export interface OutlierData {
    id: string;
    name: string;
    description: string;
    image?: string;
}
  
export interface PerkData {
    id: string;
    name: string;
    type: 'item' | 'charm' | 'cosmetic' | 'emote';
    description: string;
}
  
export interface MapData {
    id: string;
    name: string;
    description: string;
    image?: string;
}

export interface Comment {
  id: string;
  page_slug: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      username?: string;
      avatar_url?: string;
    };
  };
}

export interface CreateCommentData {
  page_slug: string;
  content: string;
}
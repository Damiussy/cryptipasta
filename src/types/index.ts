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
  
export interface SurvivorData {
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
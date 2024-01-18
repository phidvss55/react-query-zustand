export interface AppState {
  id: string;
  theme_id: string;
  name: string;
  email: string;
  image: string;
  bio: string;
  theme: string | null;
  colors: any;
  allLinks: string | null;
  isMobile: boolean;
  updatedLinkId: number;
  addLinkOverlay: boolean;
  isPreviewOverlay: boolean;
}

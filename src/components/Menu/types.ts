export interface MenuSubEntry {
  label: string;
  href: string;
  calloutClass?: string;
}

export interface MenuStatus {
  text: string;
  color: string;
}

export interface MenuEntry {
  label: string;
  icon: string;
  items?: MenuSubEntry[];
  href?: string;
  calloutClass?: string;
  initialOpenState?: boolean;
  status?: MenuStatus;
}

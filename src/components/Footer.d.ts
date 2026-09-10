export interface FooterLinkItem {
  label: string;
  path?: string;
}

export interface FooterColumnSection {
  title: string;
  links: FooterLinkItem[];
}

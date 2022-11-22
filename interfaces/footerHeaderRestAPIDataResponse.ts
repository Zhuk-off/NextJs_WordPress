export interface IHeaderFooterContext {
  data: IData;
  status?: number;
}

interface IData {
  header?: IHeader;
  footer?: IFooter;
}

interface IHeader {
  siteLogoUrl: string;
  siteTitle: string;
  siteDescription: string;
  favicon: string;
  headerMenuItems: IMenuItem[];
}

interface IFooter {
  footerMenuItems: IMenuItem[];
  copyrightText: string | boolean;
  socialLinks: socialLink[];
  sidebarOne?: any;
  sidebarTwo?: any;
}

interface socialLink {
  iconName: string;
  iconUrl: string;
}

interface IMenuItem extends IMenuItemChildren {
  children?: IMenuItemChildren[];
}

interface IMenuItemChildren {
  ID: number;
  title: string;
  url: string;
  pageSlug: string;
  pageID: number;
}

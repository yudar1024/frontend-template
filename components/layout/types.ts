// 菜单项类型定义
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

// 主菜单配置
export interface MainMenuConfig {
  items: MenuItem[];
}

// 企业信息
export interface CompanyInfo {
  name: string;
  logo?: string;
  userInfo?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

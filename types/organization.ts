// 组织类型定义

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateOrganizationInput {
  name: string;
  description: string;
  members: User[];
}

export interface UpdateOrganizationInput {
  id: string;
  name?: string;
  description?: string;
  members?: User[];
}

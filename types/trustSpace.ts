// 可信空间类型定义

export interface TrustSpace {
  id: string;
  name: string;
  description: string;
  logo?: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
}

export interface CreateTrustSpaceInput {
  name: string;
  description: string;
  logo?: string;
  createdBy: string;
}

export interface UpdateTrustSpaceInput {
  id: string;
  name?: string;
  description?: string;
  logo?: string;
}

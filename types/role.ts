// 角色类型定义

export interface Role {
  id: string;
  name: string; // 角色名称
  scope: string; // 范围
  actions: string[]; // 动作列表
  permissionExpression: string; // 权限表达式
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRoleInput {
  name: string;
  scope: string;
  actions: string[];
  permissionExpression: string;
}

export interface UpdateRoleInput {
  id: string;
  name?: string;
  scope?: string;
  actions?: string[];
  permissionExpression?: string;
}
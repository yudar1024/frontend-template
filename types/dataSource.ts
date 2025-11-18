// 数据源类型定义

export type DataSourceType = 'file' | 'database';

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  // 数据库相关字段
  databaseUrl?: string;
  username?: string;
  password?: string;
  // 文件相关字段
  filePath?: string;
  // 元数据
  createdAt: string;
  createdBy: string;
}

export interface CreateDataSourceInput {
  name: string;
  type: DataSourceType;
  databaseUrl?: string;
  username?: string;
  password?: string;
  filePath?: string;
  createdBy: string;
}

export interface UpdateDataSourceInput {
  id: string;
  name?: string;
  type?: DataSourceType;
  databaseUrl?: string;
  username?: string;
  password?: string;
  filePath?: string;
}

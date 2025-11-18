// 数据产品类型定义

export type DataFormat = 'json' | 'csv' | 'word' | 'pdf';
export type ProductType = 'api' | 'data_model' | 'report' | 'corpus';
export type BillingMode = 'one_time' | 'yearly' | 'monthly' | 'pay_as_you_go';
export type ApplicationField = 'industry' | 'trade' | 'transport' | 'finance' | 'medical';
export type TransferMode = 'push' | 'pull';

export interface DataProduct {
  id: string;
  name: string;
  dataFormat: DataFormat;
  dataSourceId: string; // 本地数据源ID
  dataSourceName?: string; // 数据源名称（用于显示）
  productType: ProductType;
  billingMode: BillingMode;
  dataTheme: string;
  dataAuthorization: string;
  applicationField: ApplicationField;
  transferMode: TransferMode;
  tags: string[];
  description: string;
  createdAt: string;
  createdBy: string;
}

export interface CreateProductInput {
  name: string;
  dataFormat: DataFormat;
  dataSourceId: string;
  productType: ProductType;
  billingMode: BillingMode;
  dataTheme: string;
  dataAuthorization: string;
  applicationField: ApplicationField;
  transferMode: TransferMode;
  tags: string[];
  description: string;
  createdBy: string;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  dataFormat?: DataFormat;
  dataSourceId?: string;
  productType?: ProductType;
  billingMode?: BillingMode;
  dataTheme?: string;
  dataAuthorization?: string;
  applicationField?: ApplicationField;
  transferMode?: TransferMode;
  tags?: string[];
  description?: string;
}

// 选项标签映射
export const dataFormatLabels: Record<DataFormat, string> = {
  json: 'JSON',
  csv: 'CSV',
  word: 'Word',
  pdf: 'PDF',
};

export const productTypeLabels: Record<ProductType, string> = {
  api: 'API',
  data_model: '数据模型',
  report: '报告',
  corpus: '语料库',
};

export const billingModeLabels: Record<BillingMode, string> = {
  one_time: '一次性',
  yearly: '包年',
  monthly: '包月',
  pay_as_you_go: '按量计费',
};

export const applicationFieldLabels: Record<ApplicationField, string> = {
  industry: '工业',
  trade: '贸易',
  transport: '运输',
  finance: '金融',
  medical: '医疗',
};

export const transferModeLabels: Record<TransferMode, string> = {
  push: '供方推送',
  pull: '需方拉取',
};

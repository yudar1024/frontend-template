import MainLayout from '@/components/layout/MainLayout';
import { companyInfo, menuConfig } from '@/config/menuConfig';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

export default function Home() {
  return (
    <MainLayout companyInfo={companyInfo} primaryMenuItems={menuConfig}>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          欢迎使用企业管理系统
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          这是一个典型的SaaS企业应用布局示例，包含：
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  企业Banner
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  顶部固定的企业标识栏，包含Logo、公司名称、通知、设置和用户信息
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  一级菜单
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  横向导航栏，用于切换主要功能模块，支持图标和文字
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  树形二级菜单
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  左侧可折叠的树形菜单，根据选中的一级菜单动态显示内容
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  内容区域
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  主要内容展示区域，根据菜单选择显示不同的页面内容
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            功能特点
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <li>
              <Typography variant="body2">
                完全响应式设计，适配不同屏幕尺寸
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                左侧菜单可折叠，优化屏幕空间利用
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                二级菜单根据一级菜单选择动态变化
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                支持多层级树形菜单结构（可嵌套）
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                使用Material-UI组件，界面美观统一
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                组件化设计，易于维护和扩展
              </Typography>
            </li>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <Typography variant="h6" gutterBottom>
            使用说明
          </Typography>
          <Typography variant="body2">
            1. 点击顶部的一级菜单切换不同模块
          </Typography>
          <Typography variant="body2">
            2. 左侧二级菜单会根据选中的一级菜单自动更新
          </Typography>
          <Typography variant="body2">
            3. 点击左侧菜单的折叠按钮可以收起/展开菜单
          </Typography>
          <Typography variant="body2">
            4. 菜单配置文件位于：config/menuConfig.tsx
          </Typography>
        </Paper>
      </Box>
    </MainLayout>
  );
}

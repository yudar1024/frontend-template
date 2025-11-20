'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  ContentCopy as CopyIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import initialRegistrations from '@/data/assetRegistrations.json';
import dataSources from '@/data/dataSources.json';

// Define types
interface AssetRegistration {
  id: string;
  platform: string;
  dataSourceId: string;
  dataSourceName: string;
  name: string;
  hash: string;
  registeredAt: string;
  status: 'Registered' | 'Pending';
}

const PLATFORMS = [
  '国家公共数据登记平台',
  '第三方数据交易平台',
  '行业数据登记中心',
];

// Module-level variable for in-memory persistence
let globalRegistrations: AssetRegistration[] = [...(initialRegistrations as AssetRegistration[])];

export default function AssetRegistrationPage() {
  // State
  const [registrations, setRegistrations] = useState<AssetRegistration[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    platform: '',
    dataSourceId: '',
    name: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize data from global variable
  useEffect(() => {
    setRegistrations(globalRegistrations);
  }, []);

  // Handlers
  const handleOpenDialog = () => {
    setFormData({ platform: '', dataSourceId: '', name: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.platform || !formData.dataSourceId || !formData.name) {
      alert('请填写所有必填项');
      return;
    }

    const dataSource = dataSources.find((ds) => ds.id === formData.dataSourceId);
    
    const newRegistration: AssetRegistration = {
      id: `reg-${Date.now()}`,
      platform: formData.platform,
      dataSourceId: formData.dataSourceId,
      dataSourceName: dataSource ? dataSource.name : '未知数据源',
      name: formData.name,
      hash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      registeredAt: new Date().toISOString(),
      status: 'Registered',
    };

    // Update global variable and local state
    globalRegistrations = [newRegistration, ...globalRegistrations];
    setRegistrations([...globalRegistrations]);
    handleCloseDialog();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to show a snackbar here
  };

  // Filtered data
  const filteredRegistrations = registrations.filter((reg) =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.dataSourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            资产登记
          </Typography>
          <Typography variant="body1" color="text.secondary">
            管理和登记本地数据源到各大公共数据平台，生成区块链存证。
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          }}
        >
          新增登记
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <TextField
          size="small"
          placeholder="搜索资产名称或数据源..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          sx={{ width: 300 }}
        />
        <Button startIcon={<FilterListIcon />} color="inherit">
          筛选
        </Button>
      </Paper>

      {/* Data Table */}
      <Card sx={{ flexGrow: 1, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>登记名称</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>本地数据源</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>登记平台</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>区块链Hash</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>登记时间</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>状态</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.dataSourceName}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.platform} 
                        size="small" 
                        variant="outlined" 
                        color="primary"
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                          {row.hash.substring(0, 10)}...{row.hash.substring(row.hash.length - 8)}
                        </Typography>
                        <Tooltip title="复制完整Hash">
                          <IconButton size="small" onClick={() => copyToClipboard(row.hash)}>
                            <CopyIcon fontSize="small" sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {new Date(row.registeredAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={<CheckCircleIcon sx={{ fontSize: '16px !important' }} />}
                        label={row.status}
                        color="success"
                        size="small"
                        sx={{ 
                          bgcolor: 'success.light', 
                          color: 'success.dark',
                          fontWeight: 'bold',
                          '& .MuiChip-icon': { color: 'success.dark' }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">暂无登记记录</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Registration Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold' }}>新增资产登记</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>登记平台</InputLabel>
              <Select
                name="platform"
                value={formData.platform}
                label="登记平台"
                onChange={handleInputChange}
              >
                {PLATFORMS.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>本地数据源</InputLabel>
              <Select
                name="dataSourceId"
                value={formData.dataSourceId}
                label="本地数据源"
                onChange={handleInputChange}
              >
                {dataSources.map((ds) => (
                  <MenuItem key={ds.id} value={ds.id}>
                    {ds.name} ({ds.type})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="登记名称"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="请输入资产登记名称"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            取消
          </Button>
          <Button onClick={handleSubmit} variant="contained" disableElevation>
            确认登记
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

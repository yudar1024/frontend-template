'use client';

import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/common/PageContainer';
import UserTable from '@/components/user/UserTable';
import UserDialog from '@/components/user/UserDialog';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { getAllUsers, addUser, updateUser, deleteUser } from '@/services/userService';
import { User } from '@/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const userList = await getAllUsers();
    setUsers(userList);
  };

  const handleAddUser = () => {
    setEditUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    loadUsers();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditUser(null);
  };

  const handleDialogSubmit = async (data: any) => {
    if (editUser) {
      await updateUser({ ...editUser, ...data });
    } else {
      await addUser(data);
    }
    loadUsers();
    handleDialogClose();
  };

  return (
    <PageContainer
      title="用户管理"
      description="管理系统用户账号和权限"
      breadcrumbs={[
        { label: '系统设置', href: '/system' },
        { label: '用户管理' },
      ]}
      actions={
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddUser}
          sx={{
            bgcolor: '#0a0a0a',
            color: '#ffffff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#404040',
            },
          }}
        >
          添加用户
        </Button>
      }
    >
      <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      <UserDialog
        open={dialogOpen}
        editData={editUser}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
    </PageContainer>
  );
}

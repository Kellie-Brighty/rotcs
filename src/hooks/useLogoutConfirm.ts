import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

const { confirm } = Modal

export const useLogoutConfirm = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const showLogoutConfirm = () => {
    confirm({
      title: 'Confirm Logout',
      icon: React.createElement(ExclamationCircleOutlined),
      content: 'Are you sure you want to logout? Any unsaved changes will be lost.',
      okText: 'Yes, Logout',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        // Clear session data via AuthContext
        logout()
        // Redirect to landing page
        navigate('/', { replace: true })
      },
    })
  }

  return { showLogoutConfirm }
}

export default useLogoutConfirm

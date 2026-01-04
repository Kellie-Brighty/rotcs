import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

interface ConfirmOptions {
  title: string
  content: string
  onOk: () => void | Promise<void>
  onCancel?: () => void
  okText?: string
  cancelText?: string
  type?: 'warning' | 'error' | 'info'
}

export const showConfirm = ({
  title,
  content,
  onOk,
  onCancel,
  okText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmOptions) => {
  confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    okText,
    cancelText,
    okType: type === 'error' ? 'danger' : 'primary',
    onOk,
    onCancel,
  })
}

export default showConfirm

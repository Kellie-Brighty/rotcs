import { Card, Typography, Form, Input, Button, Switch, Divider, Avatar, Upload } from 'antd'
import { User, Mail, Phone, Building2, Camera } from 'lucide-react'
import { toast } from '@/utils/notifications'

const { Title, Text } = Typography

const ProfileSettings = () => {
  const [form] = Form.useForm()

  const handleSave = (values: any) => {
    console.log('Profile updated:', values)
    toast.success('Profile updated successfully')
  }

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      toast.success('Profile picture updated')
    }
  }

  return (
    <div>
      <Title level={2}>Profile Settings</Title>
      <Text type="secondary">Manage your account information and preferences</Text>

      <Card className="mt-6">
        <div className="flex items-center gap-6 mb-6">
          <Avatar size={100} icon={<User />} />
          <div>
            <Title level={4} className="mb-2">Profile Picture</Title>
            <Upload onChange={handleAvatarChange} showUploadList={false}>
              <Button icon={<Camera size={16} />}>Change Picture</Button>
            </Upload>
          </div>
        </div>

        <Divider />

        <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{
          name: 'John Doe',
          email: 'john.doe@operator.com',
          phone: '+234 800 123 4567',
          organization: 'Bet9ja',
        }}>
          <Title level={4}>Personal Information</Title>
          
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<User size={16} />} placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<Mail size={16} />} placeholder="john.doe@operator.com" />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input prefix={<Phone size={16} />} placeholder="+234 800 123 4567" />
          </Form.Item>

          <Form.Item label="Organization" name="organization">
            <Input prefix={<Building2 size={16} />} placeholder="Bet9ja" disabled />
          </Form.Item>

          <Divider />

          <Title level={4}>Notification Preferences</Title>

          <Form.Item label="Email Notifications" name="emailNotifications" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Payment Reminders" name="paymentReminders" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Compliance Alerts" name="complianceAlerts" valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label="Weekly Reports" name="weeklyReports" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Divider />

          <Title level={4}>Security</Title>

          <Form.Item>
            <Button type="default">Change Password</Button>
          </Form.Item>

          <Form.Item>
            <Button type="default">Enable Two-Factor Authentication</Button>
          </Form.Item>

          <Divider />

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ProfileSettings

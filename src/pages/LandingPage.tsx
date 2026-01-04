import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Form, Input, Alert } from 'antd'
import { Shield, ArrowRight, Lock, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const LandingPage = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // Redirect when user logs in
  useEffect(() => {
    if (user) {
      const dashboardPaths = {
        admin: '/admin/revenue',
        consultant: '/consultant/hub',
        operator: '/operator/home',
      }
      navigate(dashboardPaths[user.role], { replace: true })
    }
  }, [user, navigate])

  const handleSignIn = async (values: { email: string; password: string }) => {
    setError('')
    setLoading(true)

    try {
      await login(values.email, values.password)
      setIsModalOpen(false)
      form.resetFields()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    setError('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError('')
    form.resetFields()
  }

  return (
    <div className="h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right - Partial Circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 border-[40px] border-green-100 rounded-full opacity-40" />
        <div className="absolute -top-20 -right-20 w-72 h-72 border-[30px] border-green-50 rounded-full opacity-60" />
        
        {/* Bottom Left - Rounded Square */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-green-50 to-transparent rounded-[80px] opacity-50 rotate-12" />
        
        {/* Middle Right - Small Accent Circle */}
        <div className="absolute top-1/3 right-12 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-2xl" />
        
        {/* Bottom Right - Triangle-ish Shape */}
        <div className="absolute bottom-32 right-24 w-48 h-48 bg-gradient-to-bl from-green-100 to-transparent rounded-tl-[100px] opacity-30 rotate-45" />
        
        {/* Top Left - Subtle Accent */}
        <div className="absolute top-24 left-12 w-24 h-24 bg-green-50 rounded-full opacity-40" />
      </div>

      {/* Subtle Dot Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #008751 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Header */}
      <header className="relative z-10 w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto flex-shrink-0">
        <div 
          className="group cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-green-700 via-green-600 to-green-700 bg-clip-text text-transparent hover:from-green-600 hover:via-green-700 hover:to-green-600 transition-all duration-300">
            ROTCS
          </span>
        </div>
        
        <Button 
          type="text"
          onClick={openModal}
          className="text-sm sm:text-base font-medium text-gray-700 hover:text-green-600 transition-colors min-h-[44px] px-4"
        >
          Sign In
        </Button>
      </header>

      {/* Main Hero Content - Centered Vertically */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 min-h-0 py-6 sm:py-0">
        <div className="max-w-4xl mx-auto text-center w-full">
          
          {/* Badge */}
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-50 border border-green-100 mb-4 sm:mb-6 animate-fade-in">
            <span className="text-xs sm:text-sm font-medium text-green-700">
              Built for Nigerian Regulatory Excellence
            </span>
          </div>

          {/* Main Headline - Responsive Typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-[1.15] tracking-tight px-2">
            <span className="block text-gray-900">
              Tax Revenue Oversight,{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
                  simplified
                </span>
                <span className="absolute bottom-0.5 sm:bottom-1 left-0 right-0 h-1.5 sm:h-2 bg-green-200/40 -rotate-1 rounded" />
              </span>
              {' '}for you.
            </span>
          </h1>

          {/* Subheadline - Responsive */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Real-time monitoring and compliance tracking for gaming operators.
            Transparent, efficient, and built for Nigerian regulatory standards.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <Button
              size="large"
              onClick={openModal}
              className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-xl shadow-green-600/25 hover:shadow-2xl hover:shadow-green-600/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 group border-0 w-full sm:w-auto max-w-xs"
              style={{
                background: 'linear-gradient(135deg, #008751 0%, #006d3f 100%)',
                borderRadius: '12px',
              }}
            >
              <Shield size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
              <span className="text-white">Access Dashboard</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-white sm:w-4 sm:h-4" />
            </Button>
          </div>

          {/* Stats Bar - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto pt-6 sm:pt-8 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-1">
                Real-time
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight">
                Revenue Monitoring
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-0.5 sm:mb-1">
                Multi-State
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight">
                Compliance Tracking
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-0.5 sm:mb-1">
                Secure
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 font-medium leading-tight">
                Enterprise Platform
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Positioned at Bottom */}
      <footer className="relative z-10 w-full px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            © 2026 ROTCS. Developed by <span className="font-semibold text-green-700">Northernreach</span>
          </p>
        </div>
      </footer>

      {/* Authentication Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={<X size={20} />}
        centered
        width={480}
        styles={{
          content: {
            borderRadius: '16px',
            padding: 0,
          }
        }}
      >
        <div className="p-8">
          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4">
              <Lock className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message="Authentication Failed"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError('')}
              className="mb-4"
            />
          )}

          {/* Sign In Form */}
          <Form
            form={form}
            name="signin"
            onFinish={handleSignIn}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item className="mb-4">
              <Button 
                type="primary" 
                htmlType="submit" 
                block 
                loading={loading}
                className="h-12 text-base font-semibold"
                style={{ 
                  background: loading ? undefined : 'linear-gradient(135deg, #008751 0%, #006d3f 100%)',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Test Credentials */}
          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">Test Credentials:</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">Admin: admin@rotcs.gov / admin123</p>
              <p className="text-xs text-gray-600">Consultant: consultant@rotcs.gov / consultant123</p>
              <p className="text-xs text-gray-600">Operator: operator@rotcs.gov / operator123</p>
            </div>
          </div>
        </div>
      </Modal>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default LandingPage



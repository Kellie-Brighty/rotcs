import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Drawer, Button } from 'antd'
import { Globe, Search, Activity, LogOut, User, Menu as MenuIcon } from 'lucide-react'
import { useLogoutConfirm } from '@/hooks/useLogoutConfirm'

const { Header, Sider, Content } = Layout

const ConsultantLayout = () => {
  const location = useLocation()
  const { showLogoutConfirm } = useLogoutConfirm()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      key: '/consultant/hub',
      icon: <Globe size={24} />,
      label: <Link to="/consultant/hub" style={{ fontSize: '15px', fontWeight: 500 }}>Multi-State Hub</Link>,
    },
    {
      key: '/consultant/state',
      icon: <Search size={24} />,
      label: <Link to="/consultant/state/lagos" style={{ fontSize: '15px', fontWeight: 500 }}>State Deep Dive</Link>,
    },
    {
      key: '/consultant/forensics',
      icon: <Activity size={24} />,
      label: <Link to="/consultant/forensics" style={{ fontSize: '15px', fontWeight: 500 }}>Forensics</Link>,
    },
    {
      key: '/consultant/profile',
      icon: <User size={24} />,
      label: <Link to="/consultant/profile" style={{ fontSize: '15px', fontWeight: 500 }}>Profile</Link>,
    },
  ]

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center justify-center text-white border-b" style={{ 
        background: '#008751',
        borderBottomColor: 'rgba(255,255,255,0.1)',
      }}>
        <div className="text-center">
          <div className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Source Serif 4, serif' }}>ROTCS</div>
          <div className="text-xs opacity-90 font-medium" style={{ letterSpacing: '0.05em' }}>CONSULTANT</div>
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="mt-4 sidebar-menu"
        style={{ 
          background: 'transparent',
          border: 'none',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  )

  return (
    <Layout className="h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <Sider
        width={260}
        className="hidden lg:block"
        style={{
          background: '#006b3f',
          boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
        }}
      >
        <SidebarContent />
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="lg:hidden"
        styles={{
          body: { padding: 0, background: '#006b3f' }
        }}
        width={260}
      >
        <SidebarContent />
      </Drawer>

      <Layout style={{ marginLeft: 0 }} className="lg:ml-[260px]">
        <Header
          style={{
            background: '#fff',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            borderBottom: '1px solid #e7e5e4',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            zIndex: 10,
          }}
          className="lg:left-[260px]"
        >
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={<MenuIcon size={20} />}
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
            />
            <h1 className="m-0 text-base md:text-lg lg:text-xl" style={{ 
              fontWeight: 600,
              color: '#1c1917',
              fontFamily: 'Source Serif 4, serif',
              letterSpacing: '-0.01em',
            }}>
              Consultant Dashboard
            </h1>
          </div>
          <button 
            onClick={showLogoutConfirm}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-transparent border-none cursor-pointer"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </Header>
        <Content
          style={{
            marginTop: 64,
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            padding: '16px',
          }}
          className="md:p-6"
        >
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            padding: '16px',
            minHeight: '100%',
          }}
          className="md:p-6"
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default ConsultantLayout

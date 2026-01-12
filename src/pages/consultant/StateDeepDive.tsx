import { useState } from 'react'
import { Card, Typography, Row, Col, Statistic, Button, Tag } from 'antd'
import { MapPin, Users, ArrowLeft, TrendingUp, CheckCircle } from 'lucide-react'
import DataReconciliationViewer from '@/components/consultant/DataReconciliationViewer'
import APIIngestionLogs from '@/components/consultant/APIIngestionLogs'

const { Title, Text } = Typography

// Available states with additional info
const states = [
  { id: 'lagos', name: 'Lagos State', operators: 12, status: 'healthy', tgv: 1620, users: 168000 },
  { id: 'ogun', name: 'Ogun State', operators: 8, status: 'warning', tgv: 850, users: 95000 },
  { id: 'rivers', name: 'Rivers State', operators: 10, status: 'healthy', tgv: 1240, users: 142000 },
  { id: 'kano', name: 'Kano State', operators: 7, status: 'healthy', tgv: 920, users: 108000 },
  { id: 'oyo', name: 'Oyo State', operators: 6, status: 'critical', tgv: 650, users: 78000 },
]

const StateDeepDive = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const currentState = states.find(s => s.id === selectedState)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'green'
      case 'warning': return 'orange'
      case 'critical': return 'red'
      default: return 'default'
    }
  }

  const handleStateSelect = (stateId: string) => {
    setSelectedState(stateId)
  }

  const handleBackToStates = () => {
    setSelectedState(null)
  }

  return (
    <div>
      {!selectedState ? (
        <>
          {/* State Selection View */}
          <div className="mb-6">
            <Title level={2}>State Deep Dive</Title>
            <Text type="secondary">Select a state to view detailed analytics and insights</Text>
          </div>

          {/* State Cards Grid */}
          <Row gutter={[16, 16]}>
            {states.map(state => (
              <Col xs={24} sm={12} lg={8} key={state.id}>
                <Card
                  hoverable
                  onClick={() => handleStateSelect(state.id)}
                  className="cursor-pointer transition-all hover:shadow-lg"
                  style={{ borderLeft: `4px solid ${getStatusColor(state.status) === 'green' ? '#52c41a' : getStatusColor(state.status) === 'orange' ? '#faad14' : '#ff4d4f'}` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={24} className="text-blue-500" />
                      <Title level={4} className="m-0">{state.name}</Title>
                    </div>
                    <Tag color={getStatusColor(state.status)}>
                      {state.status.toUpperCase()}
                    </Tag>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text type="secondary">Total TGV</Text>
                      <Text strong className="text-lg text-blue-600">₦{state.tgv}M</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text type="secondary">Active Users</Text>
                      <Text strong>{state.users.toLocaleString()}</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text type="secondary">Operators</Text>
                      <Text strong>{state.operators}</Text>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Text className="text-blue-500">Click to view details →</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          {/* State Detail View */}
          <div className="mb-6">
            <Button 
              icon={<ArrowLeft size={16} />} 
              onClick={handleBackToStates}
              className="mb-4"
            >
              Back to States
            </Button>
            <div className="flex justify-between items-start">
              <div>
                <Title level={2}>{currentState?.name} - Deep Dive</Title>
                <Text type="secondary">Context-aware analytics for selected jurisdiction</Text>
              </div>
              <Tag color={getStatusColor(currentState?.status || 'default')} className="text-base px-4 py-1">
                {currentState?.status.toUpperCase()}
              </Tag>
            </div>
          </div>

          {/* Key Metrics */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total TGV"
                  value={currentState?.tgv}
                  suffix="M"
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<TrendingUp size={20} className="text-blue-500" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tax Collected"
                  value={currentState ? Math.round(currentState.tgv * 0.15) : 0}
                  suffix="M"
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<CheckCircle size={20} className="text-green-500" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Active Users"
                  value={currentState?.users}
                  prefix={<Users size={20} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Operators"
                  value={currentState?.operators}
                  prefix={<MapPin size={20} />}
                />
              </Card>
            </Col>
          </Row>

          <div className="mt-6">
            <DataReconciliationViewer />
          </div>

          <div className="mt-6">
            <APIIngestionLogs />
          </div>
        </>
      )}
    </div>
  )
}

export default StateDeepDive

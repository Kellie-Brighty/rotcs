import { Row, Col, Card, Statistic, Progress, Typography } from 'antd'
import { TrendingUp, CheckCircle, Clock } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import RealTimeCollectionsFeed from '@/components/admin/RealTimeCollectionsFeed'
import ExportButton from '@/components/ui/ExportButton'

const { Title, Text } = Typography

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 45000000 },
  { month: 'Feb', revenue: 52000000 },
  { month: 'Mar', revenue: 48000000 },
  { month: 'Apr', revenue: 61000000 },
  { month: 'May', revenue: 55000000 },
  { month: 'Jun', revenue: 67000000 },
]

const RevenueCenter = () => {
  const collectedMTD = 287000000
  const projectedRevenue = 350000000
  const progressPercent = (collectedMTD / projectedRevenue) * 100

  return (
    <div>
      <Title level={2}>Revenue Command Center</Title>
      <Text type="secondary">Real-time tax revenue tracking and collections monitoring</Text>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tax Collected MTD"
              value={collectedMTD}
              suffix="₦"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Projected Revenue"
              value={projectedRevenue}
              prefix={<TrendingUp size={20} className="text-blue-500" />}
              suffix="₦"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Collection Rate"
              value={progressPercent.toFixed(1)}
              suffix="%"
              prefix={<CheckCircle size={20} className="text-purple-500" />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Payments"
              value={3}
              prefix={<Clock size={20} className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Progress */}
      <Card className="mt-6">
        <Title level={4}>Monthly Revenue Target</Title>
        <div className="mb-4">
          <Progress
            percent={progressPercent}
            status="active"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            format={(percent) => `${percent?.toFixed(1)}% of ₦${(projectedRevenue / 1000000).toFixed(0)}M`}
          />
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Collected:</Text> <Text className="text-green-600">₦{(collectedMTD / 1000000).toFixed(1)}M</Text>
          </Col>
          <Col span={12}>
            <Text strong>Remaining:</Text> <Text className="text-orange-600">₦{((projectedRevenue - collectedMTD) / 1000000).toFixed(1)}M</Text>
          </Col>
        </Row>
      </Card>

      <Row gutter={16} className="mt-6">
        {/* Revenue Trend Chart */}
        <Col xs={24} lg={14}>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <Title level={4}>Revenue Trend (6 Months)</Title>
              <ExportButton data={revenueData} filename="revenue-trend" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: any) => `₦${(value / 1000000).toFixed(1)}M`} />
                <Area type="monotone" dataKey="revenue" stroke="#1890ff" fill="#1890ff" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Real-Time Collections Feed */}
        <Col xs={24} lg={10}>
          <RealTimeCollectionsFeed />
        </Col>
      </Row>
    </div>
  )
}

export default RevenueCenter

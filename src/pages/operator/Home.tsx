import { Card, Typography, Row, Col, Statistic, Progress, Tag } from 'antd'
import { CheckCircle } from 'lucide-react'

const { Title, Text } = Typography

const OperatorHome = () => {
  const taxDue = 48000000
  const taxPaid = 48000000
  const complianceScore = 98

  return (
    <div>
      <Title level={2}>Welcome, Operator</Title>
      <Text type="secondary">Your tax liability and compliance overview</Text>

      {/* Tax Liability Counter */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Current Period Tax Liability</Title>
            <Statistic
              value={taxDue}
              prefix="₦"
              valueStyle={{ color: '#1890ff', fontSize: '36px' }}
            />
            <div className="mt-4">
              <Text type="secondary">Based on ingested transaction data</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Compliance Scorecard</Title>
            <div className="mb-4">
              <Progress
                type="circle"
                percent={complianceScore}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                format={(percent) => (
                  <div className="text-center">
                    <div className="text-3xl font-bold">{percent}%</div>
                    <div className="text-xs text-gray-500">Compliant</div>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <CheckCircle className="text-green-500 mx-auto mb-1" size={20} />
                <Text className="text-xs">On Time</Text>
              </div>
              <div className="text-center">
                <CheckCircle className="text-green-500 mx-auto mb-1" size={20} />
                <Text className="text-xs">Data Quality</Text>
              </div>
              <div className="text-center">
                <CheckCircle className="text-green-500 mx-auto mb-1" size={20} />
                <Text className="text-xs">API Uptime</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="GGR (MTD)"
              value={320000000}
              prefix="₦"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tax Paid"
              value={taxPaid}
              prefix="₦"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Outstanding"
              value={taxDue - taxPaid}
              prefix="₦"
              valueStyle={{ color: taxDue > taxPaid ? '#cf1322' : '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Next Payment Due"
              value="Jan 15"
              valueStyle={{ fontSize: '24px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Status Indicators */}
      <Card className="mt-6">
        <Title level={4}>System Status</Title>
        <Row gutter={16}>
          <Col span={8}>
            <div className="flex items-center gap-2">
              <Tag color="success">Active</Tag>
              <Text>API Endpoint</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="flex items-center gap-2">
              <Tag color="success">Synced</Tag>
              <Text>Data Ingestion</Text>
            </div>
          </Col>
          <Col span={8}>
            <div className="flex items-center gap-2">
              <Tag color="success">Valid</Tag>
              <Text>License Status</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default OperatorHome

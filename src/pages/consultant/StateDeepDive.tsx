import { useParams } from 'react-router-dom'
import { Card, Typography, Row, Col, Statistic } from 'antd'
import { MapPin, Users } from 'lucide-react'
import DataReconciliationViewer from '@/components/consultant/DataReconciliationViewer'
import APIIngestionLogs from '@/components/consultant/APIIngestionLogs'

const { Title, Text } = Typography

const StateDeepDive = () => {
  const { stateId } = useParams()

  return (
    <div>
      <Title level={2}>State Deep Dive: {stateId?.toUpperCase()}</Title>
      <Text type="secondary">Context-aware analytics for selected jurisdiction</Text>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total GGR"
              value={1620}
              prefix="₦"
              suffix="M"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tax Collected"
              value={243}
              prefix="₦"
              suffix="M"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={168000}
              prefix={<Users size={20} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Territories"
              value={20}
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
    </div>
  )
}

export default StateDeepDive

import { Card, Typography, Select, Row, Col } from 'antd'
import { Globe, TrendingUp,  CheckCircle} from 'lucide-react'
import ComparativeAnalytics from '@/components/consultant/ComparativeAnalytics'

const { Title, Text } = Typography
const { Option } = Select

// Mock multi-state data
const states = [
  { id: 'lagos', name: 'Lagos State', status: 'healthy', collectionRate: 98, operators: 12 },
  { id: 'ogun', name: 'Ogun State', status: 'warning', collectionRate: 85, operators: 8 },
  { id: 'rivers', name: 'Rivers State', status: 'healthy', collectionRate: 95, operators: 10 },
  { id: 'kano', name: 'Kano State', status: 'healthy', collectionRate: 92, operators: 7 },
  { id: 'oyo', name: 'Oyo State', status: 'critical', collectionRate: 65, operators: 6 },
]


const MultiStateHub = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2}>Multi-State Command Hub</Title>
          <Text type="secondary">Global view of all managed jurisdictions</Text>
        </div>
        <Select
          defaultValue="all"
          style={{ width: 200 }}
          size="large"
        >
          <Option value="all">All States</Option>
          {states.map(state => (
            <Option key={state.id} value={state.id}>{state.name}</Option>
          ))}
        </Select>
      </div>

      {/* Portfolio Health Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <Globe size={32} className="text-blue-500" />
              <div>
                <Text type="secondary" className="text-xs">Total States</Text>
                <div className="text-2xl font-bold">{states.length}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <CheckCircle size={32} className="text-green-500" />
              <div>
                <Text type="secondary" className="text-xs">Healthy States</Text>
                <div className="text-2xl font-bold text-green-600">
                  {states.filter(s => s.status === 'healthy').length}
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <TrendingUp size={32} className="text-purple-500" />
              <div>
                <Text type="secondary" className="text-xs">Avg Collection Rate</Text>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(states.reduce((sum, s) => sum + s.collectionRate, 0) / states.length)}%
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <Globe size={32} className="text-orange-500" />
              <div>
                <Text type="secondary" className="text-xs">Total Operators</Text>
                <div className="text-2xl font-bold text-orange-600">
                  {states.reduce((sum, s) => sum + s.operators, 0)}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Comparative Analytics */}
      <div className="mt-6">
        <ComparativeAnalytics />
      </div>
    </div>
  )
}

export default MultiStateHub

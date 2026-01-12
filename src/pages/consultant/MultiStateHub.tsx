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
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Title level={2}>Multi-State Command Hub</Title>
          <Text type="secondary">Global view of all managed jurisdictions</Text>
        </div>
        <Select
          defaultValue="all"
          className="w-full sm:w-[200px]"
          size="large"
        >
          <Option value="all">All States</Option>
          {states.map(state => (
            <Option key={state.id} value={state.id}>{state.name}</Option>
          ))}
        </Select>
      </div>

      {/* Key Metrics - Same as Admin */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <div>
              <Text type="secondary" className="text-sm">Total Gaming Value</Text>
              <div className="text-3xl font-bold text-green-600 mt-2">₦287,000,000</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="text-sm">Total Company Revenue</Text>
                <div className="text-3xl font-bold text-blue-600 mt-2">₦350,000,000</div>
              </div>
              <TrendingUp size={24} className="text-blue-500 mt-2" />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="text-sm">Total Player Wins</Text>
                <div className="text-3xl font-bold text-purple-600 mt-2">₦240,000,000</div>
              </div>
              <CheckCircle size={24} className="text-purple-500 mt-2" />
            </div>
          </Card>
        </Col>
      </Row>

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
                <Text type="secondary" className="text-xs">Compliant States</Text>
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
                <Text type="secondary" className="text-xs">Avg Compliance Rate</Text>
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

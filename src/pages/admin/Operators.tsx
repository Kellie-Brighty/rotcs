import { Card, Typography, Table, Tag, Badge, Row, Col, Statistic } from 'antd'
import { Building2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import OperatorDetailModal from '@/components/admin/OperatorDetailModal'

const { Title, Text } = Typography

// Mock operator data
const operatorData = [
  {
    id: 1,
    name: 'Bet9ja',
    status: 'compliant',
    ggr: 450000000,
    taxDue: 67500000,
    taxPaid: 67500000,
    lastPayment: '2026-01-01',
    variance: 0.02,
  },
  {
    id: 2,
    name: 'SportyBet',
    status: 'compliant',
    ggr: 380000000,
    taxDue: 57000000,
    taxPaid: 57000000,
    lastPayment: '2026-01-01',
    variance: 0.01,
  },
  {
    id: 3,
    name: '1xBet',
    status: 'warning',
    ggr: 320000000,
    taxDue: 48000000,
    taxPaid: 45000000,
    lastPayment: '2025-12-28',
    variance: 0.35,
  },
  {
    id: 4,
    name: 'BetKing',
    status: 'compliant',
    ggr: 290000000,
    taxDue: 43500000,
    taxPaid: 43500000,
    lastPayment: '2026-01-02',
    variance: 0.03,
  },
  {
    id: 5,
    name: 'NairaBet',
    status: 'default',
    ggr: 180000000,
    taxDue: 27000000,
    taxPaid: 15000000,
    lastPayment: '2025-12-15',
    variance: 0.85,
  },
]

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'compliant':
      return { color: 'success', icon: <CheckCircle size={16} />, text: 'Compliant' }
    case 'warning':
      return { color: 'warning', icon: <AlertCircle size={16} />, text: 'Review Required' }
    case 'default':
      return { color: 'error', icon: <XCircle size={16} />, text: 'In Default' }
    default:
      return { color: 'default', icon: null, text: 'Unknown' }
  }
}

const getVarianceTag = (variance: number) => {
  if (variance < 0.05) return <Tag color="green">Green</Tag>
  if (variance < 0.5) return <Tag color="orange">Amber</Tag>
  return <Tag color="red">Red</Tag>
}

const columns = [
  {
    title: 'Operator',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <Building2 size={16} className="text-blue-500" />
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const config = getStatusConfig(status)
      return (
        <Badge
          status={config.color as any}
          text={
            <span className="flex items-center gap-1">
              {config.icon}
              {config.text}
            </span>
          }
        />
      )
    },
    filters: [
      { text: 'Compliant', value: 'compliant' },
      { text: 'Warning', value: 'warning' },
      { text: 'Default', value: 'default' },
    ],
    onFilter: (value: any, record: any) => record.status === value,
  },
  {
    title: 'TGV',
    dataIndex: 'ggr',
    key: 'ggr',
    render: (ggr: number) => <Text>₦{(ggr / 1000000).toFixed(1)}M</Text>,
    sorter: (a: any, b: any) => a.ggr - b.ggr,
  },
  {
    title: 'Tax Due',
    dataIndex: 'taxDue',
    key: 'taxDue',
    render: (taxDue: number) => <Text>₦{(taxDue / 1000000).toFixed(1)}M</Text>,
  },
  {
    title: 'Tax Paid',
    dataIndex: 'taxPaid',
    key: 'taxPaid',
    render: (taxPaid: number, record: any) => {
      const isPaid = taxPaid >= record.taxDue
      return (
        <Text className={isPaid ? 'text-green-600' : 'text-red-600'}>
          ₦{(taxPaid / 1000000).toFixed(1)}M
        </Text>
      )
    },
  },
  {
    title: 'Variance',
    dataIndex: 'variance',
    key: 'variance',
    render: (variance: number) => (
      <div className="flex items-center gap-2">
        {getVarianceTag(variance)}
        <Text type="secondary">{(variance * 100).toFixed(2)}%</Text>
      </div>
    ),
  },
  {
    title: 'Last Payment',
    dataIndex: 'lastPayment',
    key: 'lastPayment',
    render: (date: string) => <Text type="secondary">{date}</Text>,
  },
]

const Operators = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<any>(null)

  const compliantCount = operatorData.filter(op => op.status === 'compliant').length
  const warningCount = operatorData.filter(op => op.status === 'warning').length
  const defaultCount = operatorData.filter(op => op.status === 'default').length
  const totalMarketTGV = operatorData.reduce((sum, op) => sum + op.ggr, 0)

  const handleRowClick = (record: any) => {
    setSelectedOperator(record)
    setModalVisible(true)
  }

  return (
    <div>
      <Title level={2}>Operator Overview</Title>
      <Text type="secondary">Market status and compliance monitoring</Text>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Operators"
              value={operatorData.length}
              prefix={<Building2 size={20} className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Compliant"
              value={compliantCount}
              prefix={<CheckCircle size={20} className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Under Review"
              value={warningCount}
              prefix={<AlertCircle size={20} className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="In Default"
              value={defaultCount}
              prefix={<XCircle size={20} className="text-red-500" />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Market Volume */}
      <Card className="mt-6">
        <Title level={4}>Total Market Volume</Title>
        <Statistic
          value={totalMarketTGV}
          prefix="₦"
          suffix="(TGV)"
          valueStyle={{ color: '#1890ff', fontSize: '32px' }}
        />
        <Text type="secondary">Aggregate TGV across all operators</Text>
      </Card>

      {/* Operator Status Grid */}
      <Card className="mt-6">
        <Title level={4}>Operator Status Grid</Title>
        <Text type="secondary" className="block mb-4">Click on any row to view detailed information</Text>
        <div className="overflow-x-auto">
          <Table
            dataSource={operatorData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: { cursor: 'pointer' },
            })}
          />
        </div>
      </Card>

      <OperatorDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        operator={selectedOperator}
      />
    </div>
  )
}

export default Operators

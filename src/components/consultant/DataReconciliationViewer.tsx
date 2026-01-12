import { Card, Typography, Table, Tag, Progress } from 'antd'
import { AlertTriangle, CheckCircle } from 'lucide-react'

const { Title, Text } = Typography

// Mock variance data
const varianceData = [
  {
    id: 1,
    operator: 'Bet9ja',
    period: 'Dec 2025',
    reportedTGV: 320000000,
    calculatedTGV: 320500000,
    variance: 0.15,
    status: 'green',
  },
  {
    id: 2,
    operator: 'SportyBet',
    period: 'Dec 2025',
    reportedTGV: 280000000,
    calculatedTGV: 281200000,
    variance: 0.42,
    status: 'amber',
  },
  {
    id: 3,
    operator: '1xBet',
    period: 'Dec 2025',
    reportedTGV: 250000000,
    calculatedTGV: 252800000,
    variance: 1.12,
    status: 'red',
  },
  {
    id: 4,
    operator: 'BetKing',
    period: 'Dec 2025',
    reportedTGV: 220000000,
    calculatedTGV: 220100000,
    variance: 0.04,
    status: 'green',
  },
]

const getVarianceTag = (status: string) => {
  switch (status) {
    case 'green':
      return <Tag color="success" icon={<CheckCircle size={14} />}>Green</Tag>
    case 'amber':
      return <Tag color="warning" icon={<AlertTriangle size={14} />}>Amber</Tag>
    case 'red':
      return <Tag color="error" icon={<AlertTriangle size={14} />}>Red</Tag>
    default:
      return <Tag>Unknown</Tag>
  }
}

const DataReconciliationViewer = () => {
  const columns = [
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Reported TGV',
      dataIndex: 'reportedTGV',
      key: 'reportedTGV',
      render: (value: number) => `₦${(value / 1000000).toFixed(1)}M`,
    },
    {
      title: 'Calculated TGV',
      dataIndex: 'calculatedTGV',
      key: 'calculatedTGV',
      render: (value: number) => `₦${(value / 1000000).toFixed(1)}M`,
    },
    {
      title: 'Variance',
      dataIndex: 'variance',
      key: 'variance',
      render: (variance: number, record: any) => (
        <div>
          <div className="mb-1">{variance.toFixed(2)}%</div>
          <Progress
            percent={variance}
            size="small"
            showInfo={false}
            strokeColor={
              record.status === 'green' ? '#52c41a' : record.status === 'amber' ? '#faad14' : '#ff4d4f'
            }
          />
        </div>
      ),
      sorter: (a: any, b: any) => a.variance - b.variance,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getVarianceTag(status),
      filters: [
        { text: 'Green', value: 'green' },
        { text: 'Amber', value: 'amber' },
        { text: 'Red', value: 'red' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
  ]

  const greenCount = varianceData.filter((d) => d.status === 'green').length
  const amberCount = varianceData.filter((d) => d.status === 'amber').length
  const redCount = varianceData.filter((d) => d.status === 'red').length

  return (
    <Card>
      <Title level={4}>Data Reconciliation Hub</Title>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <Text>Green: {greenCount} (Variance &lt; 0.05%)</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <Text>Amber: {amberCount} (0.05% - 0.5%)</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <Text>Red: {redCount} (Variance &gt; 0.5%)</Text>
        </div>
      </div>
      <Table dataSource={varianceData} columns={columns} pagination={false} rowKey="id" />
    </Card>
  )
}

export default DataReconciliationViewer

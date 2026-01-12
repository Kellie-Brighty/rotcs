import { Card, Typography, Table, Tag } from 'antd'
import { MapPin, Users, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import GeospatialHeatmap from '@/components/admin/GeospatialHeatmap'

const { Title, Text } = Typography

// Mock territorial data
const territorialData = [
  { territory: 'Lagos Island', users: 50000, ggr: 200000000, penetration: 12.5, color: '#1890ff' },
  { territory: 'Ikeja', users: 35000, ggr: 145000000, penetration: 9.8, color: '#52c41a' },
  { territory: 'Victoria Island', users: 28000, ggr: 125000000, penetration: 15.2, color: '#faad14' },
  { territory: 'Lekki', users: 22000, ggr: 98000000, penetration: 11.3, color: '#eb2f96' },
  { territory: 'Surulere', users: 18000, ggr: 75000000, penetration: 7.5, color: '#722ed1' },
  { territory: 'Yaba', users: 15000, ggr: 62000000, penetration: 8.9, color: '#13c2c2' },
]

const columns = [
  {
    title: 'Territory/LGA',
    dataIndex: 'territory',
    key: 'territory',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-blue-500" />
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: 'Active Users',
    dataIndex: 'users',
    key: 'users',
    render: (users: number) => (
      <div className="flex items-center gap-2">
        <Users size={16} className="text-green-500" />
        <Text>{users.toLocaleString()}</Text>
      </div>
    ),
    sorter: (a: any, b: any) => a.users - b.users,
  },
  {
    title: 'TGV',
    dataIndex: 'ggr',
    key: 'ggr',
    render: (ggr: number) => (
      <Text className="font-semibold text-green-600">
        ₦{(ggr / 1000000).toFixed(1)}M
      </Text>
    ),
    sorter: (a: any, b: any) => a.ggr - b.ggr,
  },
  {
    title: 'Market Penetration',
    dataIndex: 'penetration',
    key: 'penetration',
    render: (penetration: number) => (
      <Tag color={penetration > 10 ? 'green' : 'orange'}>
        {penetration.toFixed(1)}%
      </Tag>
    ),
    sorter: (a: any, b: any) => a.penetration - b.penetration,
  },
]

const Geospatial = () => {
  return (
    <div>
      <Title level={2}>Territorial Intelligence</Title>
      <Text type="secondary">User density and economic activity across jurisdictions</Text>

      {/* Heatmap */}
      <GeospatialHeatmap />

      {/* Regional Leaderboard */}
      <Card className="mt-6">
        <Title level={4}>
          <TrendingUp className="inline mr-2" size={20} />
          Regional Leaderboard
        </Title>
        <div className="overflow-x-auto">
          <Table
            dataSource={territorialData}
            columns={columns}
            pagination={false}
            rowKey="territory"
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>

      {/* TGV Distribution Chart */}
      <Card className="mt-6">
        <Title level={4}>TGV Distribution by Territory</Title>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={territorialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="territory" />
            <YAxis />
            <Tooltip formatter={(value: any) => `₦${(value / 1000000).toFixed(1)}M`} />
            <Bar dataKey="ggr" radius={[8, 8, 0, 0]}>
              {territorialData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default Geospatial

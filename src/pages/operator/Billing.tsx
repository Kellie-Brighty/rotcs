import { Card, Typography, Table, Tag, Button } from 'antd'
import { FileText, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import DisputeFormModal from '@/components/operator/DisputeFormModal'
import InvoicePreviewModal from '@/components/operator/InvoicePreviewModal'

const { Title, Text } = Typography

const billingData = [
  {
    id: 'INV-2025-12-001',
    period: 'December 2025',
    ggr: 320000000,
    taxDue: 48000000,
    taxPaid: 48000000,
    status: 'paid',
    paidDate: '2026-01-02',
    prn: 'PRN-2025-12-001',
  },
  {
    id: 'INV-2025-11-001',
    period: 'November 2025',
    ggr: 298000000,
    taxDue: 44700000,
    taxPaid: 44700000,
    status: 'paid',
    paidDate: '2025-12-03',
    prn: 'PRN-2025-11-001',
  },
  {
    id: 'INV-2025-10-001',
    period: 'October 2025',
    ggr: 315000000,
    taxDue: 47250000,
    taxPaid: 47250000,
    status: 'paid',
    paidDate: '2025-11-02',
    prn: 'PRN-2025-10-001',
  },
]

const Billing = () => {
  const [disputeModalVisible, setDisputeModalVisible] = useState(false)
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setInvoiceModalVisible(true)
  }

  const columns = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'GGR',
      dataIndex: 'ggr',
      key: 'ggr',
      render: (ggr: number) => <Text>₦{(ggr / 1000000).toFixed(1)}M</Text>,
    },
    {
      title: 'Tax Due',
      dataIndex: 'taxDue',
      key: 'taxDue',
      render: (taxDue: number) => <Text>₦{(taxDue / 1000000).toFixed(1)}M</Text>,
    },
    {
      title: 'PRN',
      dataIndex: 'prn',
      key: 'prn',
      render: (prn: string) => <Text type="secondary" className="font-mono text-xs">{prn}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'paid' ? 'success' : 'warning'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Paid Date',
      dataIndex: 'paidDate',
      key: 'paidDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" size="small" onClick={() => handleViewInvoice(record)}>
          View Invoice
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>Billing History</Title>
      <Text type="secondary">View past invoices and tax payments</Text>

      <Card className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>
            <FileText className="inline mr-2" size={20} />
            Invoice History
          </Title>
          <Button type="primary">Download All</Button>
        </div>
        <Table
          dataSource={billingData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Card>

      <Card className="mt-6">
        <Title level={4}>
          <AlertCircle className="inline mr-2 text-orange-500" size={20} />
          Dispute Mechanism
        </Title>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <Text>
            If you believe there is a discrepancy in the calculated GGR or tax liability, 
            you can raise a dispute for review by the regulatory team.
          </Text>
          <div className="mt-4">
            <Button type="default" onClick={() => setDisputeModalVisible(true)}>
              Raise a Dispute
            </Button>
          </div>
        </div>
      </Card>

      <DisputeFormModal
        visible={disputeModalVisible}
        onClose={() => setDisputeModalVisible(false)}
        period="January 2026"
        calculatedGGR={320000000}
        reportedGGR={318000000}
      />

      <InvoicePreviewModal
        visible={invoiceModalVisible}
        onClose={() => setInvoiceModalVisible(false)}
        invoice={selectedInvoice}
      />
    </div>
  )
}

export default Billing

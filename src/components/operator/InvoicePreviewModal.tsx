import { Modal, Button, Descriptions, Tag } from 'antd'
import { FileText, Download, CheckCircle } from 'lucide-react'
import { toast } from '@/utils/notifications'

interface InvoicePreviewModalProps {
  visible: boolean
  onClose: () => void
  invoice: {
    id: string
    period: string
    ggr: number
    taxDue: number
    prn: string
    status: string
    paidDate?: string
  } | null
}

const InvoicePreviewModal = ({ visible, onClose, invoice }: InvoicePreviewModalProps) => {
  if (!invoice) return null

  const handleDownloadPDF = () => {
    toast.success('Downloading invoice PDF...')
    console.log('Downloading invoice:', invoice.id)
  }

  const handleDownloadReceipt = () => {
    toast.success('Downloading payment receipt...')
    console.log('Downloading receipt for:', invoice.id)
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <FileText size={20} />
          <span>Invoice Preview</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={700}
      footer={
        <div className="flex justify-between">
          <Button icon={<Download size={16} />} onClick={handleDownloadPDF}>
            Download Invoice PDF
          </Button>
          {invoice.status === 'paid' && (
            <Button type="primary" icon={<CheckCircle size={16} />} onClick={handleDownloadReceipt}>
              Download Receipt
            </Button>
          )}
        </div>
      }
    >
      <div className="border rounded-lg p-6 bg-white">
        {/* Invoice Header */}
        <div className="text-center mb-6 pb-4 border-b">
          <h2 className="text-2xl font-bold">TAX INVOICE</h2>
          <p className="text-gray-600">Regulatory Oversight & Tax Calculation System</p>
        </div>

        {/* Invoice Details */}
        <Descriptions bordered column={1} className="mb-6">
          <Descriptions.Item label="Invoice Number">{invoice.id}</Descriptions.Item>
          <Descriptions.Item label="Tax Period">{invoice.period}</Descriptions.Item>
          <Descriptions.Item label="Payment Reference Number (PRN)">
            <span className="font-mono font-bold">{invoice.prn}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Revenue Code">
            <span className="font-mono">07081999</span>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={invoice.status === 'paid' ? 'success' : 'warning'}>
              {invoice.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          {invoice.paidDate && (
            <Descriptions.Item label="Payment Date">{invoice.paidDate}</Descriptions.Item>
          )}
        </Descriptions>

        {/* Tax Calculation */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-3">Tax Calculation</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Gross Gaming Revenue (GGR):</span>
              <span className="font-semibold">₦{(invoice.ggr / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between">
              <span>Tax Rate:</span>
              <span className="font-semibold">15%</span>
            </div>
            <div className="flex justify-between pt-2 border-t-2 border-gray-300">
              <span className="font-bold text-lg">Total Tax Due:</span>
              <span className="font-bold text-lg text-blue-600">
                ₦{(invoice.taxDue / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        {invoice.status !== 'paid' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-semibold mb-2">Payment Instructions:</h4>
            <ol className="text-sm space-y-1 ml-4">
              <li>Use the PRN: <span className="font-mono font-bold">{invoice.prn}</span></li>
              <li>Revenue Code: <span className="font-mono">07081999</span></li>
              <li>Pay via online banking or at any bank branch</li>
              <li>Keep your payment confirmation for records</li>
            </ol>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default InvoicePreviewModal

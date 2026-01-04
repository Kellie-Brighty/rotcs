import { Modal, Button } from 'antd'
import { Award, Download } from 'lucide-react'
import { toast } from '@/utils/notifications'

interface TaxClearanceCertificateProps {
  visible: boolean
  onClose: () => void
  certificate: {
    certificateNumber: string
    operatorName: string
    period: string
    taxPaid: number
    issueDate: string
  } | null
}

const TaxClearanceCertificate = ({ visible, onClose, certificate }: TaxClearanceCertificateProps) => {
  if (!certificate) return null

  const handleDownload = () => {
    toast.success('Downloading Tax Clearance Certificate...')
    console.log('Downloading certificate:', certificate.certificateNumber)
  }

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={700}
      footer={
        <Button type="primary" icon={<Download size={16} />} onClick={handleDownload} size="large">
          Download Certificate
        </Button>
      }
    >
      <div className="border-4 border-blue-600 rounded-lg p-8 bg-gradient-to-br from-blue-50 to-white">
        {/* Header */}
        <div className="text-center mb-6">
          <Award size={64} className="text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-blue-900 mb-2">TAX CLEARANCE CERTIFICATE</h1>
          <p className="text-gray-600">Regulatory Oversight & Tax Calculation System</p>
        </div>

        {/* Certificate Body */}
        <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
          <p className="text-center text-lg mb-6">This is to certify that</p>
          
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
            {certificate.operatorName}
          </h2>

          <p className="text-center text-lg mb-4">
            has fulfilled all tax obligations for the period of
          </p>

          <p className="text-center text-xl font-semibold text-blue-700 mb-6">
            {certificate.period}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded">
            <div>
              <p className="text-sm text-gray-600">Certificate Number</p>
              <p className="font-mono font-bold">{certificate.certificateNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Issue Date</p>
              <p className="font-semibold">{certificate.issueDate}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Total Tax Paid</p>
              <p className="text-2xl font-bold text-green-600">
                ₦{(certificate.taxPaid / 1000000).toFixed(2)}M
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 text-center">
              This certificate is valid and verifiable through the ROTCS portal
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2026 ROTCS. All rights reserved.</p>
          <p className="mt-1">This is a digitally generated certificate</p>
        </div>
      </div>
    </Modal>
  )
}

export default TaxClearanceCertificate

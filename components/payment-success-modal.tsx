import { formatToIDR } from "@/lib/checkout"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  orderDetails: {
    productName: string
    price: number
    quantity: number
    shipping: number
    total: number
    imageUrl: string
  }
}

export function PaymentSuccessModal({ isOpen, onClose, orderDetails }: PaymentSuccessModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  const handleBackHome = () => {
    onClose()
    router.push('/')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-500 mt-2">Thank you for your purchase</p>
        </div>

        <div className="border rounded-lg p-4 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="relative w-20 h-20">
              <Image
                src={orderDetails.imageUrl}
                alt={orderDetails.productName}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h3 className="font-medium">{orderDetails.productName}</h3>
              <p className="text-sm text-gray-500">Quantity: {orderDetails.quantity}</p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatToIDR(orderDetails.price * orderDetails.quantity)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{formatToIDR(orderDetails.shipping)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>{formatToIDR(orderDetails.total)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleBackHome}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
} 
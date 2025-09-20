import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import paymentService from '../api/paymentService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentDetails = () => {
  const navigate = useNavigate();
  const { orderNumber } = useParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderNumberInput, setOrderNumberInput] = useState(orderNumber || '');
  const [emailInput, setEmailInput] = useState('');
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);
  const [isEmailingReceipt, setIsEmailingReceipt] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState('');

  useEffect(() => {
    if (orderNumber) {
      fetchPaymentDetails(orderNumber);
    } else {
      setIsLoading(false);
    }
  }, [orderNumber]);

  const fetchPaymentDetails = async (orderNum) => {
    if (!orderNum || orderNum.trim() === '') {
      setError('Please enter a valid order number');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await paymentService.showPaymentDetails(orderNum);
      
      if (result.success) {
        setPaymentDetails(result);
      } else {
        setError(result.error || 'Failed to retrieve payment details');
      }
    } catch (error) {
      console.error('Payment details fetch error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderNumberInput.trim()) {
      navigate(`/payment-details/${orderNumberInput.trim()}`);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!paymentDetails) return;

    setIsDownloadingReceipt(true);
    try {
      const result = await paymentService.downloadReceipt(paymentDetails.transactionDetails.orderNumber);
      
      if (result.success) {
        // Open receipt URL in new tab
        if (result.receiptUrl) {
          window.open(result.receiptUrl, '_blank');
        } else {
          setError('Receipt URL not available');
        }
      } else {
        setError(result.error || 'Failed to download receipt');
      }
    } catch (error) {
      console.error('Receipt download error:', error);
      setError('An unexpected error occurred while downloading receipt.');
    } finally {
      setIsDownloadingReceipt(false);
    }
  };

  const handleEmailReceipt = async (e) => {
    e.preventDefault();
    if (!paymentDetails || !emailInput.trim()) return;

    if (!paymentService.isValidEmail(emailInput)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsEmailingReceipt(true);
    setEmailSuccess('');
    setError('');

    try {
      const result = await paymentService.emailReceipt(
        paymentDetails.transactionDetails.orderNumber,
        emailInput.trim()
      );
      
      if (result.success) {
        setEmailSuccess('Receipt sent successfully to ' + emailInput);
        setEmailInput('');
      } else {
        setError(result.error || 'Failed to send receipt email');
      }
    } catch (error) {
      console.error('Email receipt error:', error);
      setError('An unexpected error occurred while sending email.');
    } finally {
      setIsEmailingReceipt(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#F67F20] text-white p-6">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <p className="opacity-90 mt-1">Search and view payment transaction details</p>
          </div>

          {/* Search Form */}
          <div className="p-6 border-b">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumberInput}
                  onChange={(e) => setOrderNumberInput(e.target.value)}
                  placeholder="Enter order number (e.g., 1BU9MF7NVHA8WKG8W8S)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F67F20] focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-[#F67F20] text-white rounded-md hover:bg-[#E55A2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F67F20] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading payment details...</p>
              </div>
            )}

            {(error || emailSuccess) && (
              <div className={`border rounded-lg p-4 mb-6 ${error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-2">
                  <svg className={`w-5 h-5 ${error ? 'text-red-500' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                    {error ? (
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    )}
                  </svg>
                  <span className={error ? 'text-red-700' : 'text-green-700'}>
                    {error || emailSuccess}
                  </span>
                </div>
              </div>
            )}

            {paymentDetails && !isLoading && (
              <div className="space-y-6">
                {/* Transaction Overview */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Transaction Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Transaction ID</label>
                      <p className="font-semibold text-lg">{paymentDetails.transactionDetails.id}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Amount</label>
                      <p className="font-semibold text-lg text-[#F67F20]">
                        {paymentService.formatAmount(paymentDetails.transactionDetails.amount)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(paymentDetails.transactionDetails.status)}`}>
                        {paymentDetails.transactionDetails.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Receipt Actions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-4 text-blue-800">Receipt Options</h3>
                  
                  {/* Download Receipt */}
                  <div className="mb-4">
                    <button
                      onClick={handleDownloadReceipt}
                      disabled={isDownloadingReceipt}
                      className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {isDownloadingReceipt ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Receipt
                        </>
                      )}
                    </button>
                  </div>

                  {/* Email Receipt */}
                  <form onSubmit={handleEmailReceipt} className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter email address to send receipt"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isEmailingReceipt || !emailInput.trim()}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isEmailingReceipt ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email Receipt
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Information */}
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">Order Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium">{paymentDetails.transactionDetails.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">{paymentDetails.transactionDetails.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Updated At:</span>
                        <span className="font-medium">{formatDate(paymentDetails.transactionDetails.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3">Payment Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confirmation Status:</span>
                        <span className="font-medium">{paymentDetails.transactionDetails.confirmationStatus || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Environment:</span>
                        <span className="font-medium">{paymentDetails.transactionDetails.licenseEnv || 'N/A'}</span>
                      </div>
                      {paymentDetails.transactionDetails.approvalCode && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approval Code:</span>
                          <span className="font-medium">{paymentDetails.transactionDetails.approvalCode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Error Information (if any) */}
                  {(paymentDetails.transactionDetails.errorCode || paymentDetails.transactionDetails.errorMessage) && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:col-span-2">
                      <h3 className="font-semibold text-lg mb-3 text-red-800">Error Information</h3>
                      <div className="space-y-2">
                        {paymentDetails.transactionDetails.errorCode && (
                          <div className="flex justify-between">
                            <span className="text-red-600">Error Code:</span>
                            <span className="font-medium text-red-800">{paymentDetails.transactionDetails.errorCode}</span>
                          </div>
                        )}
                        {paymentDetails.transactionDetails.errorMessage && (
                          <div className="flex justify-between">
                            <span className="text-red-600">Error Message:</span>
                            <span className="font-medium text-red-800">{paymentDetails.transactionDetails.errorMessage}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta Information */}
                {paymentDetails.meta && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-3 text-blue-800">System Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Code:</span>
                        <span className="font-medium text-blue-800">{paymentDetails.meta.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Message:</span>
                        <span className="font-medium text-blue-800">{paymentDetails.meta.message}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => navigate('/cart')}
                    className="flex-1 px-6 py-3 border border-[#F67F20] text-[#F67F20] rounded-lg font-medium hover:bg-[#F67F20]/10 transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 px-6 py-3 bg-[#F67F20] text-white rounded-lg font-medium hover:bg-[#E55A2B] transition-colors"
                  >
                    Print Details
                  </button>
                </div>
              </div>
            )}

            {!paymentDetails && !isLoading && !error && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Details</h3>
                <p className="text-gray-500">Enter an order number above to search for payment details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentDetails;
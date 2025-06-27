export interface PaymentRecord {
  _id: string;
  violationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'cash' | 'bank_transfer';
  stripePaymentIntentId?: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  clientSecret?: string;
  errors?: string[];
}

export interface CreatePaymentIntentData {
  amount: number;
  currency: string;
  violationId: string;
  description?: string;
}

export interface UpdateViolationPaymentData {
  violationId: string;
  status: 'paid' | 'active';
  paymentStatus?: 'paid' | 'unpaid' | 'partially_paid';
  paymentDate?: string;
  stripePaymentIntentId?: string;
}

class PaymentService {
  private baseUrl = 'http://192.168.8.135:3000/api/other/payments';

  async createPaymentIntent(
    data: CreatePaymentIntentData,
  ): Promise<PaymentApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: PaymentApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`,
        );
      }

      return result;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async updateViolationPaymentStatus(
    data: UpdateViolationPaymentData,
  ): Promise<PaymentApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/update-violation-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: PaymentApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`,
        );
      }

      return result;
    } catch (error) {
      console.error('Error updating violation payment status:', error);
      throw error;
    }
  }

  async getPaymentHistory(
    violationId: string,
  ): Promise<PaymentApiResponse<PaymentRecord[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/history/${violationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaymentApiResponse<PaymentRecord[]> = await response.json();
      return result;
    } catch (error) {
      console.error(
        `Error fetching payment history for violation ${violationId}:`,
        error,
      );
      throw new Error('Failed to fetch payment history');
    }
  }

  async getPaymentById(
    paymentId: string,
  ): Promise<PaymentApiResponse<PaymentRecord>> {
    try {
      const response = await fetch(`${this.baseUrl}/get/${paymentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaymentApiResponse<PaymentRecord> = await response.json();
      return result;
    } catch (error) {
      console.error(`Error fetching payment with ID ${paymentId}:`, error);
      throw new Error('Failed to fetch payment');
    }
  }
}

export const paymentService = new PaymentService();
export default paymentService;

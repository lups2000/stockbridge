import { ApiClient } from '../apiClient';

export interface paymentIntentDto {
  amount: number;
  product: string;
}

export interface SubscriptionDto {
  clientSecret: string;
  subscriptionId: string;
}

const apiClient = new ApiClient();

export async function createPaymentIntent(paymentIntentDto: paymentIntentDto) {
  return await apiClient.post<string>(
    `/stripe/create-payment-intent`,
    paymentIntentDto,
    { withCredentials: true },
  );
}
export async function createSetupIntent() {
  return await apiClient.get<string>(`/stripe/create-setup-intent`, {
    withCredentials: true,
  });
}

export async function createSubscription(
  subscriptionType: string,
): Promise<SubscriptionDto> {
  return await apiClient.post<SubscriptionDto>(
    `/stripe/create-subscription`,
    {
      subscriptionType,
    },
    {
      withCredentials: true,
    },
  );
}

export async function cancelSubscription() {
  return await apiClient.delete<void>(`/stripe/cancel-subscription`, {
    withCredentials: true,
  });
}

export async function getInvoiceLink() {
  return await apiClient.get<string>(`/stripe/get-invoice-link`, {
    withCredentials: true,
  });
}

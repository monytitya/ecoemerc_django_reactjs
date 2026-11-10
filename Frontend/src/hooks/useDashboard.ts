import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard';
import type { SalesRange, SalesMetric } from '../types/dashboard';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => dashboardApi.getMe(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => dashboardApi.getSummary(),
    refetchInterval: 60000, // Auto-refresh every 60s
    staleTime: 1000 * 30,
  });
}

export function useSalesReport(range: SalesRange, metric: SalesMetric) {
  return useQuery({
    queryKey: ['dashboard', 'sales', range, metric],
    queryFn: () => dashboardApi.getSales(range, metric),
    staleTime: 1000 * 60,
  });
}

export function useTransactions(search?: string, page: number = 1) {
  return useQuery({
    queryKey: ['dashboard', 'orders', search, page],
    queryFn: () => dashboardApi.getOrders({ search, page }),
    refetchInterval: 60000,
    staleTime: 1000 * 30,
  });
}

export function useTopProducts() {
  return useQuery({
    queryKey: ['dashboard', 'topProducts'],
    queryFn: () => dashboardApi.getTopProducts(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useChannels() {
  return useQuery({
    queryKey: ['dashboard', 'channels'],
    queryFn: () => dashboardApi.getChannels(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useNotificationsCount() {
  return useQuery({
    queryKey: ['dashboard', 'notificationsCount'],
    queryFn: () => dashboardApi.getUnreadCount(),
    staleTime: 1000 * 60 * 2,
  });
}


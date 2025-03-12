import { useGetInvestmentVehiclesByTypeAndStatusQuery } from '@/service/admin/fund_query';

interface QueryParams {
  type: string;
  status: string;
  pageSize: number;
  pageNumber: number;
  skip?: string
}

export const viewInvestmentVehiclesByTypeAndStatus = ({ type, status, pageSize, pageNumber,skip }: QueryParams) => {
    const { data, error, isLoading } = useGetInvestmentVehiclesByTypeAndStatusQuery({
      type,
      status,
      pageSize,
      pageNumber,
    });
  
    return { data, error, isLoading };
  };
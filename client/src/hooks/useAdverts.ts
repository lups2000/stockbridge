import { UseQueryResult, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { ApiClient } from '../api/apiClient';
import { AdvertDto } from '../api/collections/advert';

export function useAdverts(): UseQueryResult<AdvertDto> {
  const [search] = useSearchParams();

  return useQuery(['adverts', search.toString()], () =>
    new ApiClient()
      .get<AdvertDto>('/adverts', { withCredentials: true }, search)
      .then((res) => res),
  );
}

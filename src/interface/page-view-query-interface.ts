export interface PageViewQuery {
   rotina?: string;
   modulo?: string;
   codCliente?: string;
   dataInicio?: string;
   dataFim?: string;
   orderBy?:
   {
      rotina?: 'asc' | 'desc',
      modulo?: 'asc' | 'desc',
      codCliente?: 'asc' | 'desc',
      createdAt?: 'asc' | 'desc',
   }
}
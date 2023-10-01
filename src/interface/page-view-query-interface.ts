export interface PageViewQuery {
   rotina?: string;
   modulo?: string;
   dataInicio: string;
   dataFim?: string;
   orderBy?:
   {
      rotina?: 'asc' | 'desc',
      modulo?: 'asc' | 'desc',
      createdAt?: 'asc' | 'desc',
   }
}
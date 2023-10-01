export interface findSystemStartedQuery {
   estado?: string
   modulo?: string
   filial?: string
   dataInicio: string;
   dataFim?: string;
   orderBy?:
   {
      estado?: 'asc' | 'desc',
      modulo?: 'asc' | 'desc',
      filial?: 'asc' | 'desc',
      createdAt?: 'asc' | 'desc',
   }

}

export interface countSystemStartedQuery {
   estado?: string
   modulo?: string
   filial?: string
   dataInicio: string;
   dataFim?: string;
}
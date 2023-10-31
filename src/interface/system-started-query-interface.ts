export interface findSystemStartedQuery {
   estado?: string
   cidade?: string
   modulo?: string
   codCliente?: string
   versao?: string
   dataInicio?: string;
   dataFim?: string;
   orderBy?:
   {
      estado?: 'asc' | 'desc',
      cidade?: 'asc' | 'desc',
      modulo?: 'asc' | 'desc',
      codCliente?: 'asc' | 'desc',
      versao?: 'asc' | 'desc',
      createdAt?: 'asc' | 'desc',
   }

}

export interface countSystemStartedQuery {
   estado?: string
   cidade?: string
   modulo?: string
   codCliente?: string
   versao?: string
   dataInicio?: string;
   dataFim?: string;
}
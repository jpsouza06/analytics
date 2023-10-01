export interface ErrorQuery {
   unit?: string;
   rotina?: string;
   modulo?: string;
   conteudo?: string;
   dataInicio: string;
   dataFim?: string;
   orderBy?:
   {
      unit?: 'asc' | 'desc',
      rotina?: 'asc' | 'desc',
      modulo?: 'asc' | 'desc',
      conteudo?: 'asc' | 'desc',
      createdAt?: 'asc' | 'desc',
   }
}

interface ProductoFinanciero {
  id: string;
  name: string;
  description: string;
  logo: string;
}


export interface ProductoFinancieroListar extends ProductoFinanciero {
  date_release: Date;
  date_revision: Date;
}

export interface ProductoFinancieroRequest extends ProductoFinanciero {
  date_release: string;
  date_revision: string;
}

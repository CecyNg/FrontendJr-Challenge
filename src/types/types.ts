export type OwnerData = {
  Nombre: string;
  Apellido: string;
  Telefono: string;
  Email: string;
  Rfc: string;
  Certificado: File | null;
};

export type BusinessData = {
  NombreComercial: string;
  NombreEmpresa: string;
  Email: string;
  Telefono: string;
  Ciudad: string;
  Estado: string;
  CodigoPostal: string;
  Sector: string;
  Logotipo: File | null;
};

export type AccountData = {
  Email: string;
  Contrasena: string;
  ConfirmarContrasena: string;
};

export type StepSummaryProps = {
  ownerData: OwnerData;
  businessData: BusinessData;
  accountData: AccountData;
  onBack: () => void;
  onFinish: () => void;
};

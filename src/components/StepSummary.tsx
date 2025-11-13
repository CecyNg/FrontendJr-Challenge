import { useEffect, useState } from "react";
import type { AccountData, BusinessData, OwnerData } from "../types/types";

type StepSummaryProps = {
  ownerData: OwnerData;
  businessData: BusinessData;
  accountData: AccountData;
  onBack: () => void;
  onFinish?: () => void;
};

function StepSummary({ ownerData, businessData, accountData, onBack }: StepSummaryProps) {

    const [images, setImages] = useState<string | null>(null);
    useEffect(() => {
        if (businessData.Logotipo) {
            const url = URL.createObjectURL(businessData.Logotipo);
            setImages(url);
        }
    }, [businessData.Logotipo]);

  return (
    <>
       <div className="flex flex-col min-h-screen bg-gray-50 p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Resumen de Informacion</h2>

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 border border-gray-200">
                    <h2 className="font-semibold text-lg mb-4 text-gray-800e">Informacion del propietario</h2>
                    <p><strong>Nombre:</strong>{ownerData.Nombre}{ownerData.Apellido}</p>
                    <p><strong>Telefono:</strong> {ownerData.Telefono}</p>
                    <p><strong>Email:</strong> {ownerData.Email}</p>
                    <p><strong>Rfc:</strong> {ownerData.Rfc}</p>
                    <p><strong>Certificado:</strong> {ownerData.Certificado ? ownerData.Certificado.name : 'No cargado'}</p>

                </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex-1 border border-gray-200">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">Informacion del Negocio</h3>
                    <p><strong>Nombre Comercial:</strong> {businessData.NombreComercial}</p>
                    <p><strong>Nombre Empresa:</strong> {businessData.NombreEmpresa}</p>
                    <p><strong>Email:</strong> {businessData.Email}</p>
                    <p><strong>Teléfono:</strong> {businessData.Telefono}</p>
                    <p><strong>Ciudad:</strong> {businessData.Ciudad}</p>
                    <p><strong>Estado:</strong> {businessData.Estado}</p>
                    <p><strong>Código Postal:</strong> {businessData.CodigoPostal}</p>
                    <p><strong>Sector:</strong> {businessData.Sector}</p>
                    <p><strong>Logotipo:</strong> {businessData.Logotipo ? businessData.Logotipo.name : 'No cargado'}</p>
                    <div>{images && <img src={images} alt="Logotipo" className="max-w-full h-auto mt-2" />}</div>
            </div>

             <div className="bg-white shadow-lg rounded-lg p-6 flex-1 border border-gray-200">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800">Cuenta</h3>
                    <p><strong>Correo Electronico:</strong> {accountData.Email}</p>
                    <p><strong>Contrasena:</strong>{"*".repeat(accountData.Contrasena.length)} </p>
                 
            </div>

          </div>

           <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={onBack}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
              >
                Anterior
              </button>

                
            </div>
       </div>

         
    </>
  )
}


export default StepSummary;



                
import { useEffect, useState } from "react";
import type { BusinessData } from "../types/types";

type StepBusinessProps = {
  businessData: BusinessData;
  setBusinessData: React.Dispatch<React.SetStateAction<BusinessData>>;
  onNext: () => void;
  onBack: () => void;
};

function StepBusiness({ businessData, setBusinessData, onNext, onBack }: StepBusinessProps) {
  
    const [images, setImages] = useState<string | null>(null);
        useEffect(() => {
            if (businessData.Logotipo) {
                const url = URL.createObjectURL(businessData.Logotipo);
                setImages(url);
            }
        }, [businessData.Logotipo]);

    const [errors, setErrors] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!businessData.NombreComercial.trim()) newErrors.NombreComercial = "Campo obligatorio";
    if (!businessData.NombreEmpresa.trim()) newErrors.NombreEmpresa = "Campo obligatorio";
    if (!businessData.Email.trim()) newErrors.Email = "Campo obligatorio";
    else if (!/\S+@\S+\.\S+/.test(businessData.Email)) newErrors.Email = "Correo inválido";
    if (!businessData.Telefono.trim()) newErrors.Telefono = "El teléfono es obligatorio";
    else if (!/^[0-9]+$/.test(businessData.Telefono)) 
      newErrors.Telefono = "El teléfono solo debe contener números";
    else if (businessData.Telefono.length < 10)
      newErrors.Telefono = "El teléfono debe tener al menos 10 dígitos";
    if (!businessData.Ciudad.trim()) newErrors.Ciudad = "Campo obligatorio";
    if (!businessData.Estado.trim()) newErrors.Estado = "Campo obligatorio";
    if (!businessData.CodigoPostal.trim()) newErrors.CodigoPostal = "Campo obligatorio";
    if (!businessData.Sector.trim()) newErrors.Sector = "Campo obligatorio";
    if (businessData.Logotipo) {
    if (businessData.Logotipo.size > 2 * 1024 * 1024) { 
      newErrors.Logotipo = "El archivo no puede pesar más de 2 MB";
        } else if (![ "image/png", "image/jpeg"].includes(businessData.Logotipo.type)) {
          newErrors.Logotipo = "Solo se permiten archivos PNG o JPG";
        }
      }


    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        setErrors("Corrige los campos marcados en rojo antes de continuar.");
        return;
    }

    setErrors(null);
    onNext();
   };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Información del Negocio
    </h2>

    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nombre Comercial</label>
        <input
          type="text"
          placeholder="Nombre Comercial"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.NombreComercial
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.NombreComercial}
          onChange={(e) =>
            setBusinessData({ ...businessData, NombreComercial: e.target.value })
          }
        />
        {fieldErrors.NombreComercial && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.NombreComercial}</p>
        )}
      </div>

      
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nombre de la Empresa</label>
        <input
          type="text"
          placeholder="Nombre de la Empresa"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.NombreEmpresa
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.NombreEmpresa}
          onChange={(e) =>
            setBusinessData({ ...businessData, NombreEmpresa: e.target.value })
          }
        />
        {fieldErrors.NombreEmpresa && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.NombreEmpresa}</p>
        )}
      </div>

      
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Email"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.Email}
          onChange={(e) => setBusinessData({ ...businessData, Email: e.target.value })}
        />
        {fieldErrors.Email && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Email}</p>
        )}
      </div>

     
      <div>
        <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
        <input
          type="tel"
          placeholder="Teléfono"
          maxLength={10}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Telefono
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.Telefono}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setBusinessData({ ...businessData, Telefono: value });
            }
          }}
        />
        {fieldErrors.Telefono && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Telefono}</p>
        )}
      </div>

    
      <div>
        <label className="block text-gray-700 font-medium mb-1">Ciudad</label>
        <input
          type="text"
          placeholder="Ciudad"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Ciudad
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.Ciudad}
          onChange={(e) => setBusinessData({ ...businessData, Ciudad: e.target.value })}
        />
        {fieldErrors.Ciudad && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Ciudad}</p>
        )}
      </div>

     
      <div>
        <label className="block text-gray-700 font-medium mb-1">Estado</label>
        <input
          type="text"
          placeholder="Estado"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Estado
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.Estado}
          onChange={(e) => setBusinessData({ ...businessData, Estado: e.target.value })}
        />
        {fieldErrors.Estado && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Estado}</p>
        )}
      </div>

      
      <div>
        <label className="block text-gray-700 font-medium mb-1">Código Postal</label>
        <input
          type="text"
          placeholder="Código Postal"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.CodigoPostal
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.CodigoPostal}
          onChange={(e) => setBusinessData({ ...businessData, CodigoPostal: e.target.value })}
        />
        {fieldErrors.CodigoPostal && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.CodigoPostal}</p>
        )}
      </div>

    
      <div>
        <label className="block text-gray-700 font-medium mb-1">Sector</label>
        <input
          type="text"
          placeholder="Sector"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Sector
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={businessData.Sector}
          onChange={(e) => setBusinessData({ ...businessData, Sector: e.target.value })}
        />
        {fieldErrors.Sector && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Sector}</p>
        )}
      </div>

      
      <div className="sm:col-span-2">
        <label className="block text-gray-700 font-medium mb-1">Logotipo</label>
        <input
          type="file"
          accept="image/*"
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
            fieldErrors.Logotipo
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setBusinessData({ ...businessData, Logotipo: file });

            if (file && file.type.startsWith("image/")) {
              const url = URL.createObjectURL(file);
              setImages(url);
            } else {
              setImages(null);
            }
          }}
        />
        {businessData.Logotipo && (
          <p className="text-sm text-gray-500 mt-1">
            Archivo seleccionado: {businessData.Logotipo.name}
          </p>
        )}
        {images && (
          <img src={images} alt="Logotipo" className="mx-auto mt-2 max-h-32 object-contain" />
        )}
      </div>

     
      {errors && <p className="text-red-600 text-center sm:col-span-2">{errors}</p>}

      <div className="flex flex-col sm:flex-row justify-end gap-4 sm:col-span-2 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </form>
  </div>
</div>

       
  );
}








export default StepBusiness;
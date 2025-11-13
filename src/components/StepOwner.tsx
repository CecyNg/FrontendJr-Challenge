import { useState } from "react";
import type { OwnerData } from "../types/types";


type StepOwnerProps = {
  ownerData: OwnerData;
  setOwnerData: React.Dispatch<React.SetStateAction<OwnerData>>;
  onNext: () => void;
};

function StepOwner({ ownerData, setOwnerData, onNext }: StepOwnerProps) {
  const [errors, setErrors] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!ownerData.Nombre.trim()) newErrors.Nombre = "El nombre es obligatorio";
    if (!ownerData.Apellido.trim()) newErrors.Apellido = "El apellido es obligatorio";
    if (!ownerData.Telefono.trim()) newErrors.Telefono = "El teléfono es obligatorio";
    else if (!/^[0-9]+$/.test(ownerData.Telefono)) 
      newErrors.Telefono = "El teléfono solo debe contener números";
    else if (ownerData.Telefono.length < 10)
      newErrors.Telefono = "El teléfono debe tener al menos 10 dígitos";
    if (!ownerData.Email.trim()) newErrors.Email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerData.Email))
      newErrors.Email = "Formato de correo inválido";
    if (!ownerData.Rfc.trim()) newErrors.Rfc = "El RFC es obligatorio";
    if (!ownerData.Certificado) {
      newErrors.Certificado = "Debes subir un certificado fiscal";
    } else if (ownerData.Certificado.size > 2 * 1024 * 1024) { 
      newErrors.Certificado = "El archivo no puede pesar más de 2 MB";
    } else if (!["application/pdf", "image/png", "image/jpeg"].includes(ownerData.Certificado.type)) {
      newErrors.Certificado = "Solo se permiten archivos PDF, PNG o JPG";
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
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Información del Propietario
    </h2>

    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Nombre
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={ownerData.Nombre}
          onChange={(e) =>
            setOwnerData({ ...ownerData, Nombre: e.target.value })
          }
        />
        {fieldErrors.Nombre && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Nombre}</p>
        )}
      </div>

      
      <div>
        <label className="block text-gray-700 font-medium mb-1">Apellido</label>
        <input
          type="text"
          placeholder="Apellido"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Apellido
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={ownerData.Apellido}
          onChange={(e) =>
            setOwnerData({ ...ownerData, Apellido: e.target.value })
          }
        />
        {fieldErrors.Apellido && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Apellido}</p>
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
          value={ownerData.Telefono}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,10}$/.test(value)) {
              setOwnerData({ ...ownerData, Telefono: value });
            }
          }}
        />
        {fieldErrors.Telefono && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Telefono}</p>
        )}
      </div>

      
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Email
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={ownerData.Email}
          onChange={(e) =>
            setOwnerData({ ...ownerData, Email: e.target.value })
          }
        />
        {fieldErrors.Email && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Email}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block text-gray-700 font-medium mb-1">RFC</label>
        <input
          type="text"
          placeholder="RFC"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
            fieldErrors.Rfc
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          value={ownerData.Rfc}
          onChange={(e) => setOwnerData({ ...ownerData, Rfc: e.target.value })}
        />
        {fieldErrors.Rfc && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Rfc}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block text-gray-700 font-medium mb-1">
          Certificado Fiscal
        </label>
        <input
          type="file"
          className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
            fieldErrors.Certificado
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
          onChange={(e) =>
            setOwnerData({
              ...ownerData,
              Certificado: e.target.files?.[0] || null,
            })
          }
        />
        {ownerData.Certificado && (
          <p className="text-sm text-gray-500 mt-1">
            Archivo seleccionado: {ownerData.Certificado.name}
          </p>
        )}
        {fieldErrors.Certificado && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.Certificado}</p>
        )}
      </div>

      
      {errors && <p className="text-red-600 text-center sm:col-span-2">{errors}</p>}

      
      <div className="flex justify-end pt-4 sm:col-span-2">
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Siguiente
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default StepOwner;

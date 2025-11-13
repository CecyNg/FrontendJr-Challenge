import { useState } from "react";
import type { AccountData } from "../types/types";

type StepAccountProps = {
    accountData: AccountData;
    setAccountData: React.Dispatch<React.SetStateAction<AccountData>>;
    onNext: () => void;
    onBack: () => void;
};

function StepAccount({ accountData, setAccountData, onNext, onBack }: StepAccountProps) {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleNext = () => {
        const newErrors: { [key: string]: string } = {};
        if (!accountData.Email.trim()) newErrors.Email = "El correo es obligatorio";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountData.Email))
        newErrors.Email = "Formato de correo inválido";
        if (!accountData.Contrasena.trim()) newErrors.Contrasena = "Campo obligatorio";
        if (accountData.ConfirmarContrasena !== accountData.Contrasena)
        newErrors.ConfirmarContrasena = "Las contraseñas no coinciden";


        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) onNext(); };

  return (
    <>
        <div className="flex justify-center items-center min-h-screen bg-gray-50">  
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Acceso a la Cuenta
                </h2>

                <form className="space-y-4">
                     <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.Email ? 'border-red-500' : ''}`}
                            value={accountData.Email}
                            onChange={(e) => setAccountData({ ...accountData, Email: e.target.value })}
                            />
                            {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email}</p>}
                      </div>

                     <div>
                        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                         <input
                            type="password"
                            placeholder="Contraseña"
                            value={accountData.Contrasena}
                            onChange={(e) => setAccountData({ ...accountData, Contrasena: e.target.value })}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                                errors.Contrasena ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                            }`}
                            autoComplete="new-password"
                            />
                            {errors.Contrasena && <p className="text-red-500 text-sm mt-1">{errors.Contrasena}</p>}
                    </div>

                     <div>
                        <label className="block text-gray-700 font-medium mb-1">Confirmar Contraseña</label>
                         <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={accountData.ConfirmarContrasena}
                            onChange={(e) => setAccountData({ ...accountData, ConfirmarContrasena: e.target.value })}
                            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                                errors.ConfirmarContrasena ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                            }`}
                            autoComplete="new-password"
                            />
                            {errors.ConfirmarContrasena && (
                            <p className="text-red-500 text-sm mt-1">{errors.ConfirmarContrasena}</p>
                            )}
                    </div>

                     <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
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
                            Finalizar
                        </button>
                    </div>

                 </form>
            </div>
        </div>      
       

    </>
  )
}

export default StepAccount;
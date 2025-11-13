import  { useState } from 'react';
import './App.css'
import './index.css'
import type { AccountData, BusinessData, OwnerData } from './types/types';
import StepOwner from './components/StepOwner';
import StepBusiness from './components/StepBusiness';
import StepAccount from './components/StepAccount';
import StepSummary from './components/StepSummary';
import { motion } from "framer-motion";



function App() {

  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => setCurrentStep((prev) => prev + 1);
  const goBack = () => setCurrentStep((prev) => prev - 1);
  

  const [ownerData, setOwnerData] = useState<OwnerData>({
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Email: '',
    Rfc: '',
    Certificado: null,
  });

  const [businessData, setBusinessData] = useState<BusinessData>({
    NombreComercial: '',
    NombreEmpresa: '',
    Email: '',
    Telefono: '',
    Ciudad: '',
    Estado: '',
    CodigoPostal: '',
    Sector: '',
    Logotipo: null,
  });

  const [accountData, setAccountData] = useState<AccountData>({
    Email: '',
    Contrasena: '',
    ConfirmarContrasena: '',
  });

  

  
  return (
    <>
    <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>

       {currentStep === 1 && (
        <StepOwner ownerData={ownerData} setOwnerData={setOwnerData}  onNext={goNext} />
      )}

      {currentStep === 2 && (
        <StepBusiness businessData={businessData} setBusinessData={setBusinessData} onNext={goNext} onBack={goBack}
        />
      )}

      {currentStep === 3 && (
        <StepAccount accountData={accountData} setAccountData={setAccountData} onNext={goNext} onBack={goBack}
        />
      )}

      {currentStep === 4 && (
        <StepSummary ownerData={ownerData} businessData={businessData} accountData={accountData} onBack={goBack} 
        />
      )}
    </motion.div>
     
    </>
  );
}

export default App

"use client"
import Setup from "@/components/portfolio-manager/fund/investmentVehicle-multistep/Setup";


const SetupInvestmentVehicle = () => {

  return (
    <div >
       <Setup/>
    </div>
    
  );
};

export default SetupInvestmentVehicle


 {/* <div>
         <BackButton
           id="createFundBackButton" 
           handleClick={handleBack}
           iconRight={true}
           text='Back'
           textColor='' 
         />
        </div>
        <div className="md:flex ">
     <div><MultiStep steps={steps} currentStep={currentStep} completedSteps={completedSteps}/></div> 
      
      <div className="w-full mt-4 md:mt-0">
        {currentStep === 'setup' && (
          <Setup 
        //    onNext={handleNext} 
        //    onBack={handleBack}
           />
        )}
        {currentStep === 'status' && (
          <Status 
        //   onNext={handleNext} 
        //   onBack={handleBack} 
          />
        )}
         {currentStep === 'visibility' && (
          <ChooseVisibility
           onNext={handleNext} 
           onBack={handleBackStep} 
          />
        )}
      </div>
    </div> */}


    //   const [currentStep, setCurrentStep] = useState<string>('setup');
  //   const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  //   const vehicleType = useAppSelector(state => (state.vehicle.vehicleType))
  //   const router = useRouter();
    
  //   const steps = [
  //     { id: 'setup', title: 'Setup' },
  //     { id: 'status', title: 'Status' },
  //     { id: 'visibility', title: 'Visibility' },
      
  //   ];
  
  //   const handleNext = () => {
  //     // Mark current step as completed
  //     if (!completedSteps.includes(currentStep)) {
  //       setCompletedSteps([...completedSteps, currentStep]);
  //     }
      
  //     // Move to next step
  //     const currentIndex = steps.findIndex(step => step.id === currentStep);
  //     if (currentIndex < steps.length - 1) {
  //       setCurrentStep(steps[currentIndex + 1].id);
  //     }
  //   };
  // const handleBackStep = () => {
  //   const currentIndex = steps.findIndex(step => step.id === currentStep);
  //   if (currentIndex > 0) {
  //     setCurrentStep(steps[currentIndex - 1].id);
  //   }
  // };

  //  const handleBack=()=> {
  //   if(vehicleType === "commercialFund"){
  //       router.push("/vehicle/commercial-vehicle")
  //   }else {
  //       router.push("/vehicle/endownment-vehicle")
  //   }
  //  }

  // className='md:px-10 px-4  py-4 grid grid-cols-1 gap-y-10'
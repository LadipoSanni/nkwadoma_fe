
import React from 'react';
import "./multiStep.css"

interface Step {
  id: string;
  title: string;
}

interface MultiStepProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
}

const MultiStep: React.FC<MultiStepProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="step-navigation px-3 md:w-[28vh] rounded-lg">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = step.id === currentStep;
        const isFuture = !isCompleted && !isActive;
        
        return (
          <div  key={step.id} className='relative top-3'>
          <div 
            key={step.id}
            className={`
              step-item 
              ${isActive ? 'active' : ''}
              ${isCompleted ? 'completed' : ''}
              ${isFuture ? 'disabled' : ''}
            `}
          >
            <div className="step-indicator ">
              <div className={`${isActive? "step-circle-solid" : "step-circle"}`}></div>
              {index < steps.length - 1 && (
                <div className={`${isActive? "step-connector-disable" : "step-connector"}`}></div>
              )}
            </div>
            <div className="step-title">{step.title}</div>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiStep;
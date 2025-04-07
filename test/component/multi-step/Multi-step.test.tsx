import { cleanup,fireEvent, screen, render} from "@testing-library/react";
import MultiStep from "@/reuseable/multiStep-component";


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));

  
     describe("Notification Layout", () => {
        const mockSteps = [
            { id: 'setup', title: 'Setup' },
            { id: 'status', title: 'Status' },
            { id: 'visibility', title: 'Visibility' },
          ];
        
     
         beforeEach(() => {
             jest.clearAllMocks();
               cleanup();
             
               jest.spyOn(console, 'log').mockReturnValue();
               jest.spyOn(console, 'warn').mockReturnValue();
               jest.spyOn(console, 'error').mockReturnValue();
           }) 

           test('renders all steps correctly', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="setup" 
                completedSteps={[]} 
              />
            );
            
            expect(screen.getByText('Setup')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();
            expect(screen.getByText('Visibility')).toBeInTheDocument();
          });
        
          test('marks current step as active', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="status" 
                completedSteps={['setup']} 
              />
            );
        
            const statusItem = screen.getByText('Status').closest('.step-item');
            expect(statusItem).toHaveClass('active');
            expect(statusItem).not.toHaveClass('completed');
          });

          test('marks previous steps as completed', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="status" 
                completedSteps={['setup']} 
              />
            );
        
            const setupItem = screen.getByText('Setup').closest('.step-item');
            expect(setupItem).toHaveClass('completed');
          });
  
          test('marks future steps as disabled', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="setup" 
                completedSteps={[]} 
              />
            );
        
            const visibilityItem = screen.getByText('Visibility').closest('.step-item');
            expect(visibilityItem).toHaveClass('disabled');
          });

          test('renders connectors between steps', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="setup" 
                completedSteps={[]} 
              />
            );
        
            const connectors = document.querySelectorAll('.step-connector');
            expect(connectors).toHaveLength(1);
          });

          test('applies special styling for active last step', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="visibility" 
                completedSteps={['setup', 'status']} 
              />
            );
        
            const visibilityCircle = screen.getByText('Visibility')
              .closest('.step-item')
              ?.querySelector('.step-indicator > div');
            
            expect(visibilityCircle).toHaveClass('step-circle-solid');
          });

          test('does not apply special styling for non-last active steps', () => {
            render(
              <MultiStep 
                steps={mockSteps} 
                currentStep="status" 
                completedSteps={['setup']} 
              />
            );
        
            const statusCircle = screen.getByText('Status')
              .closest('.step-item')
              ?.querySelector('.step-indicator > div');
            
           
            expect(statusCircle).toHaveClass('step-circle-solid');
            expect(statusCircle).not.toHaveClass('step-circle-solid-completed');
          });

          test('handles empty steps array gracefully', () => {
            render(
              <MultiStep 
                steps={[]} 
                currentStep="" 
                completedSteps={[]} 
              />
            );
            
            expect(screen.queryByText('Setup')).not.toBeInTheDocument();
          });


        
        
    })

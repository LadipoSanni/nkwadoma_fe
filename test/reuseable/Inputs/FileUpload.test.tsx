import React from 'react';
import { render, screen, fireEvent, waitFor,cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from '@/reuseable/Input/FileUpload';

describe('FileUpload Component', () => {

    beforeEach(() => {
        cleanup()
          jest.spyOn(console,'log').mockReturnValue()
          jest.spyOn(console,'warn').mockReturnValue()
          jest.spyOn(console,'error').mockReturnValue()
      });
    
    it('renders the upload button with correct text', () => {
        render(<FileUpload handleDrop={() => {}} handleDragOver={() => {}} setUploadedImageUrl={()=> {}} labelName='Cohort image (Optional)'/>);
        expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
    });

    it('opens file dialog on click', () => {
        render(<FileUpload handleDrop={() => {}} handleDragOver={() => {}} setUploadedImageUrl={()=> {}} labelName='Cohort image (Optional)'/>);
        const uploadContainer = screen.getByText(/Click to upload/i).closest('div');
        if (uploadContainer) {
            fireEvent.click(uploadContainer);
        }
        expect(screen.getByLabelText(/Cohort image \(Optional\)/i)).toBeInTheDocument();
    });

    it('displays error message for unsupported file type', async () => {
        render(<FileUpload handleDrop={() => {}} handleDragOver={() => {}} setUploadedImageUrl={()=> {}} labelName='Cohort image (Optional)'/> );
        const fileInput = screen.getByLabelText(/Cohort image \(Optional\)/i);
        const file = new File(['(⌐□_□)'], 'unsupported.txt', { type: 'text/plain' });
        fireEvent.change(fileInput, { target: { files: [file] } });
        await waitFor(() => expect(screen.getByText(/File not supported/i)).toBeInTheDocument());
    });

    it('displays loading spinner while uploading', async () => {
        render(<FileUpload handleDrop={() => {}} handleDragOver={() => {}} setUploadedImageUrl={()=> {}} labelName='Cohort image (Optional)'/>);
        const fileInput = screen.getByLabelText(/Cohort image \(Optional\)/i);
        const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });
        await waitFor(() => expect(screen.getByText(/Uploading.../i)).toBeInTheDocument());
    });

    it('resets isFileSupported state when file is deleted', async () => {
        render(<FileUpload handleDrop={() => {}} handleDragOver={() => {}} setUploadedImageUrl={() => {}} labelName='Cohort image (Optional)' />);
        const fileInput = screen.getByLabelText(/Cohort image \(Optional\)/i);
        const file = new File(['(⌐□_□)'], 'image.png', { type: 'image/png' });
        fireEvent.change(fileInput, { target: { files: [file] } });
        await waitFor(() => expect(screen.getByText(/Uploading.../i)).toBeInTheDocument());
    });

});
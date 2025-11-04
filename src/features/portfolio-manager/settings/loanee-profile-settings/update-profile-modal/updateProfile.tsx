import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (updatedData: {
    education: string;
    stateOfResidence: string;
  }) => void;
  currentData: {
    education: string;
    stateOfResidence: string;
  };
}

const UpdateLoaneeProfile = ({
  isOpen,
  onClose,
  onUpdateSuccess,
  currentData
}: UpdateModalProps) => {
  const [education, setEducation] = useState("");
  const [residence, setResidence] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const payload = { education: education, stateOfResidence: residence };

  useEffect(() => {
    if (isOpen && currentData) {
      setEducation(currentData.education || "");
      setResidence(currentData.stateOfResidence || "");
    }
    setError(null);
  }, [isOpen, currentData]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      onUpdateSuccess(payload);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Update failed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed w-auto inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
      aria-labelledby='modal-title'
    >
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-md p-6'
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
      >
        <div className='flex justify-between items-center mb-4'>
          <h3 id='modal-title' className='text-xl font-semibold'>
            Update profile
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
            aria-label='Close modal'
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleUpdate}>
          <div className='mb-4'>
            <label
              htmlFor='residence'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              State of residence
            </label>
            <input
              type='text'
              id='residence'
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              placeholder='Enter state of residence'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              disabled={isUpdating}
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='education'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Highest level of education
            </label>
            <input
              type='text'
              id='education'
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder='Enter level of education'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              disabled={isUpdating}
            />
          </div>

          {error && (
            <div data-testid="error-message" className='my-3 text-center text-sm text-red-600'>{error}</div>
          )}

          <div className='flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isUpdating}
              className='px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isUpdating}
              className='px-4 py-2 bg-[#142854] rounded-md text-sm font-medium text-white'
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLoaneeProfile;

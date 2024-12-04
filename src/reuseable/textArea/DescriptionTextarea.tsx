import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DescriptionTextareaProps {
    description: string;
    setDescription: (description: string) => void;
    maximumDescription?: number;
}

const DescriptionTextarea: React.FC<DescriptionTextareaProps> = ({ description, setDescription,maximumDescription }) => {
     
      return (
     
    <div id="descriptionContainer">
        <Label htmlFor="description" className="block text-sm font-medium text-labelBlue">Description</Label>
        <Textarea
            id="description"
            name="description"
            placeholder="Enter description"
            className={'resize-none placeholder:text-grey250 focus-visible:outline-0 ring-transparent focus-visible:ring-transparent'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={maximumDescription}
        />
    </div>
      )
};

export default DescriptionTextarea;
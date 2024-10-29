import { Formik } from 'formik'
import React from 'react'
// import * as Yup from 'yup';
// import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'; 


export const initialFormValue = {
        cohortName: 'Luminary',
        startDate: '2023-12-13',
        endDate: '2024-12-13',
        cohortDescription:
          'Luminary is a dynamic cohort of visionary thinkers and creators, pursuing excellence in product design.',
        cohortImage: 'https://www.thoughtco.com/thmb/gvFwQROKdUKVqquJ7a1t79S1qC4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-10194740-58b885703df78c353cbe18bc.jpg',
    

}


const EditProgramForm = () => {
    const handleSubmit = () => {

    }
  return (
    <div>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        >

        </Formik>
    </div>
  )
}

export default EditProgramForm
import React, { useEffect,useState} from "react";
import { Label } from "@/components/ui/label";
import { Formik, Form,  ErrorMessage,FormikProps } from "formik";
import * as Yup from "yup";
import CustomSelectObj from "@/reuseable/Input/Custom-select-obj";
import Isloading from "@/reuseable/display/Isloading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {store} from "@/redux/store";
import {useAppSelector} from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/vehicle-multiselect';
import { useCreateInvestmentVehicleStatusMutation } from "@/service/admin/fund_query";
import { useToast } from "@/hooks/use-toast";
import { setPublicVehicleUrl,setInvestmentStatus } from "@/redux/slice/vehicle/vehicle";

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}



type SelectOption = {
  value: string | number;
  label: string;
};

interface Props {
  selectStatus?: Array<SelectOption>;
  selectState?: Array<SelectOption>;
  isStateRequired?: boolean;
  readonly?: boolean;
  onStatusChange?: (status: string) => void;
  initialStatus?: string; 
}

function StatusReusable({
  selectStatus,
  selectState,
  isStateRequired,
  readonly,
  onStatusChange,
  initialStatus = "", 
}: Props) {
  // const isLoading = false;
  const router = useRouter();
  const completedStep = useAppSelector(state => (state?.vehicleMultistep?.completedSteps))
  const draftId = useAppSelector(state => (state?.vehicle?.setDraftId))
  const [isError, setError] = useState("");
  const formikRef = React.useRef<FormikProps<typeof initialFormValue>>(null);
  const [setVehicleStatus,{isLoading}] = useCreateInvestmentVehicleStatusMutation();
  const { toast } = useToast();
  const savedstatus = useAppSelector(state => (state?.vehicle?.setInvestmentStatus))

  const initialFormValue = {
    investmentVehicleId: '',
    status: savedstatus?.status || initialStatus || "",
    state: savedstatus?.state || "",
  };

  const saveToRedux = (values: typeof initialFormValue) => {
    const investmentVehicleStatus = {
       state: values.state,
       status: values.status
    }
    store.dispatch(setInvestmentStatus(investmentVehicleStatus))
  }

   useEffect(()=> {
     if(!completedStep.includes("setup")){
      router.push('/vehicle/setup');
     }
   },[completedStep, router])

   useEffect(() => {
    if (formikRef.current && !isStateRequired) {
      formikRef.current.setFieldTouched("state", false, false);
      formikRef.current.validateForm();
    }
  }, [isStateRequired]);

  const validationSchema = React.useMemo(
    () =>
      Yup.object().shape({
        status: Yup.string().required("Status is required"),
        state: isStateRequired
          ? Yup.string().required("State is required")
          : Yup.string().notRequired(),
      }),
    [isStateRequired]
  );

  async function  handleSubmit(values: typeof initialFormValue)  {
    const formData: {
      investmentVehicleId: string;
      fundRaising?: string;
      deployingStatus?: string;
    } = {
      investmentVehicleId: draftId
    };
  
    if (values.status === "fundRaising") {
      formData.fundRaising = values.state;
    } else if (values.status === "deployingStatus") {
      formData.deployingStatus = values.state;
    }
  
    try {
      const create = await setVehicleStatus(formData).unwrap()
      if(create){
        const urlLink = create?.data?.investmentVehicleLink
        store.dispatch(setPublicVehicleUrl(urlLink))
        saveToRedux(values)
        toast({
          description: create.message,
          status: "success",
        });
        store.dispatch(markStepCompleted("setup"))
        router.push("/vehicle/visibility");
      }
      
    } catch (err) {
      const error = err as ApiError;
       setError(error?.data?.message);
    }

  }

  const handleBack = () => {
    
    router.push("/vehicle/setup");
  };

  return (
    <div className="md:pr-8">
      <Formik
        innerRef={formikRef}
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ errors, isValid, touched, setFieldValue, values}) => {
         
          return (
            <Form id="reusableForm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <CustomSelectObj
                    triggerId="statusTypeTriggerId"
                    id="status"
                    value={values.status}
                    onChange={(value) => {
                      setFieldValue("status", value);
                      onStatusChange?.(value);
                    }}
                    name="status"
                    placeHolder="Select status" 
                    selectContent={selectStatus}
                  />
                  {errors.status && touched.status && (
                    <div>
                      <ErrorMessage
                        name="status"
                        component="div"
                        id="statusError"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <CustomSelectObj
                    triggerId="stateTypeTriggerId"
                    id="state"
                    value={values.state}
                    onChange={(value) => setFieldValue("state", value)}
                    name="state"
                    placeHolder="Select state"
                    selectContent={selectState}
                    readonly={readonly}
                  />
                  {errors.state && touched.state && (
                    <div>
                      <ErrorMessage
                        name="state"
                        component="div"
                        id="stateError"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="md:flex justify-between w-full mt-3">
                <Button
                  id="saveInvestment"
                  variant={"outline"}
                  type="button"
                  className="w-full md:w-24 h-[46px] mb-4 border-solid border-[#142854] text-[#142854]"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <button
                  id="submitInvestment"
                  className={`w-full md:w-40 h-[46px] rounded-md ${
                    !isValid
                      ? "bg-neutral650 cursor-auto text-white hover:bg-neutral650"
                      : "hover:bg-meedlBlue bg-meedlBlue text-white cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoading ? <Isloading /> : "Save & Continue"}
                </button>
              </div>
              <p
              className={`text-error500 flex justify-center items-center ${
                isError ? "mb-3" : ""
              }`}
            >
              {isError}
            </p>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default StatusReusable;
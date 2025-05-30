"use client"
import React, {useState} from "react";
import {useGetLoanProductDetailsByIdQuery} from "@/service/admin/loan_product";
import {formatAmount} from "@/utils/Format";
import {MdOutlineInventory2} from "react-icons/md";
import SkeletonForDetailPage from "@/reuseable/Skeleton-loading-state/Skeleton-for-detailPage";
import {useAppSelector} from "@/redux/store";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import InfoCard from "@/reuseable/details/InfoCard";
import {inter} from "@/app/fonts";


const Details = () => {

    // const loanProductId = sessionStorage.getItem("LoanProductId") ?? undefined;
    const loanProductId = useAppSelector(state => (state.selectedLoan.clickedLoanProductId))

    const [isVerifying, setIsVerifying] = useState(false);
    const [docError, setDocError] = useState<string | null>(null);
    const [document, setDocument] = useState("")

    const {data: loanProduct, isLoading: loading} = useGetLoanProductDetailsByIdQuery({loanProductId: loanProductId})


    const dataList = [
        {name: "Fund product", value: loanProduct?.data.investmentVehicleName || 'N/A'},
        {name: "Product sponsor", value: loanProduct?.data.sponsor || 'N/A'},
        {name: "Product size ", value: formatAmount(loanProduct?.data.loanProductSize) || '0'},
        {name: 'Tenor', value: `${loanProduct?.data?.tenor} ${loanProduct?.data?.tenor <= 1 ? 'month' : 'months'}`},
        // { label: "Tenor", value: loanProduct?.data.tenor + " months" },
        {name: "Minimum repayment amount", value: formatAmount(loanProduct?.data.minRepaymentAmount)},
        {name: "Interest rate", value: `${loanProduct?.data.interestRate || 0}%`},
        {name: "Obligor limit", value: formatAmount(loanProduct?.data.obligorLoanLimit)},
        {name: "Moratorium", value: `${loanProduct?.data.moratorium} ${loanProduct?.data?.moratorium <= 1 ? "month" : "months" }`},
        {name: "Amount disbursed", value: formatAmount(loanProduct?.data.totalAmountDisbursed) || 0},
        {name: "Amount repaid ", value: formatAmount(loanProduct?.data.totalAmountRepaid) || 0},
        {name: "Amount earned", value: formatAmount(loanProduct?.data.totalAmountEarned) || 0},
        {name: "Cost of vehicle", value: loanProduct?.data.costOfFund + "%" || "0%"},
    ];

    const getFilenameFromUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname.split('/').pop();
        } catch {
            return url?.split('/').pop() || 'No file available';
        }
    };

    const verifyDocumentExists = async (url: string): Promise<boolean> => {
        if (url.includes('cloudinary.com')) {
            return url.toLowerCase().endsWith('.pdf') ||
                url.toLowerCase().endsWith('.docx');
        }

        try {
            const response = await fetch(url, {method: 'HEAD'});
            const contentType = response.headers.get('content-type') || '';
            return response.ok && (
                contentType.includes('application/pdf') ||
                contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            );
        } catch {
            return false;
        }
    };

    const docUrl = loanProduct?.data?.mandate;
    const docFilename = getFilenameFromUrl(docUrl);
    const isCloudinaryUrl = docUrl?.includes('cloudinary.com');
    const fileExtension = docFilename?.split('.').pop()?.toLowerCase();

    const handleViewDocument = async () => {
        if (!docUrl) return;

        setIsVerifying(true);
        setDocError(null);
        setDocError("")
        try {
            if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
                setDocError('Invalid document format');
                setDocument("Mandate")
                return;
            }

            if (!isCloudinaryUrl) {
                const docExists = await verifyDocumentExists(docUrl);
                if (!docExists) {
                    setDocError('Document not found');
                    setDocument("Mandate")
                    return;
                }
            }

            window.open(docUrl, '_blank', 'noopener,noreferrer');
        } catch (error) {
            setDocError('Error opening document');
            console.error('Document open error:', error);
        } finally {
            setIsVerifying(false);
        }
    };

    const terms_condition = loanProduct?.data?.termsAndCondition;
    const terms_conditionFile = getFilenameFromUrl(terms_condition);
    const isCloudinaryUrlFile = terms_condition?.includes('cloudinary.com');
    const extension = terms_conditionFile?.split('.').pop()?.toLowerCase();
    

    const handleView = async () => {
        if (!terms_condition) return;

        setIsVerifying(true);
        setDocError(null);
        setDocument("")
        try {
            if (extension !== 'pdf' && extension !== 'docx') {
                setDocError('Invalid document format');
                setDocument("TermsAndCondition")
                return;
            }

            if (isCloudinaryUrlFile) {
                const docExists = await verifyDocumentExists(terms_condition);
                if (!docExists) {
                    setDocError('Document not found');
                    setDocument("TermsAndCondition")
                    return;
                }
            }

            window.open(terms_condition, '_blank', 'noopener,noreferrer');
        } catch (error) {
            setDocError('Error opening document');
            console.error('Document open error:', error);
        } finally {
            setIsVerifying(false);
        }
    };


    const getTruncatedFilename = (filename: string, maxBaseLength: number) => {
        const lastDot = filename.lastIndexOf('.');
        const ext = lastDot !== -1 ? filename.slice(lastDot) : '';
        const base = lastDot !== -1 ? filename.slice(0, lastDot) : filename;

        if (base.length > maxBaseLength) {
            return `${base.slice(0, maxBaseLength)}...${ext}`;
        }
        return filename;
    };

    const smallScreenFilename = getTruncatedFilename(docFilename || 'No Document', 10)
    const largeScreenFilename = getTruncatedFilename(docFilename || 'No Document', 25);

    const fileOnSmallScreen = getTruncatedFilename(terms_conditionFile || 'No Document', 10)
    const fileOnLargeScreen = getTruncatedFilename(terms_conditionFile || 'No Document', 25)
   

    return (
        <>{
              loading ? (
                  <SkeletonForDetailPage/>
              ) : (
                  <div className={`py-2 flex md:flex-row flex-col md:justify-between`} id={`sections`}>
                      <div id={`firstSection`} className={`w-full md:w-2/5 md:h-[70vh] md:max-h-none`}>
                             <InfoCard
                                 icon={MdOutlineInventory2}
                                 fundTitle={loanProduct?.data.name}
                                 description={""}
                             />
                          <div className='py-2 md:max-w-72 lg:max-w-[29vw] rounded-md grid grid-cols-1 gap-6'>
                              <div>
                                  <p className={'text-meedlBlack text-[14px] font-medium'}>Mandate</p>
                                  <div className="bg-[#F9F9F9] flex justify-between px-3 py-4 mt-5 rounded-lg items-center flex-wrap">
                                      <div className="flex gap-2 items-center max-w-[70%]">
                                          <Image
                                              src={"/MyMandateLogo.png"}
                                              alt="image"
                                              width={25}
                                              height={25}
                                              priority
                                              style={{ width: "auto", height: "auto" }}
                                          />
                                          <p
                                              className="text-[14px] items-center flex max-w-[150px] truncate lg:hidden"
                                              title={docFilename}
                                          >
                                              {smallScreenFilename}
                                          </p>

                                          <p className="text-[14px] items-center hidden lg:flex">
                                              {largeScreenFilename}
                                          </p>
                                      </div>

                                      <div className={`flex justify-center items-center`}>
                                          <Button
                                              id="view-document"
                                              type="button"
                                              variant={"default"}
                                              onClick={handleViewDocument}
                                              className="text-meedlBlue border-[1px] border-meedlBlue rounded-[20px] font-semibold text-[12px] md:px-4 px-3 py-2"
                                              disabled={!docUrl || isVerifying}
                                              aria-label={`View ${docFilename}`}
                                          >
                                              {isVerifying ? "Verifying..." : docUrl ? "View" : "No Document"}
                                          </Button>
                                      </div>
                                  </div>
                                  {docError && document === "Mandate" && (
                                      <p className='text-red-500 text-xs mt-1 mb-3'>{docError}</p>
                                  )}
                              </div>

                              <div>
                                  <p className={'text-meedlBlack text-[14px] font-medium'}>Terms and conditions</p>
                                  <div className="bg-[#F9F9F9] flex justify-between px-3 py-4 mt-5 rounded-lg items-center flex-wrap">
                                      <div className="flex gap-2 items-center max-w-[70%]">
                                          <Image
                                              src={"/MyMandateLogo.png"}
                                              alt="image"
                                              width={25}
                                              height={25}
                                              priority
                                              style={{ width: "auto", height: "auto" }}
                                          />
                                          <p
                                              className="text-[14px] items-center flex max-w-[150px] truncate sm:hidden"
                                              title={docFilename}
                                          >
                                              {fileOnSmallScreen}
                                          </p>

                                          <p className="text-[14px] items-center hidden sm:flex">
                                              {fileOnLargeScreen}
                                          </p>
                                      </div>

                                      <div className={`flex justify-center items-center`}>
                                          <Button
                                              id="view-document"
                                              type="button"
                                              variant={"default"}
                                              onClick={handleView}
                                              className="text-meedlBlue border-[1px] border-meedlBlue rounded-[20px] font-semibold text-[12px] md:px-4 px-3 py-2"
                                              disabled={!docUrl || isVerifying}
                                              aria-label={`View ${docFilename}`}
                                          >
                                              {isVerifying ? "Verifying..." : docUrl ? "View" : "No Document"}
                                          </Button>
                                      </div>
                                  </div>
                                  {docError && document === "TermsAndCondition" && (
                                      <p className='text-red-500 text-xs mt-1 mb-3'>{docError}</p>
                                  )}
                              </div>
                          </div>

                      </div>
                      <div className={`w-full md:w-1/2 md:pt-0`} id={`secondSection`}>
                          <div className={`border border-solid flex w-full gap-5 px-4 py-5 rounded-md text-[14px] flex-col`}>
                              <div><p className={`flex justify-start font-semibold text-meedlBlack text-[18px]`}>Details</p></div>
                              <div className='bg-[#F9F9F9] min-h-[45vh] md:max-h-[60vh] px-5 w-full overflow-x-hidden md:overflow-y-auto rounded-sm'>
                                  {
                                      dataList && dataList.map((data,index) => (
                                          <div key={index} className={`flex md:flex-row py-5 flex-col w-full justify-between font-medium text-sm  ${inter.className}`}>
                                              <p className='  text-black300 mb-3 md:mb-0'>{data.name}</p>
                                              <div className=' text-meedlBlack'>{data.value}</div>
                                          </div>
                                      ))
                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              )
        }
        </>
    );
}

export default Details;
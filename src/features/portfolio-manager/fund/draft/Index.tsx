"use client"
import React, {useEffect, useRef, useState} from "react";
import {inter} from "@/app/fonts";
import UpdateDraftButton from "@/reuseable/buttons/UpdateDraftButton";
import {useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery} from "@/service/admin/fund_query";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {clearSaveClickedDraft, setSaveClickedDraft} from "@/redux/slice/vehicle/vehicle";
import SkeletonForLoanOrg from "@/reuseable/Skeleton-loading-state/Skeleton-for-loan-organizations";
import UpdateDraft from "@/features/portfolio-manager/fund/draft/UpdateDraft";
import { MdOutlineArticle } from "react-icons/md";
import LoanEmptyState from "@/reuseable/emptyStates/Index";
import InfiniteScroll from "react-infinite-scroll-component";

interface SaveToDraftProps {
    setIsOpen?: (b: boolean) => void;
    investmentVehicleType: string;
    type?: string;
}

export interface Draft {
    id: string;
    name: string;
    investmentVehicleType: string | undefined;
    mandate: string;
    sponsors: string;
    tenure: number | string;
    size: number | string;
    rate: number | string;
    trustee: string;
    custodian: string;
    bankPartner: string;
    fundManager: string;
    minimumInvestmentAmount: number | string;
    status: string;
    startDate: string;
    lastUpdatedDate?: string;
}

export const handleClick = (
    draft: Draft,
    selectedDraft: Draft | null,
    setSelectedDraft: (draft: Draft | null) => void,
    setDisabled: (disabled: boolean) => void,
    dispatch: AppDispatch
) => {
    if (draft.id === selectedDraft?.id) {
        setSelectedDraft(null);
        setDisabled(true);
        dispatch(clearSaveClickedDraft());
    } else {
        setSelectedDraft(draft);
        setDisabled(false);
        dispatch(setSaveClickedDraft(draft));
    }
};

export const handleContinueButton = (setStep: (step: number) => void) => {
    setStep(2);
};

export const handleSaveAndBackToAllDraft = (
    setStep: (step: number) => void,
    setSelectedDraft: (draft: Draft | null) => void,
    setDisabled: (disabled: boolean) => void
) => {
    setStep(1);
    setSelectedDraft(null);
    setDisabled(true);
};

const Draft = ({investmentVehicleType, type, setIsOpen}: SaveToDraftProps) => {
    const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState(1);
    const [pageNumber, setPageNumber] = useState(0);
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const draftRefs = useRef<(HTMLDivElement | null)[]>([]);

    const dispatch = useDispatch();

    const { data, isLoading, isFetching, refetch } = useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery(
        {
            pageSize: 10,
            pageNumber,
            investmentVehicleType,
            investmentVehicleStatus: "DRAFT",
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (data?.data?.body) {
            setDrafts((prevDrafts) => {
                if (pageNumber === 0) {
                    return data.data.body;
                }
                const newDrafts = data.data.body.filter(
                    (newDraft: Draft) => !prevDrafts.some((prevDraft) => prevDraft.id === newDraft.id)
                );
                return [...prevDrafts, ...newDrafts];
            });
            setHasMore(data.data.hasNextPage);
        }
    }, [data, pageNumber]);

    useEffect(() => {
        if (step === 1) {
            refetch();
            setPageNumber(0);
        }
    }, [step, refetch]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" && selectedDraft && step === 1) {
                handleContinueButton(setStep);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedDraft, step]);

    useEffect(() => {
        const handleKeyUp = (event: KeyboardEvent) => {
            if (step !== 1 || drafts.length === 0) return;

            const currentIndex = selectedDraft ? drafts.findIndex((d) => d.id === selectedDraft.id) : -1;

            if (event.key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = currentIndex < drafts.length - 1 ? currentIndex + 1 : 0;
                const nextDraft = drafts[nextIndex];
                handleClick(nextDraft, selectedDraft, setSelectedDraft, setDisabled, dispatch);
                draftRefs.current[nextIndex]?.focus();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : drafts.length - 1;
                const prevDraft = drafts[prevIndex];
                handleClick(prevDraft, selectedDraft, setSelectedDraft, setDisabled, dispatch);
                draftRefs.current[prevIndex]?.focus();
            }
        };

        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [drafts, selectedDraft, step, dispatch]);

    const loadMore = () => {
        if (!isFetching && hasMore) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className={`${inter.className}`}>
            {step === 1 ? (
                <div className="w-full">
                    <InfiniteScroll
                        dataLength={drafts.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={isFetching ? <SkeletonForLoanOrg /> : null}
                        height="56.5vh"
                        className={`px-2 space-y-3`}
                    >
                        {isLoading && drafts.length === 0 ? (
                            <SkeletonForLoanOrg />
                        ) : drafts.length === 0 ? (
                            <div className="flex justify-center items-center pt-20">
                                <LoanEmptyState
                                    id="LoanRequestEmptyState"
                                    icon={<MdOutlineArticle className="w-10 h-10" color="#142854" />}
                                    iconBg="#D9EAFF"
                                    title="Drafts will show here"
                                    description="There are no drafts available yet"
                                />
                            </div>
                        ) : (
                            drafts.map((draft: Draft, index) => (
                                <div
                                    key={draft.id}
                                    ref={(el) => (draftRefs.current[index] = el)}
                                    tabIndex={0}
                                    className={`${inter.className} p-4 border rounded-lg cursor-pointer transition outline-none ${
                                        selectedDraft?.id === draft.id ? "bg-[#F9F9F9] border-[#142854]" : ""
                                    }`}
                                    onClick={() =>
                                        handleClick(draft, selectedDraft, setSelectedDraft, setDisabled, dispatch)
                                    }
                                >
                                    <h3
                                        className={`${inter.className} font-medium text-sm leading-5 text-meedlBlack capitalize`}
                                    >
                                        {draft.name}
                                    </h3>
                                    <p className={`${inter.className} font-medium text-sm leading-5 text-[#999999]`}>
                                        Last updated on {draft.lastUpdatedDate || ""}
                                    </p>
                                </div>
                            ))
                        )}
                    </InfiniteScroll>

                    <div className="md:flex md:justify-end py-4 w-full">
                        <UpdateDraftButton
                            disable={disabled}
                            backgroundColor="#142854"
                            textColor="white"
                            id="continueButton"
                            height="3.4rem"
                            width={''}
                            data-testid="continueButtonModal"
                            buttonText="Continue"
                            handleClick={() => handleContinueButton(setStep)}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <UpdateDraft
                        handleSaveAndBackToAllDraft={() =>
                            handleSaveAndBackToAllDraft(setStep, setSelectedDraft, setDisabled)
                        }
                        investmentVehicleType={investmentVehicleType}
                        type={type}
                        setIsOpen={setIsOpen}
                    />
                </div>
            )}
        </div>
    );
};

export default Draft;
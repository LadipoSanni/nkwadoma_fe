"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { inter } from '@/app/fonts';
import {BiArrowBack} from "react-icons/bi";

type Tab = {
  name: string;
  value: string;
};

type Props = {
  children: React.ReactNode;
  tabData: Tab[];
  defaultTab: string;
  backClickName?: string;
  backClickRoutePath?: string;
  condition?: boolean;
  disabledTabs?: string[];
};

function TabSwitch({ children, tabData, defaultTab,backClickName,backClickRoutePath,condition,disabledTabs}: Props) {
  const navigate = useRouter();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setActiveTab(url);
    };

    setActiveTab(window.location.pathname);

    window.addEventListener('popstate', () => handleRouteChange(window.location.pathname));

    return () => {
      window.removeEventListener('popstate', () => handleRouteChange(window.location.pathname));
    };
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate.push(value);
  };

  const handleRouteBack = () => {
     navigate.push(backClickRoutePath ?? "")
  }

  return (
    <div className={`px-4 md:px-8 py-3 ${inter.className}`}>
      {!condition? "" :
       <div className={`flex py-3 space-x-1 text-meedlBlue cursor-pointer`} id={`backClick${backClickName}`} onClick={handleRouteBack}>
       <BiArrowBack className={`mt-1 cursor-pointer`} id={`backClickIcon`}/>
       <h1 id={`backClickText`} data-testid={`backClickText `} >Back to {backClickName}</h1>
       </div>
      }
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className={`z-50 ${!condition? "mt-3" : ""}`}>
          {tabData.map((tab, index) => (
            <TabsTrigger 
            id={`${tab.name}-${index}`} 
            data-testid={`tabDataName${tab.value}`} 
            value={tab.value} key={index}
            disabled={disabledTabs?.includes(tab.value)}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabData.map((tab, index) => (
          <TabsContent key={index} value={tab.value} className='mt-5' >
            {activeTab === tab.value && (
              <div>
                {children}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>  
    </div>
  );
}

export default TabSwitch;

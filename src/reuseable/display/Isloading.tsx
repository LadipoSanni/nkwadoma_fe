import React from 'react'
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";



function Isloading() {
  return (
    <div>
         <div id={'loadingLoopIconDiv'} className="flex items-center justify-center">
                                                    <Icon id={'Icon'} icon={loadingLoop} width={34} height={32}  style={{
                                                animation: 'spin 1s linear infinite',
                                                strokeWidth: 6, 
                                                display: 'block',
                                                    }}/>
                                                </div>
    </div>
  )
}

export default Isloading
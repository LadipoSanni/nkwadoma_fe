import React from 'react'
import {Icon} from "@iconify/react";
import loadingLoop from "@iconify/icons-line-md/loading-loop";

  interface Props {
    color?: string,
    height?: number,
    width?: number
  }

function Isloading({color,height = 34,width = 32}: Props) {
  return (
    <div>
         <div id={'loadingLoopIconDiv'} className="flex items-center justify-center">
                                                    <Icon id={'Icon'} icon={loadingLoop} color={color} width={width} height={height}  style={{
                                                animation: 'spin 1s linear infinite',
                                                strokeWidth: 6, 
                                                display: 'block',
                                                    }}/>
                                                </div>
    </div>
  )
}

export default Isloading
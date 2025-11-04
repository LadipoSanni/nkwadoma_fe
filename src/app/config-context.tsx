"use client"

import React, {createContext, useContext} from "react"


export type Config = {
    uploadPreset?: string
    cloudName?: string
    googleMapsApiKey?: string
    countryCodeUrl?: string
    backendBaseUrl?:string

}

const ConfigContext = createContext<Config | null>(null)

export function useConfig() {
    const ctx = useContext(ConfigContext)
    if (!ctx) throw new Error("useConfig must be used within ConfigProvider")
    return ctx
}

export function ConfigProvider({
                                   children,
                                   config,
                               }: {
    children: React.ReactNode
    config: Config
}) {
    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    )
}

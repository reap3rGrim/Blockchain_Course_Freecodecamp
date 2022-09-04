// useEffect runs constantly takes 2 parameters, a function and a depedency array and checks the value, and re-render on change
// no dependency array: runs anytime anything changes, instead give a blank dependency array as that only re renders once
import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined")
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
    }),
        [isWeb3Enabled]

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <>
            {account ? (
                <h1>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </h1>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined")
                            window.localStorage.setItem("connected", "injected")
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </>
    )
}

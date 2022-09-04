import { NotAuthenticatedError, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"
import { useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdhex, isWeb3Enabled } = useMoralis()
    // Above we're telling useMoralis to pull out the chainId object and rename it to chainIdHex and then we're simply renaming it below
    const chainId = parseInt(chainIdhex)
    // console.log(chainId)
    // const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const raffleAddress = "0xdD07f5Da9a40C11b8Ee080525704919239EFc757"
    // Use state hook is similar to let entrance fee and then updating the value, however it triggers a rerender as well
    const [entranceFee, setEntranceFee] = useState(0)
    const [numPlayers, setNumPlayers] = useState(0)
    const [recentWinner, setRecentWinner] = useState(0)

    const dispatch = useNotification()

    // let EntranceFee = ""
    // Using this as a variable does not trigger a rerender entirely and does not allow to
    // Output to the page
    // Using State hooks instead which is the same thing but triggers a rerender

    // console.log(parseInt(chainIdhex))
    // parseInt changes the hex to normal

    // This is passed from the MoralisProvider the app.js
    // chainId gives the hex version of the chainId

    // We can run transactions and functions using runContractFunction

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
        // msgValue: but as we are not sending any, we'll comment it out
    })

    const { runContractFunction: getNumberofPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
        // msgValue: but as we are not sending any, we'll comment it out
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
        // msgValue: but as we are not sending any, we'll comment it out
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    async function updateUI() {
        const entranceFeeFromCall = await getEntranceFee()
        const numPlayersFromCall = await getNumberofPlayers()
        const recentWinnerFromCall = await getRecentWinner()
        setEntranceFee(entranceFeeFromCall)
        // setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall.toString(), "ether"))
        // We did thhis because we're using the entranceFee as a parameter for enterRaffle
        setNumPlayers(numPlayersFromCall.toString())
        setRecentWinner(recentWinnerFromCall)
        // entrance fee is 0 is because set entrance fee hasn't finished executing
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <>
            <h1>
                {raffleAddress ? (
                    <div className="">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto "
                            onClick={async () => {
                                await enterRaffle({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            Enter Raffle
                        </button>
                        <div>
                            {" "}
                            Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH{" "}
                        </div>
                        <div>Number of Players: {numPlayers}</div>
                        <div>Recent Winner: {recentWinner}</div>
                    </div>
                ) : (
                    <div>No raffle address detected</div>
                )}
            </h1>
        </>
    )
}

import React from "react"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Spinner } from "@material-tailwind/react"

const ProgressBar = () => {
    return (
        // <div className="flex h-full items-center bg-black/70 pb-8">
        <div className="flex min-h-screen justify-start  pt-8">
            <div className="mx-auto pt-28">
                <div className="flex">
                    <Spinner
                        radius={0}
                        color="cyan"
                        className="h-12 w-12 text-black/15"
                    />
                </div>
                {/* <CircularProgressbar
                    className="h-14 animate-spin ease-in"
                    value={55}
                /> */}
                {/* <Spinner
                    values="{20}"
                    className="h-16 w-16 text-black text-cyan-400/90"
                /> */}
            </div>
        </div>
        // {/* </div> */}
    )
}

export default ProgressBar

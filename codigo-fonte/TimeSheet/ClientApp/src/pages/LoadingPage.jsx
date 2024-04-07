import React from "react"
import { ClockLoader } from 'react-spinners';

export default function LoadingPage() {
    return (
        <div className="w-full h-screen justify-center flex flex-col items-center">
            <ClockLoader className="" size={80} color="#9ABEA4" />
        </div>
    );
}
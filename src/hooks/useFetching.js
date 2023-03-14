import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState("")

    //3 ...args в параметрах и callback
    async function fetching(...args) {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            // setError(e.message)

        } finally {
            setIsLoading(false)
        }

    }
    return [fetching, isLoading]
    // return [fetching, isLoading, error]
}
import React, { useEffect, useState } from 'react'

export default function useDebounce(val, delay) {
    const [debounceVal, setDebouncedVal] = useState('')

    useEffect(() => {
        let timeOutId = setTimeout(() => {
            setDebouncedVal(val)
        }, delay);
        return () => {
            clearTimeout(timeOutId)
        }
    }, [val])
    return debounceVal;

}

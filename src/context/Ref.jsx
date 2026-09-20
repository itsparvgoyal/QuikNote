import React, { createContext, useRef } from 'react'

export const ReferenceContext = createContext();

const Ref = ({ children }) => {

    const noteRef = useRef(null);
    const homeRef = useRef(null);

    const scrollTohome = () => {

        homeRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    };

    const scrollToNotes = () => {

        noteRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (

        <ReferenceContext.Provider
            value={{
                noteRef,
                homeRef,
                scrollToNotes,
                scrollTohome
            }}
        >

            {children}
        </ReferenceContext.Provider>
    )
}

export default Ref
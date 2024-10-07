
import React, { createContext, useContext, useRef, useState } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const cardContainerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardWidth = 200; 

    const handleScrollRight = () => {
        if (cardContainerRef.current) {
            const visibleCards = 3.33;
            const totalCards = cardContainerRef.current.children.length;

            if (scrollPosition < (totalCards - visibleCards) * cardWidth) {
                const newScrollPosition = Math.min(scrollPosition + cardWidth * visibleCards, (totalCards - visibleCards) * cardWidth);
                cardContainerRef.current.scrollBy({ left: cardWidth * visibleCards, behavior: 'smooth' });
                setScrollPosition(newScrollPosition);
            }
        }
    };

    const handleScrollLeft = () => {
        if (cardContainerRef.current && scrollPosition > 0) {
            const visibleCards = 3.33;
            const newScrollPosition = Math.max(scrollPosition - cardWidth * visibleCards, 0);
            cardContainerRef.current.scrollBy({ left: -cardWidth * visibleCards, behavior: 'smooth' });
            setScrollPosition(newScrollPosition);
        }
    };

    return (
        <ScrollContext.Provider value={{ cardContainerRef, handleScrollRight, handleScrollLeft }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => {
    return useContext(ScrollContext);
};

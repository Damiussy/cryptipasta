'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export function usePageTransitions() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isElementInViewport = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -100 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
      rect.left >= -100 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) + 100
    );
  }, []);

  // Fonction pour préserver les balises HTML
  const wrapTextNodesWithSpans = useCallback((node: Node, delay: number = 0): number => {
    let currentDelay = delay;
    
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (text.trim() === '') return currentDelay;
      
      const letters = text.split('');
      const fragment = document.createDocumentFragment();
      
      letters.forEach((letter) => {
        const span = document.createElement('span');
        span.className = 'letter-blur-in';
        span.style.animationDelay = `${currentDelay}ms`;
        span.style.display = 'inline-block';
        
        if (letter === ' ') {
          span.style.minWidth = '0.3em';
          span.textContent = ' ';
        } else {
          span.textContent = letter;
        }
        
        fragment.appendChild(span);
        currentDelay += 25;
      });
      
      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
      }
      
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach((child) => {
        currentDelay = wrapTextNodesWithSpans(child, currentDelay);
      });
    }
    
    return currentDelay;
  }, []);

  const animateText = useCallback(() => {
    const isHomePage = pathname === '/';
    const isHeavyPage = pathname.includes('liztter') || pathname.includes('cryptids');
    
    // Animation pour textes courts
    const shortTextSelectors = [
      '.titleBis', '.titleBis2', '.liensMenu', '.titleI', 'h1', 'h2', 'h3'
    ];

    shortTextSelectors.forEach((selector, selectorIndex) => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((element, elementIndex) => {
        if (!(element instanceof HTMLElement)) return;
        if (!isElementInViewport(element)) return;
        if (element.querySelector('.letter-blur-in')) return;
        
        const baseDelay = (selectorIndex * 80) + (elementIndex * 40);
        wrapTextNodesWithSpans(element, baseDelay);
      });
    });

    // Animation pour longs textes
    const longTextElements = document.querySelectorAll('.textI, p');
    let visibleElements = 0;
    
    longTextElements.forEach((element, index) => {
      if (!(element instanceof HTMLElement)) return;
      if (!isElementInViewport(element)) return;
      if (element.querySelector('.letter-blur-in, .word-blur-in')) return;
      
      visibleElements++;
      
      if (isHeavyPage && visibleElements > 3) {
        element.classList.add('simple-fade-in');
        element.style.animationDelay = `${200 + (visibleElements * 100)}ms`;
        return;
      }
      
      const textLength = element.textContent?.length || 0;
      
      if (isHomePage || textLength > 300) {
        // Animation par mots - SANS wordIndex
        const wrapWordsInElement = (node: Node, wordDelay: number = 0): number => {
          let currentWordDelay = wordDelay;
          
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            const words = text.split(' ');
            const fragment = document.createDocumentFragment();
            
            words.forEach((word) => {  // PAS de wordIndex ici !
              if (word.trim() === '') {
                const spaceSpan = document.createElement('span');
                spaceSpan.className = 'word-blur-in';
                spaceSpan.style.display = 'inline-block';
                spaceSpan.style.minWidth = '0.3em';
                spaceSpan.textContent = ' ';
                fragment.appendChild(spaceSpan);
                return;
              }
              
              const span = document.createElement('span');
              span.className = 'word-blur-in';
              span.style.animationDelay = `${currentWordDelay}ms`;
              span.style.display = 'inline-block';
              span.style.marginRight = '0.3em';
              span.textContent = word;
              
              fragment.appendChild(span);
              currentWordDelay += isHomePage ? 25 : 15;
            });
            
            if (node.parentNode) {
              node.parentNode.replaceChild(fragment, node);
            }
            
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const childNodes = Array.from(node.childNodes);
            childNodes.forEach((child) => {
              currentWordDelay = wrapWordsInElement(child, currentWordDelay);
            });
          }
          
          return currentWordDelay;
        };
        
        wrapWordsInElement(element, 200);
        
      } else {
        const baseDelay = 200 + (index * 50);
        wrapTextNodesWithSpans(element, baseDelay);
      }
    });

    // Footer animation
    const footerElements = document.querySelectorAll('#footerSup h1, #footerSup h2, #footerSup h3, #footerSup p, #footerSup a, #footerSup span');
    footerElements.forEach((element, index) => {
      if (!(element instanceof HTMLElement)) return;
      if (!isElementInViewport(element)) return;
      if (element.querySelector('.letter-blur-in')) return;
      
      const baseDelay = 400 + (index * 30);
      wrapTextNodesWithSpans(element, baseDelay);
    });
  }, [pathname, isElementInViewport, wrapTextNodesWithSpans]); // TOUTES les dépendances

  const animateDivs = useCallback(() => {
    const divSelectors = ['#sideContentSup', '#headerSup', '#contentSup', '#footerSup'];

    divSelectors.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (!(element instanceof HTMLElement)) return;
      if (!isElementInViewport(element)) return;
      
      setTimeout(() => {
        element.classList.add('div-blur-in');
        setTimeout(() => {
          element.classList.remove('div-blur-in');
        }, 1000);
      }, index * 100);
    });
  }, [isElementInViewport]);

  useEffect(() => {
    setIsTransitioning(true);
    
    const animationTimer = setTimeout(() => {
      animateText();
      animateDivs();
    }, 100);
    
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(transitionTimer);
    };
  }, [pathname, animateText, animateDivs]);

  return { isTransitioning };
}
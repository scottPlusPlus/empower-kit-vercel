"use client"

import React, { useEffect, useRef } from 'react';

export default function Observer(props: { onFirstObserve: ()=>void}) {
  const targetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // the intersection ratio at which the callback will be triggered
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        props.onFirstObserve();
        observer.disconnect();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div ref={targetRef}></div>
  );
}
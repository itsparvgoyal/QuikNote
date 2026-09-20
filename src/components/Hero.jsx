import React, { useEffect, useState } from 'react'

const Hero = () => {

  const text = "QuikNote !";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {

    let index = 0;
    let isDeleting = false;

    const interval = setInterval(() => {

      if(!isDeleting){

        setTypedText(text.slice(0, index + 1));
        index++;

        // typing complete
        if(index === text.length){
          isDeleting = true;
        }

      }else{
        setTypedText(text.slice(0, index - 1));
        index--;
        // delete complete
        if(index === 0){
          isDeleting = false;
        }
      }

    }, 250);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="min-h-[50vh] flex items-center justify-center bg-background px-6 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
          <span className="block text-muted-foreground text-2xl md:text-3xl font-normal mb-4">
            Create Notes With
          </span>
          <span className="text-primary inline-block min-w-50">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Capture your thoughts, organize your ideas, and never forget what matters.
        </p>
      </div>
    </section>
  )
}

export default Hero

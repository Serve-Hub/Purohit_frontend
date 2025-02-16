import React, { useEffect } from 'react';

const AnimatedCounter: React.FC = () => {
  useEffect(() => {
    const mynum = document.querySelectorAll<HTMLHeadingElement>('.count');
    const speed = 200;

    mynum.forEach((num) => {
      const finalVal = parseInt(num.dataset.count || '0', 10);
      let initialVal = 0;
      const increment = Math.floor(finalVal / speed);

      const updateNumber = () => {
        initialVal += increment;
        num.innerText = `${initialVal}`;

        if (initialVal < finalVal) {
          setTimeout(updateNumber, 5);
        } else {
          num.innerText = `${finalVal}`; 
        }
      };

      updateNumber();
    });
  }, []);

  return (
    <div className="container mx-auto mt-6   ">
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-2">
        <div className="flex flex-col lg:items-center md:flex-row md:items-center gap-3">
          <img src="img/counter_1.png" alt="" className=' w-20' />
          <div className="flex-col  text-pandit">
          <h1 className="text-4xl font-bold count" data-count="2000">0</h1>
          <p>Services</p>

          </div>
        </div>
        <div className="flex flex-col lg:items-center md:flex-row md:items-center gap-3">
        <img src="img/counter_2.png" alt="" className=' w-20' />
<div className="flex-col  text-pandit">
          <h1 className="text-4xl font-bold count" data-count="3432">0</h1>
          <p>Pandits</p>
    
</div>
        </div>
        <div className="flex flex-col lg:items-center md:flex-row md:items-center gap-3">
        <img src="img/counter_3.png" alt="" className=' w-20' />
<div className="flex-col  text-pandit">
          <h1 className="text-4xl font-bold count" data-count="223">0</h1>
          <p>Yojaman</p>

</div>
        </div>
        <div className="flex flex-col lg:items-center md:flex-row md:items-center gap-3">
        <img src="img/counter_4.png" alt="" className=' w-20' />
<div className="flex-col  text-pandit">
          <h1 className="text-4xl font-bold count" data-count="1233">0</h1>
          <p>Districts in operation</p>

</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCounter;

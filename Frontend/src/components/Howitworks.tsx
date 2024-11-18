import * as React from "react"

function Howitworks() {
  return (
    <>
 
 <div className="flex flex-col lg:flex-row p-10 bg-[url('/img/bg.png')] bg-cover bg-center container">
  <div className="w-full lg:w-3/4  p-6">
    <div className="mx-auto ">
      <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance lg:text-center">
        How it works
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        The online pandit service purohit works on the basis of choosing the desired pandits for the desired work and booking them for the desired time.
        <br />
        It also supports the online consultation of the pandits, which is free of costs.
      </p>
    </div>
    <h1 className="mt-2 text-pretty font-semibold tracking-tight text-gray-900 lg:text-balance">
      Steps for booking the Pandit
    </h1>
    <ol className="text-lg leading-8 text-gray-600">
      <li>1. Signup with your email and phone number</li>
      <li>2. Select your desired religious work from the “Our Popular Pooja” section.</li>
      <li>3. Look for available pandits</li>
      <li>4. Book your pandit by clicking the “Book Now” button</li>
    </ol>
    <p className="mt-6 text-lg leading-8 text-gray-600">
      The teams and highly qualified pandits are working hard to make this app better day by day. <br />
      If you have any queries related to this app, you can contact our teams.
    </p>
  </div>
  <div className="w-full lg:w-1/4  flex justify-center lg:justify-end">
    <img src="img/howworks.png" alt="How it works illustration" className="max-w-full h-auto" />
  </div>
</div>

    </>
  )
}

export default Howitworks
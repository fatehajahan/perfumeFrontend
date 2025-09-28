import React from 'react'
import aboutImg1 from '../../assets/aboutUs/bg-14.jpg'
import historyImg1 from '../../assets/aboutUs/bg-12.jpg'
import historyImg2 from '../../assets/aboutUs/bg-15.jpg'
import { useInView } from 'react-intersection-observer'

const AboutUs = () => {
  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[600px] bg-aboutBanner bg-cover bg-no-repeat bg-center flex items-center">
        <div className="absolute inset-0 bg-gradient-to-bl from-black/70 to-transparent z-10" />
        <div className="container relative z-20 text-white text-center md:text-left">
          <div className="pt-[250px] md:pt-[400px]">
            <p className="text-sm md:text-base">A few words</p>
            <p className="text-white text-4xl md:text-7xl font-cormot uppercase">
              About us
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container py-16 md:py-[150px] flex flex-col gap-6">
        <p className="text-sm md:text-base font-bold uppercase">A few words</p>
        <h2 className="uppercase text-2xl sm:text-4xl md:text-5xl lg:text-[55px] font-cormot max-w-full md:max-w-[1000px]">
          we are the NY’s largest specialist fragrance retailer with 20 stores
          across the UsA & Europe.
        </h2>
        <p className="text-sm md:text-base leading-relaxed">
          Nunc vulputate feugiat tortor ac congue. Nam sit amet urna vitae
          ligula pellentesque porttitor ut id nisl. Nam laoreet velit ipsum.
          Suspendisse ullamcorper, odio id faucibus consectetur, elit quam
          cursus est, nec sagittis purus enim a eros. Sed posuere nec lacus sit
          amet ullamcorper. Donec ut egestas purus. Duis placerat turpis non
          urna convallis convallis vitae nec odio. Vestibulum quam turpis,
          blandit vel fermentum sed, pulvinar in risus. Etiam a mauris sed nunc
          venenatis vulputate vitae quis tortor. Curabitur gravida accumsan
          elementum. Praesent ut hendrerit dui, vitae elementum mi.
        </p>
      </div>

      {/* About Image */}
      <div className="container">
        <img src={aboutImg1} alt="" className="w-full rounded-lg" />
      </div>

      {/* Old Friends Section */}
      <div className="py-16 md:py-[100px]">
        <div className="container">
          <div className="uppercase font-bold font-cormot text-center md:text-left">
            <p className="text-sm md:text-base">Old friends</p>
            <h2 className="text-2xl md:text-[42px] font-normal">
              here with you for over 15 years
            </h2>
          </div>
          <p className="text-[#5b5b5b] mt-6 text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            ultrices posuere magna, et cursus metus scelerisque congue. Maecenas
            lorem enim, pharetra sed imperdiet eu, bibendum id nibh. In hac
            habitasse platea dictumst. Donec mattis molestie arcu vitae tempus.
            In hac habitasse platea dictumst. Ut mattis mauris vitae justo
            accumsan dignissim. Ut egestas quam sit amet magna sollicitudin
            iaculis. In sit amet libero vel mauris bibendum faucibus ac non
            diam. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Proin id ante pulvinar risus convallis consectetur et sit amet erat.
            Aliquam et sapien rhoncus, vulputate urna non, egestas elit. In
            lacus ante, imperdiet eget justo ut, sodales sollicitudin turpis.
            Donec egestas mauris vel enim facilisis, nec dictum mi consectetur.
            Suspendisse ac ullamcorper felis. Nulla id libero id justo lacinia
            consectetur sit amet ac libero. Maecenas cursus placerat auctor.
            Integer condimentum elit ut feugiat ornare. Maecenas leo ipsum,
            pharetra sed ornare id, mattis vel nisi. Nam dui nunc, gravida sed
            tortor non, tempus pretium lectus.
          </p>
        </div>
      </div>

      {/* Fixed Banner */}
      <div>
        <div className="bg-aboutFixed bg-cover bg-no-repeat bg-center h-[400px] md:h-screen flex items-center justify-center md:bg-fixed"></div>
      </div>

      {/* History Section 1 */}
      <div className="py-16 md:py-[150px]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Left Image */}
            <div
              ref={leftRef}
              className={`w-full md:w-1/2 transition-all duration-1000 ease-out transform 
              ${
                leftInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
              }`}
            >
              <img src={historyImg1} alt="" className="w-full rounded-lg" />
            </div>

            {/* Right Text */}
            <div className="w-full md:w-1/3 text-center flex flex-col justify-center items-center md:items-start">
              <p className="text-sm md:text-base">Since 1995</p>
              <p className="font-cormot text-4xl md:text-[68px]">History</p>
              <p className="text-sm md:text-base mt-4 leading-relaxed">
                Donec dapibus ullamcorper magna quis posuere. Aenean tincidunt
                posuere tellus nec dapibus. Aliquam pharetra egestas tellus.
                Nulla sed quam ante. Curabitur porta pharetra nunc, in maximus
                ex ultricies a. Donec nibh turpis, eleifend ut tristique ut,
                aliquam eu urna. Fusce eget ante tellus. Vestibulum.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Section 2 */}
      <div className="pb-16 md:pb-[150px]">
        <div className="container">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-8">
            {/* Left Text */}
            <div className="w-full md:w-1/3 text-center flex flex-col justify-center items-center md:items-start">
              <p className="text-sm md:text-base">Since 1995</p>
              <p className="font-cormot text-4xl md:text-[68px]">History</p>
              <p className="text-sm md:text-base mt-4 leading-relaxed">
                Donec dapibus ullamcorper magna quis posuere. Aenean tincidunt
                posuere tellus nec dapibus. Aliquam pharetra egestas tellus.
                Nulla sed quam ante. Curabitur porta pharetra nunc, in maximus
                ex ultricies a. Donec nibh turpis, eleifend ut tristique ut,
                aliquam eu urna. Fusce eget ante tellus. Vestibulum.
              </p>
            </div>

            {/* Right Image */}
            <div
              ref={rightRef}
              className={`w-full md:w-1/2 transition-all duration-1000 ease-out transform 
              ${
                rightInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
              }`}
            >
              <img src={historyImg2} alt="" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

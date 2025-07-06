import React from 'react'
import aboutImg1 from '../../assets/aboutUs/bg-14.jpg'

const AboutUs = () => {
    return (
        <div>
            <div className='relative h-[600px] bg-aboutBanner bg-cover bg-no-repeat bg-center md:pt-[100px] flex items-center md:justify-between'>
                <div className="absolute inset-0 bg-gradient-to-bl from-black/70 to-transparent z-10">
                    <div className="container relative z-20 text-white">
                        <div className='pt-[400px]'>
                            <p className='text-[16px]'>A few words</p>
                            <p className='text-white  text-[80px] font-cormot uppercase'>About us</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container py-[150px] flex flex-col gap-y-[20px]'>
                <p className='text-[16px] font-bold uppercase'>A few words</p>
                <h2 className='uppercase text-[55px] font-cormot w-[1000px]'>we are the NY’s largest specialist fragrance retailer with 20 stores across the UsA & Europe.</h2>
                <p>Nunc vulputate feugiat tortor ac congue. Nam sit amet urna vitae ligula pellentesque porttitor ut id nisl. Nam laoreet velit ipsum. Suspendisse ullamcorper, odio id faucibus consectetur, elit quam cursus est, nec sagittis purus enim a eros. Sed posuere nec lacus sit amet ullamcorper. Donec ut egestas purus. Duis placerat turpis non urna convallis convallis vitae nec odio. Vestibulum quam turpis, blandit vel fermentum sed, pulvinar in risus. Etiam a mauris sed nunc venenatis vulputate vitae quis tortor. Curabitur gravida accumsan elementum. Praesent ut hendrerit dui, vitae elementum mi.</p>
            </div>

            <div className="aboutContainer sm:aboutContainer lg:aboutContainer xl:aboutContainer">
                <img src={aboutImg1} alt="" />
            </div>
        </div>
    )
}

export default AboutUs
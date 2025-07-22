import React from 'react'
import aboutImg1 from '../../assets/aboutUs/bg-14.jpg'
import fixedImg from '../../assets/aboutUs/bg-13.jpg'
import historyImg1 from '../../assets/aboutUs/bg-12.jpg'
import historyImg2 from '../../assets/aboutUs/bg-15.jpg'

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

            <div className="container">
                <img src={aboutImg1} alt="" />
            </div>

            <div className='py-[100px]'>
                <div className='container'>
                    <div className=' uppercase font-bold font-cormot'>
                        <p>Old friends</p>
                        <h2 className='text-[42px]  font-normal'>here with you for over 15 years</h2>
                    </div>
                    <p className='text-[#5b5b5b]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices posuere magna, et cursus metus scelerisque congue. Maecenas lorem enim, pharetra sed imperdiet eu, bibendum id nibh. In hac habitasse platea dictumst. Donec mattis molestie arcu vitae tempus. In hac habitasse platea dictumst. Ut mattis mauris vitae justo accumsan dignissim.

                        Ut egestas quam sit amet magna sollicitudin iaculis. In sit amet libero vel mauris bibendum faucibus ac non diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin id ante pulvinar risus convallis consectetur et sit amet erat. Aliquam et sapien rhoncus, vulputate urna non, egestas elit. In lacus ante, imperdiet eget justo ut, sodales sollicitudin turpis. Donec egestas mauris vel enim facilisis, nec dictum mi consectetur. Suspendisse ac ullamcorper felis. Nulla id libero id justo lacinia consectetur sit amet ac libero. Maecenas cursus placerat auctor. Integer condimentum elit ut feugiat ornare. Maecenas leo ipsum, pharetra sed ornare id, mattis vel nisi. Nam dui nunc, gravida sed tortor non, tempus pretium lectus.</p>
                </div>
            </div>

            <div>
                <div className='bg-aboutFixed bg-cover bg-no-repeat bg-center md:pt-[100px] md:pb-[80px] h-screen flex items-center md:justify-center md:bg-fixed'></div>
            </div>

            <div className='py-[150px]'>
                <div className='container'>
                    <div className='flex justify-between gap-x-[20px]'>
                        <div className='w-1/2'>
                            <img src={historyImg1} alt="" />
                        </div>

                        <div className='w-1/3 text-center flex flex-col justify-center items-center'>
                            <p className='text-[16px]'>Sine 1995</p>
                            <p className='font-cormot text-[68px]'>History</p>
                            <p className='text-[15px]'>Donec dapibus ullamcorper magna quis posuere. Aenean tincidunt posuere tellus nec dapibus. Aliquam pharetra egestas tellus. Nulla sed quam ante. Curabitur porta pharetra nunc, in maximus ex ultricies a. Donec nibh turpis, eleifend ut tristique ut, aliquam eu urna. Fusce eget ante tellus. Vestibulum.</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='pb-[150px]'>
                <div className='container'>
                    <div className='flex justify-between gap-x-[20px]'>
                        <div className='w-1/3 text-center flex flex-col justify-center items-center'>
                            <p className='text-[16px]'>Sine 1995</p>
                            <p className='font-cormot text-[68px]'>History</p>
                            <p className='text-[15px]'>Donec dapibus ullamcorper magna quis posuere. Aenean tincidunt posuere tellus nec dapibus. Aliquam pharetra egestas tellus. Nulla sed quam ante. Curabitur porta pharetra nunc, in maximus ex ultricies a. Donec nibh turpis, eleifend ut tristique ut, aliquam eu urna. Fusce eget ante tellus. Vestibulum.</p>
                        </div>
                        <div className='w-1/2'>
                            <img src={historyImg2} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
import React from 'react'
import { useInView } from 'react-intersection-observer'
import 'animate.css'
import new1 from '../../../assets/homepage/new1.jpg'
import new2 from '../../../assets/homepage/new2.jpg'
import new3 from '../../../assets/homepage/new3.jpg'
import new4 from '../../../assets/homepage/new4.jpg'
import { Link } from 'react-router-dom'

const NewArraival = () => {
    const { ref: leftRef, inView: leftInView } = useInView({
        triggerOnce: true,   // animation happens once
        threshold: 0.2       // triggers when 20% is visible
    })

    const { ref: rightRef, inView: rightInView } = useInView({
        triggerOnce: true,
        threshold: 0.2
    })

    return (
        <div className='md:py-[130px] py-[50px]'>
            <div className="container">
                {/* First Section */}
                <div className='firstArraival md:flex justify-between items-center'>
                    <div
                        ref={leftRef}
                        className={`relative md:ml-[115px] mx-[20px] ${leftInView ? 'animate__animated animate__fadeInLeft' : 'opacity-0'}`}>
                        <img src={new1} alt="" />
                        <img src={new2} alt="" className='absolute top-[150px] left-[-140px] w-[274px] hidden md:block' />
                    </div>

                    <div className="md:text-right md:px-0 px-[23px] md:py-0 py-[50px]">
                        <p className="font-cormot font-bold text-base uppercase tracking-wide text-black">
                            Our original perfume
                        </p>
                        <h1 className="font-cormot text-[50px] md:text-[88px] leading-tight pt-[20px]">
                            The <br /> new <br /> fragrance
                        </h1>
                        <p className='md:w-[500px] font-urbanist py-[20px]'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quo vero vitae inventore excepturi eum quod debitis nulla architecto.
                        </p>
                        <button className="font-cormot text-white bg-black py-2 px-6 w-[190px] text-center cursor-pointer hover:bg-transparent hover:text-black border border-black transition duration-500 font-bold mt-6 tracking-wide">
                            <Link to="/">SIGN UP NOW</Link>
                        </button>
                    </div>
                </div>

                {/* Second Section */}
                <div className='SecondArraival md:flex justify-between items-center md:px-0 px-[23px]'>
                    <div className="text-left">
                        <p className="font-cormot font-bold text-base uppercase tracking-wide text-balck pt-[50px] ">
                            eau de toilette
                        </p>
                        <h1 className="font-cormot text-[50px] md:text-[88px] leading-tight pt-[20px] w-[300px]">
                            instinctive <br />and <br /> electric
                        </h1>
                        <p className='md:w-[500px] font-urbanist py-[20px]'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex fugit quo vero vitae inventore excepturi eum quod debitis nulla architecto.
                        </p>
                        <button className="font-cormot text-white bg-black py-2 px-6 w-[190px] text-center cursor-pointer hover:bg-transparent hover:text-black border border-black transition duration-500 font-bold mt-6 tracking-wide">
                            DISCOVER
                        </button>
                    </div>

                    <div
                        ref={rightRef}
                        className={`relative md:mr-[115px] mx-auto md:mx-0 mt-[50px] md:mt-0 ${rightInView ? 'animate__animated animate__fadeInRight' : 'opacity-0'}`}>
                        <img src={new3} alt="" />
                        <img src={new4} alt="" className='absolute top-[150px] right-[-140px] w-[274px] hidden md:block' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArraival

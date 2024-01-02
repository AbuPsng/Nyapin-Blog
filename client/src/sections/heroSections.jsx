import React from 'react'

const HeroSections = () => {
    return (
        <main className='pt-28 pb-12 flex flex-col gap-y-14'>
            {/* content text */}
            <div className='flex flex-col gap-y-4 text-center'>
                <p className='text-sm font-semibold '>The blog</p>
                <h1 className='text-5xl'>Nyapin-Blogs Presents</h1>
                <p className='text-base '>The latest industry news, interviews,technologies and resources</p>

            </div>

            {/* img holder */}
            <div>
                <img src="images/ice-land.jpg" className='w-full h-96' alt="ice-land image" />
            </div>

        </main>
    )
}

export default HeroSections

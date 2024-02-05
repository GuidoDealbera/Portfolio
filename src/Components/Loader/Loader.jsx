import React from 'react'

const Loader = () => {
  return (
    <div className='w-screen h-screen flex flex-col gap-4 justify-center items-center'>
        <div className="loader">
            <span></span>
        </div>
        <p className='text-lg animate-bounce'>CARGANDO</p>
    </div>
  )
}

export default Loader
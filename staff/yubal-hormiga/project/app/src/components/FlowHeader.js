import log from "../utils/coolog"
import FlowForm from "./FlowForm"
import { useState } from "react"

function Flow({ totalFlows, isValidPension, setIsValidPension }) {
    log.info('FlowHeader -> render')

    const [pension, setPension] = useState()
    setIsValidPension(true) //! ELIMINAR Y RECUPERAREMOS EL PRESUPUESTO
    
    return (
        <header className="">
            {isValidPension ?
                <>
                    <div className="flex justify-between" >
                        {/* <p className='  font-semibold text-lg'>
                            <span>Presupuesto:</span>{totalFlows.income}€
                        </p> */}
                        <p className='  font-semibold text-lg '>
                            <span className='text-[#023047]' >Ingresado:</span> <spam className='text-[#fb8500]'>{totalFlows.income}€</spam>
                        </p>
                        <p className='  font-semibold text-lg text-[#023047]'>
                            <span className='text-[#023047]' >Gastado:</span> <spam className='text-[#fb8500]'>{totalFlows.spent}€</spam>
                        </p>
                        <p className='  font-semibold text-lg text-[#023047]'>
                            <span className='text-[#023047]' >Disponible:</span> <spam className='text-[#fb8500]'>{totalFlows.income - totalFlows.spent}€</spam>

                        </p>
                    </div>
                    <div className="flex justify-center  ">
                        <label htmlFor="file"></label>
                        <progress className="w-full h-4  " id="file" max={totalFlows.income} value={(totalFlows.income - totalFlows.spent)}></progress>
                    </div>

                </>
                :
                <FlowForm
                    pension={pension}
                    setPension={setPension}
                    setIsValidPension={setIsValidPension}
                />
            }
        </header>
    )
}
export default Flow
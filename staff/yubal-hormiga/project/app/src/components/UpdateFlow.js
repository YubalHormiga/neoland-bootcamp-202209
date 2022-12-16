/* eslint-disable import/no-anonymous-default-export */
import log from '../utils/coolog'
import updateAppointment from '../logic/updateFlow'
import { GrFormClose } from 'react-icons/gr'

export default function UpdateFlow({ onUpdated, onClose, flow }) {
    log.info('UpodateFlow -> render')

    const submitUpdateFlow = event => {
        event.preventDefault()
        // type, kind, description, amount, date
        const { type: { value: type }, kind: { value: kind }, description: { value: description }, amount: { value: amount }, date: { value: date }, } = event.target

        try {
            updateAppointment(sessionStorage.token, flow.id, type, kind, description, Number(amount), new Date(date), error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUpdated()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className='bg-[#aaaa] absolute  top-0 right-0 h-full w-full flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
        <div className='p-3 rounded-xl flex flex-col items-end bg-white dark:bg-black text-black dark:text-white' onClick={event => event.stopPropagation()}>
            <GrFormClose size='1.5rem' onClick={onClose} className='mb-1 cursor-pointer' />

            <form className='flex flex-col gap-2' onSubmit={submitUpdateFlow}>
                <label htmlFor='type' className='w-full  font-semibold text-lg bg-slate-100'>Selecciona Apunte</label>
                <select id='type' defaultValue={flow.type} className='font-semibold text-lg flex flex-row'>
                    <option value=''>--Seleccionar--</option>
                    <option value='income'>Ingreso</option>
                    <option value='expense'>Gasto</option>
                </select>
                <label htmlFor='kind' className=' w-full font-semibold text-lg bg-slate-100' >Selecciona Categoria</label>
                <select id='kind' defaultValue={flow.kind} className='font-semibold text-lg flex flex-row' >
                    <option value=''>--Seleccionar--</option>
                    <option value='food'>Comida</option>
                    <option value='supply'>Suministros</option>
                    <option value='medicine'>Medicamentos</option>
                    <option value='services'>Servicios</option>
                    <option value='gift'>Regalo</option>
                    <option value='donation'>Donation</option>
                    <option value='other'>Otros</option>
                </select>

                {/* <div className=''>
                    <label htmlFor='type'></label>
                    <input
                        name='type'
                        className='font-semibold text-lg flex flex-row'
                        defaultValue={flow.type}
                        id='type'
                    />
                </div> */}
                {/* 
                <div className=''>
                    <label htmlFor='kind'></label>
                    <input
                        name='kind'
                        className='font-semibold text-lg flex flex-row'
                        defaultValue={flow.kind}
                        id='kind'
                    />
                </div> */}

                <div className=''>
                    <label htmlFor='description' className='w-full font-semibold text-lg bg-slate-100'>Descripción</label>
                    <input
                        name='description'
                        className='w-full text-lg  border-2 border-sky-200'
                        defaultValue={flow.description}
                        id='description'
                    />
                </div>

                <div className='' >
                <label htmlFor='description' className='w-full  font-semibold text-lg bg-slate-100'>Cantidad</label>
                    <input
                        name='amount'
                        className='w-full text-lg  border-2 border-sky-200'
                        defaultValue={flow.amount}
                        id='amount'
                    />
                </div>

                <div>
                    <input
                        name='date'
                        type='datetime-local'
                        className='w-full text-lg  border-2 border-sky-200'
                        defaultValue={flow.date.toISOString().substring(0, 23)}
                        id='date'
                    />
                </div>

                <button
                    className="text-center my-1 px-6 py-1 rounded-sm font-medium border-2 border-cyan-900 text-white hover:text-cyan-900 bg-cyan-900 hover:bg-white cursor-pointer"
                    type="submit"
                >
                    Guardar cambios
                </button>
            </form>
        </div>
    </div>
}

// post && post.text -> post?.text
// type, kind, description, amount, date
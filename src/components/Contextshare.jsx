import React, { createContext, useState } from 'react'


//create context

export const registerContext=createContext()

//context for delete
export const deleteContext=createContext()

export const editContext=createContext()



function Contextshare({children}) {

    //create a state to shore datas inside context

    const [registerData,setRegisterData]=useState("")

    //state to store delete context data
    const [deleteData,setDeleteData]=useState("")

    const [editData,setEditData]=useState("")



  return (
    <div>
        <registerContext.Provider value={{registerData,setRegisterData}}>
          <deleteContext.Provider value={{deleteData,setDeleteData}}>
            <editContext.Provider value={{editData,setEditData}}>
            {children}
            </editContext.Provider>
          </deleteContext.Provider>
        </registerContext.Provider>
    </div>
  )
}

export default Contextshare
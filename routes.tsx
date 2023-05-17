import { Routes, Route } from 'react-router-dom'
import { MainPage } from './src/Main/main'
import React from 'react'
import { Taks } from './src/Pages/Task/Taks'


export function AppRoutes({db}) {
  return (

<Routes>
    <Route path='/' element={<MainPage />}> 
      <Route path='/task' element={<Taks datas = {db}/>} />  
    </Route>
  </Routes>
  )
}

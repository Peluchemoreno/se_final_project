import './ProtectedRoute.css'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({children, authenticated = false}){

  if(!authenticated){
    return (
      <Navigate to='/' />
    )
  }

  return children
  
}
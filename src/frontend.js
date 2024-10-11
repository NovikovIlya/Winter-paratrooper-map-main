import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import "preline/preline";
import Map from "./Map";



const divsToUpdate = document.querySelectorAll(".tailwind-update-me")

divsToUpdate.forEach(div => {
  const data = JSON.parse(div.querySelector("pre").innerText)
  const root = ReactDOM.createRoot(div)
  root.render(<OurComponent {...data} />)
  div.classList.remove("tailwind-update-me")
})
const queryClient = new QueryClient()


function OurComponent(props) {

  return (
  <QueryClientProvider client={queryClient}>
    <Map props={props}/>
  </QueryClientProvider>
    
  )
}

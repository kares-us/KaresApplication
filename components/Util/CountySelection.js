import { useState } from "react"

export default function CountySelection(props) {
  const { counties, selectedCounties, setSelectedCounties } = props

  function checkSelected(countyName) {
    if (selectedCounties.some(cnty => cnty.name === countyName)) return 'bg-green-300'
    else return 'bg-red-400'
  }

  function handleChange(county) {
    console.log(selectedCounties)

    let targetName = county.name

    let index = 0
    let currentCounties = [...selectedCounties]

    for (let selKey in selectedCounties) {
      if (selectedCounties[selKey].name === targetName) {
        currentCounties.splice(index, 1)
        setSelectedCounties(currentCounties)
        return
      }
      index += 1
    }
    currentCounties.push(county)
    setSelectedCounties(currentCounties)
  }

  return (
    <div className="flex flex-col my-3">
      <p className='text-xl mb-1'>Counties</p>





      {counties.map(cnty => (
        <div key={cnty._id} className='flex p-1 pl-0 items-center'>
          <button
            className={`h-4 w-4 border rounded-sm border-black mr-3 ${checkSelected(cnty.name)}`}
            onClick={() => handleChange(cnty)}
          />
          <p>{cnty.name}</p>
        </div>
      ))}
    </div>
  )
}

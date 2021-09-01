import { useState } from "react"

export default function Roles(props) {
  const { selectedRoles, setSelectedRoles, roles } = props

  function checkSelected(roleName) {
    if (selectedRoles.includes(roleName)) return 'bg-green-300'
    else return 'bg-red-400'
  }

  function handleChange(role) {
    let currentRoles = [...selectedRoles]

    if (selectedRoles.includes(role)) {
      let index = selectedRoles.indexOf(role)
      currentRoles.splice(index, 1)
      setSelectedRoles(currentRoles)
      return
    }
    currentRoles.push(role)
    setSelectedRoles(currentRoles)
  }

  return (
    <div className="flex flex-col my-3">
      <p className='text-xl mb-1'>Roles</p>

      {roles.map(role => (
        <div key={role} className='flex p-1 pl-0 items-center'>
          <button
            className={`h-4 w-4 border rounded-sm border-black mr-3 ${checkSelected(role)}`}
            onClick={() => handleChange(role)}
          />
          <p>{role}</p>
        </div>
      ))}
    </div>
  )
}

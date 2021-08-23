import { useState } from 'react'
import TagMenuButton from '../Util/TagMenuButton'

export default function TagFilter(props) {
    const { setTag, value } = props
    const [menuHidden, setMenu] = useState(true)

    function handleValueChange(value) {
        setTag(value)
        setMenu(!menuHidden)
    }

    return (
        <div className="inline-block text-left w-full">
            <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm p-4 bg-gray-100 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" onClick={() => setMenu(!menuHidden)}>
                {value === '' ? 'Tag' : value}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>


            <div hidden={menuHidden} className="absolute z-0 right-1/3 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1">
                    <TagMenuButton name='All' value='' changeTag={handleValueChange} />
                    <TagMenuButton name='Mental, Drug, Alcohol Treatment' value='mental-drug-alch' changeTag={handleValueChange} />
                    <TagMenuButton name='Substance Abuse' value='substance-abuse' changeTag={handleValueChange} />
                    <TagMenuButton name='Sex Offender Assistance' value='sex-offender-assistance' changeTag={handleValueChange} />
                    <TagMenuButton name='Gov. Assistance' value='gov-assistance' changeTag={handleValueChange} />
                    <TagMenuButton name='Career Training' value='career-training' changeTag={handleValueChange} />
                    <TagMenuButton name='Transportation' value='transportation' changeTag={handleValueChange} />
                    <TagMenuButton name='Food Bank' value='food-bank' changeTag={handleValueChange} />
                    <TagMenuButton name='Clothing' value='clothing' changeTag={setTag} />
                    <TagMenuButton name='Faith Based' value='faith-based' changeTag={handleValueChange} />
                    <TagMenuButton name='Housing' value='housing' changeTag={handleValueChange} />
                    <TagMenuButton name='Child Care' value='child-care' changeTag={handleValueChange} />
                    <TagMenuButton name='Health Care' value='health-care' changeTag={handleValueChange} />
                    <TagMenuButton name='Housing' value='housing' changeTag={handleValueChange} />
                    <TagMenuButton name='Local Gov. Offices' value='local-gov-offices' changeTag={handleValueChange} />
                    <TagMenuButton name='Community Resources' value='community-resources' changeTag={handleValueChange} />
                    <TagMenuButton name='Schools and Family Resource Centers' value='schools-family-resources ' changeTag={setTag} />
                </div>
            </div>
        </div>
    )
}

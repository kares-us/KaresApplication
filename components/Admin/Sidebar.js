import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'
import Button from '../Util/Button'

function Sidebar(props) {
  const { session, open, onClick } = props
  const isAdmin = session.user.roles.includes('Admin')
  const isCountyManager = session.user.roles.includes('County Manager')
  const router = useRouter()

  return (
    <div className={`absolute top-0 right-0 w-screen h-screen bg-black bg-opacity-50 z-40 ${open ? 'block' : 'hidden'}`} onClick={onClick}>
      <div className={`absolute top-0 right-0 h-screen w-11/12 max-w-sm transition-all trasform bg-gray-700 flex flex-col items-center z-50 ${open ? '' : '-translate-x-full'}`}>
        {isCountyManager || isAdmin ? <Button color='blue' label='Visitors' onClick={() => router.push('/admin/visitors')} extraClasses='my-4 w-8/12' /> : null}
        {isAdmin ? <Button color='blue' label='Resources' onClick={() => router.push('/admin/resources')} extraClasses='my-4 w-8/12' /> : null}
        {isAdmin ? <Button color='blue' label='Counties' onClick={() => router.push('/admin/counties')} extraClasses='my-4 w-8/12' /> : null}
        {isAdmin ? <Button color='blue' label='Accounts' onClick={() => router.push('/admin/accounts')} extraClasses='my-4 w-8/12' /> : null}

        <Button color='gray' label='Sign Out' onClick={() => signOut({ callbackUrl: '/admin/signin' })} extraClasses='my-4 w-8/12' />
      </div>
    </ div>
  );
}

export default Sidebar;
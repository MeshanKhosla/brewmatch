import { getServerSession } from 'next-auth';
import CreateDrinkProfile from '~/components/CreateDrinkProfile'
import { authOptions } from '~/server/auth';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <h1 className='text-2xl font-semibold'>Sign in to view your profile!</h1>
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Profile</h1>
      <CreateDrinkProfile />
    </div>
  )
}

export default Page
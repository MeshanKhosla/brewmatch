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
      <div className="flex items-center justify-center bg-[#F7F0DD] text-black p-4 text-center py-12">
        <h2 className="text-4xl text-center">PROFILE</h2>
      </div>
      <CreateDrinkProfile />
    </div>
  )
}

export default Page
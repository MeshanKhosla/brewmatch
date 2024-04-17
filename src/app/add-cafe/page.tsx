import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CreateCafe from '~/components/CreateCafe';
import { authOptions } from '~/server/auth';

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/discover')
  }


  return (
    <div>
      <div className="flex items-center justify-center bg-[#F7F0DD] text-black p-4 text-center py-12">
        <h2 className="text-4xl text-center">ADD CAFE</h2>
      </div>
      <CreateCafe />
    </div>
  )
}

export default Page
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
      <CreateCafe />
    </div>
  )
}

export default Page
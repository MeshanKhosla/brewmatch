import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CreateCafe from '~/components/CreateCafe';
import { getCafesByOwner } from '~/queries';
import { authOptions } from '~/server/auth';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import Link from 'next/link';

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/discover')
  }

  const myCafes = await getCafesByOwner(session.user.id)

  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-2xl font-semibold'>Your Cafes</h1>
      {myCafes.length === 0 ? <p>You don't have any cafes yet. If you're a cafe owner, create one below!</p> : (
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
          {myCafes.map(cafe => (
            <Link href={`/cafe/${cafe.name}`} key={cafe.id}>
              <Card key={cafe.id}>
                <CardHeader>
                  <CardTitle>{cafe.name}</CardTitle>
                  <CardDescription>{cafe.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
      <h1 className='text-2xl font-semibold'>Create a new Cafe!</h1>
      <CreateCafe />
    </div>
  )
}

export default Page
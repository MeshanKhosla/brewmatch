import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { authOptions } from '~/server/auth';
import { db } from '~/server/db';

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/discover')
  }

  const allUserCreatedCafes = await db.cafe.findMany({
    where: {
      userId: session.user.id
    }
  })

  console.log(allUserCreatedCafes)


  return (
    <div>
      <h1>Add Cafe (For cafe owners)</h1>
    </div>
  )
}

export default Page
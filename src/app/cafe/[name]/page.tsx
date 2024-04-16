const Page = ({ params }: { params: { name: string } }) => {
  const { name } = params
  const decodedName = decodeURIComponent(name)

  return (
    <div>
      <h1>{decodedName}</h1>
    </div>
  )
}

export default Page
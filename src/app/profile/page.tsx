import CreateDrinkProfile from '~/components/CreateDrinkProfile'

const Page = () => {
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
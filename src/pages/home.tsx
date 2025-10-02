import InteractionsList from "../components/modules/home/interactionsList"
import AppraiserInteractionList from "../components/modules/home/appraiserInteractionList"
import OtherAppraiserInteractionList from "../components/modules/home/othersAppraiserInteractionList copy"

function Home() {
  return (
    <>
      <div className='min-h-screen bg-[#FAFAFA] flex flex-col items-center gap-4 p-4'>
        <div className="w-full flex gap-4">
          <InteractionsList />
          <AppraiserInteractionList />
        </div>
        <OtherAppraiserInteractionList />
      </div>
    </>
  )
}

export default Home
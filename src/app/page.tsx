import SexyText from "~/components/SexyText"

export default function Home() {
  return (
    <>
      <CoolIntro />
      <div className="flex justify-center">
        <div className="items-center text-center max-w-5xl min-h-[20em] bg-black/25 w-full my-12 rounded-xl">
          <div className="text-4xl my-8">
            [Auction UI - Bid]
          </div>
        </div>
      </div>
    </>

  )
}

function CoolIntro() {
  return (
    <div className="flex flex-col justify-center items-center text-center mt-4">
      <div className="flex space-x-2">
        <SexyText className="text-4xl font-semibold px-0 pb-2">
          Dutch Auction
        </SexyText>

        <div className="text-black px-1 py-0.5 bg-v3-primary rounded-md ml-2.5 font-semibold flex text-md self-start">
          v1
        </div>
      </div>
      <div className="text-[#9D9DA6] max-w-[60vw] text-md mt-4 heading-[24px]">
        Short Description
      </div>
    </div>
  )
}


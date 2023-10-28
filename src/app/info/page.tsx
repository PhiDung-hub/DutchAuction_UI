import type { Metadata } from 'next'
import BidEntry from '~/components/BidEntry';

export default function Info() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-4xl">
        Your Bid History
      </div>

      <div className="max-w-5xl bg-black/25 max-h-[60vh] overflow-y-scroll w-full my-12 rounded-xl">
        <BidEntry amount={500} bidPrice={20} status="ACCEPTED" bidTime={new Date()} />
        <BidEntry amount={500} bidPrice={15} status="PENDING" bidTime={new Date(Date.now() - 500_000)} />
        <BidEntry amount={200} bidPrice={10} status="PENDING" bidTime={new Date()} />
        <BidEntry amount={500} bidPrice={10} status="FAILED" bidTime={new Date()} />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Info - Dutch Auction',
  description: 'Past auctions info / aggregated protocol stats',
}

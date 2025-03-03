import { useState } from "react";
import { Body, Caption, Container, Title } from "../../components/common/Design";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { commonClassNameOfInput } from "../../components/common/Design";

export const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="pt-24 px-8">
      <Container>
        <div className="flex justify-between gap-8">
          {/* Left Image Section */}
          <div className="w-1/2">
            <div className="h-[70vh]">
              <img 
                src="https://bidout-wp.b-cdn.net/wp-content/uploads/2022/10/Image-14.jpg" 
                alt="Product" 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
          </div>

          {/* Right Product Details */}
          <div className="w-1/2">
            <Title level={2} className="capitalize">Couple Wedding Ring</Title>
            
            {/* Ratings */}
            <div className="flex gap-5">
              <div className="flex text-green">
                <IoIosStar size={20} />
                <IoIosStar size={20} />
                <IoIosStar size={20} />
                <IoIosStarHalf size={20} />
                <IoIosStarOutline size={20} />
              </div>
              <Caption>(2 customer reviews)</Caption>
            </div>

            <br />
            <Body>
            Celebrate your love with this exquisitely crafted wedding ring, designed to symbolize the unbreakable bond between two hearts. Made with premium-quality gold and adorned with a brilliant diamond centerpiece, this ring embodies timeless elegance and sophistication.
            </Body>

            <br />
            <Caption>Item Condition: New</Caption>
            <Caption>Item Verified: Yes</Caption>
            <Caption>Time left:</Caption>

            {/* Auction Countdown */}
            <div className="flex gap-8 text-center mt-3">
              {["149 Days", "12 Hours", "36 Minutes", "51 Seconds"].map((time, index) => (
                <div key={index} className="p-5 px-10 shadow-s1">
                  <Title level={4}>{time.split(" ")[0]}</Title>
                  <Caption>{time.split(" ")[1]}</Caption>
                </div>
              ))}
            </div>

            {/* Auction Info */}
            <br />
            <Title className="flex items-center gap-2">
              Auction ends: <Caption>Feb 10th, 2025 09:00 pm</Caption>
            </Title>
            <Title className="flex items-center gap-2 my-5">
              Timezone: <Caption>UTC 0</Caption>
            </Title>
            <Title className="flex items-center gap-2 my-5">
              Price: <Caption>$200</Caption>
            </Title>
            <Title className="flex items-center gap-2">
              Current bid: <Caption className="text-3xl">$500</Caption>
            </Title>

            {/* Bid Input */}
            <div className="p-5 px-10 shadow-s3 py-8">
              <form className="flex gap-3 justify-between">
                <input className={commonClassNameOfInput} type="number" name="price" />
                <button type="button" className="bg-gray-100 rounded-md px-5 py-3">
                  <AiOutlinePlus />
                </button>
                <button type="submit" className="py-3 px-8 rounded-lg bg-gray-400 text-gray-700 cursor-not-allowed">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="details mt-8">
          <div className="flex items-center gap-5">
            {["description", "auctionHistory", "reviews", "moreProducts"].map((tab) => (
              <button
                key={tab}
                className={`rounded-md px-10 py-4 text-black shadow-s3 ${
                  activeTab === tab ? "bg-green text-white" : "bg-white"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab === "description" && "Description"}
                {tab === "auctionHistory" && "Auction History"}
                {tab === "reviews" && `Reviews (2)`}
                {tab === "moreProducts" && "More Products"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content mt-8">
            {activeTab === "description" && (
              <div className="description-tab shadow-s3 p-8 rounded-md">
                <Title level={4}>Description</Title>
                <Caption className="leading-7">
                  Celebrate your love with this exquisitely crafted wedding ring, designed to symbolize the unbreakable bond between two hearts. Made with premium-quality gold and adorned with a brilliant diamond centerpiece, this ring embodies timeless elegance and sophistication.
                </Caption>

                <br />
                <Title level={4}>Product Overview</Title>
                <div className="flex justify-between gap-5">
                  {/* Product Details List */}
                  <div className="mt-4 capitalize w-1/2">
                    {[
                      ["Category", "Category"],
                      ["Height", "200 cm"],
                      ["Length", "300 cm"],
                      ["Width", "400 cm"],
                      ["Weight", "50 kg"],
                      ["Medium Used", "Gold"],
                      ["Price", "$50000"],
                      ["Sold Out", "Yes"],
                      ["Verified", "No"],
                      ["Created At", "December 31, 2024 12:00 am"],
                      ["Updated At", "December 31, 2024 12:00 am"],
                    ].map(([label, value], index) => (
                      <div key={index} className="flex justify-between border-b py-3">
                        <Title>{label}</Title>
                        <Caption>{value}</Caption>
                      </div>
                    ))}
                  </div>

                  {/* Product Image */}
                  <div className="w-1/2">
                    <div className="h-[60vh] p-2 bg-green rounded-xl">
                      <img 
                        src="https://bidout-wp.b-cdn.net/wp-content/uploads/2022/10/Image-14.jpg" 
                        alt="Product" 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "auctionHistory" && (
              <div className="auction-history-tab shadow-s3 p-8 rounded-md">
                <Title level={4}>Auction History</Title>
                <Caption className="leading-7">No auction history available at the moment.</Caption>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="reviews-tab shadow-s3 p-8 rounded-md">
                <Title level={5} className="font-normal">
                  Reviews
                </Title>
                <hr className="my-5" />
                <Title level={5} className="font-normal text-red-500">
                  Coming Soon!
                </Title>
              </div>
            )}

            {activeTab === "moreProducts" && (
              <div className="more-products-tab shadow-s3 p-8 rounded-md">
                <Title level={4}>More Products</Title>
                <Caption>Check back soon for more listings.</Caption>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export const AuctionHistory = () => {
  return (
    <>
      <div className="shadow-s1 p-8 rounded-lg">
        <Title level={5} className=" font-normal">
          Auction History
        </Title>
        <hr className="my-5" />

        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Bid Amount(USD)
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Auto
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">Feb 3rd, 2025 09:00 pm</td>
                <td className="px-6 py-4">$200</td>
                <td className="px-6 py-4">Tanishq Modi</td>
                <td className="px-6 py-4"> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
import { Caption, Container, Heading, ProfileCard, Title } from "../../components/common/Design";
import { topSellerList } from "../../assets/data";

export const TopSeller = () => {
  return (
    <>
      <section className="process py-12">
        <Container>
          <Heading title="Top Seller" subtitle="Dominating the auction space with exceptional deals and unbeatable listings. Their products attract the highest bids, making them a go-to seller!" />

          <div className="content grid grid-cols-1 md:grid-cols-5 gap-5 mt-8">
            {topSellerList.map((item, index) => (
              <div className="flex items-center justify-between border p-3 rounded-lg" key={index + 1}>
                <div className="flex items-center gap-3">
                  <ProfileCard className="w-16 h-16">
                    <img src={item.profile} alt="" className="w-full h-full rounded-full object-cover" />
                  </ProfileCard>
                  <div>
                    <Title level={5} className="font-normal text-xl">
                      {item.title}
                    </Title>
                    <Caption>${item.amount * item.id}</Caption>
                  </div>
                </div>
                <Title level={2} className=" opacity-10">
                  0{item.id}
                </Title>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
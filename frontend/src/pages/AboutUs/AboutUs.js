import React from "react";

export default function AboutUs() {
  return (
    <div className="">
      <div className="header__img-text">
        <div
          className="bg-white dark:bg-gray-900 absolute rounded-xl"
          style={{
            width: "70%",
            left: "50%",
            top: "30%",
            transform: "translate(-50%)",
          }}
        >
          <div className="py-8 px-12 mx-auto text-left">
            <div className="body">
              <h1 className="text-4xl text-center">About Us</h1>
              <p className="text-3xl text-center leading-8">
                PHTV Bus Online Ticket - VietNam's Top Rated Bus Booking
                Platform
              </p>
              <p className="text-md leading-8">
                PHTV Bus Online Ticket, over the years, has strived to deliver
                easy booking solutions to its customers. Our continued efforts
                have resulted in PHTV Bus Online Ticket becoming one of the
                leading and top-rated bus booking platforms in Viet Nam for
                various Bus services. We have a strong presence with a ticket
                inventory from over 3500 bus partners and 100000 route options
                on our app and website.
              </p>
              <p className="text-md leading-8">
                Founded in the year 2024, PHTV Bus Online Ticket is a pioneer in
                providing end-to-end software and other value-added solutions
                such as e-ticketing systems, fleet management solutions, vehicle
                tracking systems, passenger information systems, and logistics
                management backed by a 24x7 customer support center. The company
                also provides technology solutions to more than 300 large
                private bus partners in Viet Nam, 5 state transport
                corporations, and 2 international bus partners.
              </p>
              <p className="text-md leading-8">
                Today, PHTV Bus Online Ticket proudly serves as the preferred
                Information Technology Partner for State Transport Corporations
                and Private Bus Fleet Bus Partners. We take immense pride in
                being an ISO 9001:2008 certified company, reflecting our
                commitment to maintaining exceptional quality standards.
              </p>
              <h1 className="text-4xl mt-20">Let's Meet Members</h1>
              <p className="text-md leading-6">Nice to meet you</p>
              <p className="text-md leading-6">
                We're a team of passionate digital strategists and creatives who
                can help you achieve the performance you're looking for. We do
                it together as a single, cohesive team.
              </p>
              <p className="text-md leading-6">
                We promote our strengths: Ideate, create and deliver great
                things on the internet
              </p>
              <p className="text-md leading-6">
                As a member of our impact-driven team, each of your
                contributions will make a tangible difference. You'll
                collaborate with talented teammates in an environment that
                values your life outside of work.
              </p>
            </div>
            <div className="teammember">
              <div className="team-memberimg">
                <div className="cardmember card__img-Hoang"></div>
                <h4 className="cardmember-text">Pham Huy Hoang</h4>
                <h5>Team Leader</h5>
              </div>

              <div className="team-memberimg">
                <div className="cardmember card__img-Toan"></div>
                <h4 className="cardmember-text">Tran Gia Toan</h4>
                <h5>Super DEV</h5>
              </div>

              <div className="team-memberimg">
                <div className="cardmember card__img-Viet"></div>
                <h4 className="cardmember-text">Bui Quoc Viet</h4>
                <h5>Super DEV</h5>
              </div>

              <div className="team-memberimg">
                <div className="cardmember card__img-Phu"></div>
                <h4 className="cardmember-text">Le Pham Tran Phu</h4>
                <h5>Super DEV</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="header__bg-dark header__with-img"
        style={{ minHeight: "220vh" }}
      ></div>
    </div>
  );
}

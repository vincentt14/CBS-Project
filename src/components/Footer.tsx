import { Link } from "react-router-dom";

interface FooterProps {
  authUser: any;
}

const Footer = ({ authUser }: FooterProps) => {
  return (
    <footer className="border-t border-borderColor bg-bgColor pt-20 pb-5">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="mb-5 w-full flex-col place-items-center font-medium md:flex md:w-1/3">
            <ul>
              <h2 className="py-1 text-4xl font-bold text-white">Cinema Booking System</h2>
              <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
              <h3 className="mb-2 text-2xl font-bold text-white">Founder</h3>
              <p className="text-primary">Rucci</p>
              <p className="text-primary">Darren</p>
              <p className="text-primary">Vincent</p>
            </ul>
          </div>
          <div className="mb-5 w-full flex-col place-items-center md:flex md:w-1/3">
            <ul className="text-slate-400">
              <h3 className="mb-5 mt-4 text-xl font-semibold text-white">Shortcuts</h3>
              <li>
                <Link to="/" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  Home
                </Link>
              </li>
              {authUser && (
                <>
                  <li>
                    <Link to="/playingNow" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                      Playing Now
                    </Link>
                  </li>
                  <li>
                    <Link to="/userDashboard" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                      User Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/adminDashboard" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                      Admin Dashboard
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="mb-5 w-full flex-col place-items-center md:flex md:w-1/3">
            <ul className="text-slate-400">
              <h3 className="mb-5 mt-4 text-xl font-semibold text-white">About</h3>
              <li>
                <a href="/" target="blank" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  apapun
                </a>
              </li>
              <li>
                <a href="/" target="blank" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  apapun
                </a>
              </li>
              <li>
                <a href="/" target="blank" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  apapun
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

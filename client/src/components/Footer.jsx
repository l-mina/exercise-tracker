import { Linkedin, GithubIcon, DumbbellIcon } from "lucide-react"
import { Link } from "react-router-dom";

function Footer(){

    return(
        <div className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 flex justify-between">
          <aside className="grid-flow-col items-center">
            <DumbbellIcon />
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <Link to={"https://www.linkedin.com/"}>
              <Linkedin />
            </Link>
            <Link to={"https://www.github.com/"}>
              <GithubIcon />
            </Link>

          </div>
      </div>
    )
}

export default Footer;
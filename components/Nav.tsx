import Image from "next/image";
import { ModeToggle } from "./ui/mode";

export default function Nav() {
  return (
    <header>
      <nav>
        <ul className="flex items-center justify-end">
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

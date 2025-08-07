import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="flex py-3 px-2 gap-x-2 shadow-sm">
            <Link title={"Multiply two matrices"} href={'/multiplication'} className="hover:text-shadow-md">Multiplication</Link>
            |
            <Link title={"Perform Gaussian or Gauss-Jordan Elimination on a matrix"} href={'/elimination'} className="hover:text-shadow-md">Elimination</Link>
            |
            <Link title={"Invert a matrix"} href={'/inverse'} className="hover:text-shadow-md">Inverse</Link>
        </div>
    )
}
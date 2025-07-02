import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="flex py-3 px-2 gap-x-2 shadow-sm">
            <Link href={'/multiplication'} className="hover:text-shadow-md">Multiplication</Link>
            |
            <Link href={'/elimination'} className="hover:text-shadow-md">Elimination</Link>
            |
            <Link href={'/inverse'} className="hover:text-shadow-md">Inverse Matrix</Link>
            |
            <Link href={'/lu-factorization'} className="hover:shadow-md">LU Factorization</Link>
        </div>
    )
}
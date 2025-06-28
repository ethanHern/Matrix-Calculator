import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    return (
        <div className="py-3 px-2 shadow-sm">
            <button onClick={()=>{router.push('/elimination')}}>
                <div className="hover:shadow-md bg-yellow-500">Elimination</div>
            </button>
        </div>
    )
}
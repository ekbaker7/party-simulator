import Link from 'next/link';
function NavBarItem({ resourceString, href }: {resourceString: string, href: string}) {
    return ( <li className="inline-block ml-20">
        <Link href={href}>{resourceString}</Link>
    </li> );
}

export default NavBarItem;
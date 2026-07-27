export function LinkedCard({
    href,
    children,
}: {
    href: string
    children: React.ReactNode,
}) {
    return (
        <a href={href} target="_blank" className="flex flex-col text-neutral-800 dark:text-neutral-300 items-center rounded-md p-10 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 hover:dark:bg-neutral-900/70 transition-colors duration-300" >
            {children}
        </a>
    )
}
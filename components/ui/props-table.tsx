interface PropDefinition {
    name: string
    type: string
    defaultValue?: string
    description: string
}

interface PropsTableProps {
    props: PropDefinition[]
}

export function PropsTable({ props }: PropsTableProps) {
    return (
        <div className="w-full mt-1.5 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50">
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                                Prop
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                                Type
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                                Default
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {props.map((prop) => (
                            <tr
                                key={prop.name}
                                className="bg-white transition-colors hover:bg-neutral-50 dark:bg-black dark:hover:bg-neutral-900/50"
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                                            {prop.name}
                                        </code>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <code className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                        {prop.type}
                                    </code>
                                </td>
                                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                    {prop.defaultValue ? (
                                        <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                                            {prop.defaultValue}
                                        </code>
                                    ) : (
                                        <span className="text-neutral-400 dark:text-neutral-600">
                                            —
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                                    {prop.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

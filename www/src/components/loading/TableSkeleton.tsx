import { Table, TableBody, TableCell, TableColumn, TableHead, TableRow } from "../table"
import Skeleton from "./skeleton"

export default async function TableSkeleton({
    rowCount = 17
}: Readonly<{
    rowCount?: number,
}>) {
    return (
        <div className="w-full">
            <Table>
                <TableHead>
                    <TableColumn>
                        <Skeleton className="w-full h-5 my-1"/>
                    </TableColumn>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rowCount }, (_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="w-full h-5 my-0.5"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
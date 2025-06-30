import React from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

interface SimpleTableProps<T> {
    data: T[];
    columns: Column<T>[];
    className?: string;
    tableClassName?: string;
    headerClassName?: string;
    rowClassName?: string | ((item: T, index: number) => string);
    onRowClick?: (item: T, index: number) => void;
    emptyMessage?: string;
}

export function SimpleTable<T extends Record<string, any>>({
    data,
    columns,
    className,
    tableClassName,
    headerClassName,
    rowClassName,
    onRowClick,
    emptyMessage = "No data available",
}: SimpleTableProps<T>) {
    const getRowClassName = (item: T, index: number) => {
        const baseClasses = "border-b hover:bg-muted/25 transition-colors";
        const clickableClasses = onRowClick ? "cursor-pointer" : "";
        const customClasses = typeof rowClassName === "function"
            ? rowClassName(item, index)
            : rowClassName || "";

        return cn(baseClasses, clickableClasses, customClasses);
    };

    if (data.length === 0) {
        return (
            <div className={cn("text-center py-8 text-muted-foreground", className)}>
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className={cn("overflow-x-auto", className)}>
            <table className={cn("w-full", tableClassName)}>
                <thead>
                    <tr className={cn("border-b bg-muted/50", headerClassName)}>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className={cn(
                                    "text-left p-4 font-medium",
                                    column.headerClassName
                                )}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={getRowClassName(item, index)}
                            onClick={() => onRowClick?.(item, index)}
                        >
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    className={cn("p-4", column.className)}
                                >
                                    {column.render
                                        ? column.render(item)
                                        : item[column.key as keyof T]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Alternative Card-based layout for mobile/different designs
interface SimpleCardsProps<T> {
    data: T[];
    renderCard: (item: T, index: number) => React.ReactNode;
    className?: string;
    cardClassName?: string;
    onCardClick?: (item: T, index: number) => void;
    emptyMessage?: string;
}

export function SimpleCards<T>({
    data,
    renderCard,
    className,
    cardClassName,
    onCardClick,
    emptyMessage = "No data available",
}: SimpleCardsProps<T>) {
    if (data.length === 0) {
        return (
            <div className={cn("text-center py-8 text-muted-foreground", className)}>
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "transition-colors",
                        onCardClick && "cursor-pointer hover:bg-muted/25",
                        cardClassName
                    )}
                    onClick={() => onCardClick?.(item, index)}
                >
                    {renderCard(item, index)}
                </div>
            ))}
        </div>
    );
} 
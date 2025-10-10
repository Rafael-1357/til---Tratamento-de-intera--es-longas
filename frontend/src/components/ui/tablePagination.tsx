import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './pagination';

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        size="default"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(Math.max(currentPage - 1, 1));
                        }}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            size="default"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page);
                            }}
                            isActive={currentPage === page}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        size="default"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(Math.min(currentPage + 1, totalPages));
                        }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default TablePagination;
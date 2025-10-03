import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Checkbox } from '../../ui/checkbox'
import type { interactions, appraiser } from '../../../types/general.types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { useState } from 'react'
import { mockSnipers } from '../../../data/mockAppraiser'
import { formatDuration } from '../../../lib/utils'
import { useGeneralStore } from '../../../store/generalStore'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination'

function InteractionsList() {
  const { interactions, updateAppraiserInteraction } = useGeneralStore();
  const [snipers] = useState<appraiser[]>(mockSnipers);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredInteractions = interactions.filter(interaction =>
    interaction.analyst.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInteractions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentInteractions = filteredInteractions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateAppraiser = (interactionID: string, appraiserName: string) => {
    updateAppraiserInteraction(interactionID, appraiserName);
  }

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div>
        <h1 className='text-xl font-semibold'>Interações longas em andamento</h1>
      </div>
      <div className='relative'>
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          className="bg-white pl-8"
          placeholder='Pesquise por nome ou ID de interação'
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
      <div className="rounded-lg border overflow-x-hidden">
        <Table className='bg-white rounded-lg'>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center">
                <Checkbox aria-label="Select all" />
              </TableHead>
              <TableHead>Analisador</TableHead>
              <TableHead>Analista</TableHead>
              <TableHead>Tempo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              currentInteractions.map((interaction: interactions) => (
                <TableRow key={interaction.id}>
                  <TableCell>
                    <Checkbox className='flex items-center justify-center' aria-label="Select interaction" />
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleUpdateAppraiser(interaction.id, value)}>
                      <SelectTrigger className='w-32'>
                        <SelectValue placeholder="Selecione um sniper..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {snipers.map((sniper) => (
                            <SelectItem key={sniper.name} value={sniper.name}>
                              {sniper.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{interaction.analyst}</TableCell>
                  <TableCell>{formatDuration(interaction.time)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter className='bg-white'>
            <TableRow>
              <TableCell colSpan={4}>
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          size="default"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(Math.max(currentPage - 1, 1));
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
                              handlePageChange(page);
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
                            handlePageChange(Math.min(currentPage + 1, totalPages));
                          }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div >
  )
}

export default InteractionsList;
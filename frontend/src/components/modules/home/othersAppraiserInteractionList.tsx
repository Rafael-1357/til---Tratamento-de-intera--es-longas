import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Checkbox } from '../../ui/checkbox'
import type { supervisors, appraiser, appraiserInteractions } from '../../../types/general.types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { useState } from 'react'
import { mockSupervisors } from '../../../data/mockSupervisors'
import { mockSnipers } from '../../../data/mockAppraiser'
import { formatDuration } from '../../../lib/utils'
import { useGeneralStore } from '../../../store/generalStore'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../ui/pagination'

function OtherAppraiserInteractionList() {

  const { appraiser_interactions, updateInteractionDescription, currentAppraiser, updateFlaggedSupervisor, updateSupervisorName, updateAppraiserInteraction } = useGeneralStore(); // VARIÁVEL CORRIGIDA AQUI
  const [supervisors] = useState<supervisors[]>(mockSupervisors);
  const [snipers] = useState<appraiser[]>(mockSnipers);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredInteractions = appraiser_interactions.filter(interaction =>
    interaction.interaction.appraiser &&
    interaction.interaction.appraiser !== currentAppraiser && 
    (interaction.interaction.analyst.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.interaction.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
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
        <h1 className='text-xl font-semibold'>Outras interações</h1>
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
              <TableHead>Descrição</TableHead>
              <TableHead>Supervisor acionado</TableHead>
              <TableHead>Nome do supervisor</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {
              currentInteractions.map((interaction: appraiserInteractions) => (
                <TableRow key={interaction.interaction.id}>
                  <TableCell>
                    <Checkbox className='flex items-center justify-center' aria-label="Select interaction" />
                  </TableCell>
                  <TableCell>
                    <Select value={interaction.interaction.appraiser || ""} onValueChange={(value) => handleUpdateAppraiser(interaction.interaction.id, value)}>
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
                  <TableCell>{interaction.interaction.analyst}</TableCell>
                  <TableCell>{formatDuration(interaction.interaction.time)}</TableCell>
                  <textarea
                    className="whitespace-normal break-words w-80 text-sm text-muted-foreground"
                    value={interaction.description || ""}
                    onChange={(e) => updateInteractionDescription(interaction.interaction.id, e.target.value)}
                    placeholder='Descrição da interação...'
                  />
                  <TableCell>
                    <Select
                      value={String(interaction.flagged_supervisor)}
                      onValueChange={(value) => updateFlaggedSupervisor(interaction.interaction.id, value === 'true')}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {interaction.flagged_supervisor ? (
                      <Select
                        value={interaction.supervisor_name_flagged || ""}
                        onValueChange={(value) => updateSupervisorName(interaction.interaction.id, value)}
                      >
                        <SelectTrigger className='w-32'>
                          <SelectValue placeholder="Selecione um supervisor..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {supervisors.map((supervisor) => (
                              <SelectItem key={supervisor.name} value={supervisor.name}>
                                {supervisor.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-muted-foreground text-sm pl-3">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter className='bg-white'>
            <TableRow>
              <TableCell colSpan={7}>
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
export default OtherAppraiserInteractionList
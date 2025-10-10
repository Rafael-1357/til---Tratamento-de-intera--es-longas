import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import {
  Search,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeOff,
  ListFilter,
  ChevronsUpDown,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { Checkbox } from '../../ui/checkbox'
import type { interactions, appraiser, columnID, sorting } from '../../../types/general.types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { useMemo, useState } from 'react'
import { mockSnipers } from '../../../data/mockAppraiser'
import { cn, formatDuration } from '../../../lib/utils'
import { useGeneralStore } from '../../../store/generalStore'
import TablePagination from '../../ui/tablePagination'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

function InteractionsList() {
  const { interactions, updateAppraiserInteraction, updateInteractionStatus } = useGeneralStore();
  const [snipers] = useState<appraiser[]>(mockSnipers);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [columnVisibility, setColumnVisibility] = useState({
    analisador: true,
    analista: true,
    tempo: true,
    status: true,
  });

  const [sorting, setSorting] = useState<sorting | null>(null);

  const filteredAndSortedInteractions = useMemo(() => {
    let filtered = interactions.filter(
      (interaction) =>
        interaction.analyst.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interaction.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const baseSort = (a: interactions, b: interactions) => {
      if (a.status === 'finished' && b.status !== 'finished') return 1;
      if (a.status !== 'finished' && b.status === 'finished') return -1;
      return 0;
    };

    filtered.sort(baseSort);

    if (sorting) {
      filtered.sort((a, b) => {
        const base = baseSort(a,b);
        if(base !== 0) return base;

        let valA, valB;

        switch (sorting.column) {
          case 'analisador':
            valA = a.appraiser || '';
            valB = b.appraiser || '';
            break;
          case 'analista':
            valA = a.analyst;
            valB = b.analyst;
            break;
          case 'tempo':
            valA = a.time;
            valB = b.time;
            break;
          case 'status':
            valA = a.status;
            valB = b.status;
            break;
          default:
            return 0;
        }

        if (valA < valB) {
          return sorting.direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sorting.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [interactions, searchTerm, sorting]);

  const totalPages = Math.ceil(filteredAndSortedInteractions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentInteractions = filteredAndSortedInteractions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateAppraiser = (interactionID: string, appraiserName: string) => {
    updateAppraiserInteraction(interactionID, appraiserName);
  };

  const toggleColumn = (column: columnID) => {
    setColumnVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleSort = (column: columnID, direction: 'asc' | 'desc') => {
    setSorting({ column, direction });
  };


  const SortableHeader = ({ column, title }: { column: columnID; title: string }) => (
    <TableHead>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">
            <span>{title}</span>
            {sorting?.column === column ? (
              sorting.direction === 'asc' ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              )
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSort(column, 'asc')}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort(column, 'desc')}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toggleColumn(column)}>
            <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Ocultar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div>
        <h1 className='text-xl font-semibold'>Interações longas em andamento</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className='relative flex-grow'>
          <Label htmlFor="search" className="sr-only">
            Pesquisar
          </Label>
          <Input
            id="search"
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Visualizar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Alternar colunas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={columnVisibility.analisador}
              onCheckedChange={() => toggleColumn('analisador')}
            >
              Analisador
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.analista}
              onCheckedChange={() => toggleColumn('analista')}
            >
              Analista
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.tempo}
              onCheckedChange={() => toggleColumn('tempo')}
            >
              Tempo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={columnVisibility.status}
              onCheckedChange={() => toggleColumn('status')}
            >
              Status
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-lg border">
        <div className="overflow-auto h-[450px] rounded-lg ">
          <Table className='bg-white rounded-lg'>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="flex items-center">
                  <Checkbox aria-label="Select all" />
                </TableHead>
                {columnVisibility.analisador && <SortableHeader column="analisador" title="Analisador" />}
                {columnVisibility.analista && <SortableHeader column="analista" title="Analista" />}
                {columnVisibility.tempo && <SortableHeader column="tempo" title="Tempo" />}
                {columnVisibility.status && <SortableHeader column="status" title="Status" />}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInteractions.map((interaction: interactions) => (
                <TableRow key={interaction.id} className={cn(interaction.status === 'finished' && 'bg-muted hover:bg-muted')}>
                  <TableCell>
                    <Checkbox className='flex items-center justify-center' aria-label="Select interaction" />
                  </TableCell>
                  {columnVisibility.analisador && (
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
                  )}
                  {columnVisibility.analista && <TableCell>{interaction.analyst}</TableCell>}
                  {columnVisibility.tempo && <TableCell>{formatDuration(interaction.time)}</TableCell>}
                  {columnVisibility.status && (
                    <TableCell>
                      <Select
                        value={interaction.status}
                        onValueChange={(value: 'pending' | 'finished') => updateInteractionStatus(interaction.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="finished">Finalizado</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TableFooter className='bg-white flex items-center justify-center rounded-b-xl'>
            <TableRow>
                <TableCell colSpan={Object.values(columnVisibility).filter(Boolean).length + 1}>
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </TableCell>
            </TableRow>
        </TableFooter>
      </div>
    </div >
  )
}

export default InteractionsList;
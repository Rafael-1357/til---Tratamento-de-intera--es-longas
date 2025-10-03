// src/components/modules/home/appraiserSelector.tsx
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Label } from '../../ui/label'
import { useGeneralStore } from '../../../store/generalStore'
import { mockSnipers } from '../../../data/mockAppraiser'

function AppraiserSelector() {
  const { currentAppraiser, setCurrentAppraiser } = useGeneralStore();

  return (
    <div className="w-full bg-white p-4 rounded-lg border flex items-center gap-4">
      <Label htmlFor="appraiser-select" className="font-semibold text-lg">Usuário Atual:</Label>
      <Select value={currentAppraiser || ""} onValueChange={setCurrentAppraiser}>
        <SelectTrigger id="appraiser-select" className="w-64">
          <SelectValue placeholder="Selecione um usuário..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {mockSnipers.map((sniper) => (
              <SelectItem key={sniper.name} value={sniper.name}>
                {sniper.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default AppraiserSelector;
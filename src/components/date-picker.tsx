'use client'

import { useImperativeHandle, useState } from 'react'
import { format } from 'date-fns'
import { LucideCalendar } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export type ImperativeHandleFromDatePicker = {
  reset: () => void
}

interface DatePickerProps {
  id: string
  name: string
  defaultValue?: string | undefined
  imperativeHandleRef?: React.RefObject<ImperativeHandleFromDatePicker>
}
const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  )
  const [open, setOpen] = useState(false)

  // 暴露 reset 方法，被調用時，會重置 date 為 new Date()
  // 這個方法可以被父組件調用 TicketUpsertForm 的 handleSuccess
  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(new Date()),
  }))

  // 主要驗證 key 是否會變化
  // const [testKey, setTestKey] = useState('key')
  // console.log('測試', testKey)

  const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : ''

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
    // setTestKey('key變化')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="w-4 h-4 mr-2" />
          {formattedStringDate}
          <input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }

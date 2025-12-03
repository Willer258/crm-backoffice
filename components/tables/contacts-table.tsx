'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Eye, Pencil, Trash, Mail, Phone as PhoneIcon, Building2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Contact } from '@/lib/data/mock'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const contact = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {contact.firstName[0]}{contact.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{contact.firstName} {contact.lastName}</div>
            <div className="text-sm text-muted-foreground">{contact.position}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Entreprise
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const company = row.getValue('company') as string
      return (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{company}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const email = row.getValue('email') as string
      return (
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: 'phone',
    header: 'Téléphone',
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string
      return (
        <div className="flex items-center gap-2 text-sm">
          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
          <a href={`tel:${phone}`} className="hover:underline">
            {phone}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variants: Record<string, { variant: 'default' | 'secondary' | 'outline' | 'destructive', label: string }> = {
        lead: { variant: 'outline', label: 'Prospect' },
        qualified: { variant: 'secondary', label: 'Qualifié' },
        customer: { variant: 'default', label: 'Client' },
        churned: { variant: 'destructive', label: 'Perdu' },
      }
      const config = variants[status] || variants.lead
      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  },
  {
    accessorKey: 'dealValue',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valeur
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const value = row.getValue('dealValue') as number
      return (
        <div className="font-medium">
          {value > 0 ? `${value.toLocaleString('fr-FR')} €` : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: 'lastContact',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Dernier contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastContact'))
      const now = new Date()
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

      let color = 'text-green-600'
      if (diffDays > 14) color = 'text-orange-600'
      if (diffDays > 30) color = 'text-red-600'

      return (
        <div className={`text-sm ${color}`}>
          {diffDays === 0 ? "Aujourd'hui" :
           diffDays === 1 ? "Hier" :
           diffDays < 7 ? `Il y a ${diffDays}j` :
           date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const contact = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.email)}>
              Copier l'email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.phone)}>
              Copier le téléphone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/contacts/${contact.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Voir le détail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface ContactsTableProps {
  data: Contact[]
}

export function ContactsTable({ data }: ContactsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [statusFilter, setStatusFilter] = React.useState<string>('all')

  // Apply status filter
  const filteredData = React.useMemo(() => {
    if (statusFilter === 'all') return data
    return data.filter(contact => contact.status === statusFilter)
  }, [data, statusFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Rechercher un contact..."
          value={(table.getColumn('firstName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('firstName')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="lead">Prospects</SelectItem>
            <SelectItem value="qualified">Qualifiés</SelectItem>
            <SelectItem value="customer">Clients</SelectItem>
            <SelectItem value="churned">Perdus</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1" />
        <div className="text-sm text-muted-foreground">
          {filteredData.length} contact{filteredData.length > 1 ? 's' : ''}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun contact trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} résultat{table.getFilteredRowModel().rows.length > 1 ? 's' : ''}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}

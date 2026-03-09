'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Building2,
  Check,
  Crown,
  Loader2,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react'
import { useWorkspace } from '@/hooks/use-workspace'
import { cn } from '@/lib/utils'

const createWorkspaceSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
})

const inviteMemberSchema = z.object({
  email: z.string().email('Email invalide'),
  role: z.enum(['admin', 'member', 'viewer']),
})

type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>
type InviteMemberForm = z.infer<typeof inviteMemberSchema>

export default function UsersWorkspacePage() {
  const {
    workspaces,
    currentWorkspace,
    members,
    isLoading,
    actionLoading,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    switchWorkspace,
    inviteMember,
    removeMember,
  } = useWorkspace()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null)

  const createForm = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: '' },
  })

  const inviteForm = useForm<InviteMemberForm>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: { email: '', role: 'member' },
  })

  const editForm = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: '' },
  })

  const handleCreateWorkspace = async (data: CreateWorkspaceForm) => {
    try {
      await createWorkspace(data)
      setCreateDialogOpen(false)
      createForm.reset()
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleInviteMember = async (data: InviteMemberForm) => {
    if (!currentWorkspace) return
    try {
      await inviteMember(currentWorkspace.id, data)
      setInviteDialogOpen(false)
      inviteForm.reset()
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleEditWorkspace = async (data: CreateWorkspaceForm) => {
    if (!selectedWorkspaceId) return
    try {
      await updateWorkspace(selectedWorkspaceId, data)
      setEditDialogOpen(false)
      editForm.reset()
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleDeleteWorkspace = async () => {
    if (!selectedWorkspaceId) return
    try {
      await deleteWorkspace(selectedWorkspaceId)
      setDeleteDialogOpen(false)
      setSelectedWorkspaceId(null)
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleSwitchWorkspace = async (id: string) => {
    if (id === currentWorkspace?.id) return
    try {
      await switchWorkspace(id)
    } catch (error) {
      // Error handled in hook
    }
  }

  const openEditDialog = (workspace: { id: string; name: string }) => {
    setSelectedWorkspaceId(workspace.id)
    editForm.setValue('name', workspace.name)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (id: string) => {
    setSelectedWorkspaceId(id)
    setDeleteDialogOpen(true)
  }

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
      owner: { label: 'Propriétaire', variant: 'default' },
      admin: { label: 'Admin', variant: 'secondary' },
      member: { label: 'Membre', variant: 'outline' },
      viewer: { label: 'Lecteur', variant: 'outline' },
    }
    const config = variants[role] || variants.member
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs & Workspace</h1>
        <p className="text-muted-foreground">
          Gérez vos espaces de travail et les membres de votre équipe
        </p>
      </div>

      {/* Workspaces Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Espaces de travail
            </CardTitle>
            <CardDescription>
              Vos workspaces et ceux auxquels vous avez accès
            </CardDescription>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau workspace
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un workspace</DialogTitle>
                <DialogDescription>
                  Créez un nouvel espace de travail pour votre équipe
                </DialogDescription>
              </DialogHeader>
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(handleCreateWorkspace)} className="space-y-4">
                  <FormField
                    control={createForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du workspace</FormLabel>
                        <FormControl>
                          <Input placeholder="Mon entreprise" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button type="submit" disabled={actionLoading}>
                      {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Créer
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          {workspaces.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Building2 className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2">Aucun workspace</p>
              <p className="text-sm">Créez votre premier espace de travail</p>
            </div>
          ) : (
            workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className={cn(
                  'flex items-center justify-between rounded-lg border p-4 transition-colors',
                  workspace.id === currentWorkspace?.id && 'border-primary bg-primary/5'
                )}
              >
                <div
                  className="flex flex-1 cursor-pointer items-center gap-4"
                  onClick={() => handleSwitchWorkspace(workspace.id)}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{workspace.name}</p>
                      {workspace.id === currentWorkspace?.id && (
                        <Badge variant="secondary" className="text-xs">
                          <Check className="mr-1 h-3 w-3" />
                          Actif
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getRoleBadge(workspace.role)}
                      {workspace.membersCount && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {workspace.membersCount} membres
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSwitchWorkspace(workspace.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Sélectionner
                    </DropdownMenuItem>
                    {(workspace.role === 'owner' || workspace.role === 'admin') && (
                      <>
                        <DropdownMenuItem onClick={() => openEditDialog(workspace)}>
                          <Settings className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => openDeleteDialog(workspace.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Members Section */}
      {currentWorkspace && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membres de {currentWorkspace.name}
              </CardTitle>
              <CardDescription>
                Gérez les membres de cet espace de travail
              </CardDescription>
            </div>
            {(currentWorkspace.role === 'owner' || currentWorkspace.role === 'admin') && (
              <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Inviter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Inviter un membre</DialogTitle>
                    <DialogDescription>
                      Envoyez une invitation par email pour rejoindre ce workspace
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...inviteForm}>
                    <form onSubmit={inviteForm.handleSubmit(handleInviteMember)} className="space-y-4">
                      <FormField
                        control={inviteForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="collegue@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={inviteForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rôle</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un rôle" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="member">Membre</SelectItem>
                                <SelectItem value="viewer">Lecteur</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setInviteDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit" disabled={actionLoading}>
                          {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Envoyer l'invitation
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {members.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <Users className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">Aucun membre</p>
                <p className="text-sm">Invitez des membres pour collaborer</p>
              </div>
            ) : (
              members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name || member.email} />
                      <AvatarFallback>
                        {(member.firstName?.[0] || '') + (member.lastName?.[0] || '') ||
                          member.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {member.name || `${member.firstName} ${member.lastName}`.trim() || member.email}
                        </p>
                        {member.role === 'owner' && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRoleBadge(member.role)}
                    {(currentWorkspace.role === 'owner' || currentWorkspace.role === 'admin') &&
                      member.role !== 'owner' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMember(currentWorkspace.id, member.userId)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Workspace Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le workspace</DialogTitle>
            <DialogDescription>
              Modifiez les informations de cet espace de travail
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditWorkspace)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du workspace</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={actionLoading}>
                  {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Workspace Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le workspace</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes les données associées seront supprimées.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteWorkspace} disabled={actionLoading}>
              {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

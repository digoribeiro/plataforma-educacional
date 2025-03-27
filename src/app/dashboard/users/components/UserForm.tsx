// app/dashboard/admin/users/components/user-form.tsx
'use client';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserSchoolRole } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserForm({
  user,
  allSchools,
}: {
  user: {
    id: string;
    name: string | null;
    email: string;
    schools: {
      schoolId: string;
      role: UserSchoolRole;
      school: {
        name: string;
      };
    }[];
  };
  allSchools: {
    id: string;
    name: string;
  }[];
}) {
  const router = useRouter();
  
  const form = useForm({
    defaultValues: {
      name: user.name || '',
      email: user.email,
      schools: allSchools.map(school => ({
        schoolId: school.id,
        selected: user.schools.some(u => u.schoolId === school.id),
        role: user.schools.find(u => u.schoolId === school.id)?.role || 'STUDENT',
      })),
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          schools: data.schools
            .filter((s: any) => s.selected)
            .map((s: any) => ({
              schoolId: s.schoolId,
              role: s.role,
            })),
        }),
      });

      if (response.ok) {
        toast.success('Usuário atualizado com sucesso!');
        router.push('/dashboard/users');
      } else {
        toast.error('Erro ao atualizar usuário');
      }
    } catch (error) {
      toast.error('Erro interno no servidor');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Escolas e Permissões</h3>
          {allSchools.map((school, index) => (
            <div key={school.id} className="flex items-center gap-4 p-3 border rounded-lg">
              <FormField
                name={`schools.${index}.selected`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">{school.name}</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                name={`schools.${index}.role`}
                render={({ field }) => (
                  <FormItem className="ml-auto">
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!form.watch(`schools.${index}.selected`)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UserSchoolRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/admin/users')}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </Form>
  );
}
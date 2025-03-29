"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
});

export function SchoolForm({
  school,
}: {
  school?: { id: string; name: string; description: string | null };
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: school?.name || "",
      description: school?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = school
        ? `/api/admin/schools/${school.id}`
        : "/api/admin/schools";
      const method = school ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success(school ? "Escola atualizada!" : "Escola cadastrada!");
        router.push("/schools");
      } else {
        toast.error("Erro ao salvar escola");
      }
    } catch (error) {
      toast.error("Erro interno no servidor");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Escola*</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Escola Municipal ABC" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: Escola focada em ensino fundamental"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/schools")}
          >
            Cancelar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit">Salvar Alterações</button>
        </div>
      </form>
    </Form>
  );
}

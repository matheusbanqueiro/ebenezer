import { z } from "zod";

export const ReportSchema = z.object({
  name: z.string().nonempty("O Campo é obrigatório."),
  message: z.string().nonempty("O Campo é obrigatório."),
});

export type ReportFormSchemaProps = z.infer<typeof ReportSchema>;
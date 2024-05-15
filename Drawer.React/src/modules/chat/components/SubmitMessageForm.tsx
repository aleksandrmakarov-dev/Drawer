import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitMessageSchema, submitMessageSchema } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface SubmitMessageFormProps {
  onSubmit: (values: SubmitMessageSchema) => void;
  isLoading?: boolean;
}

const SubmitMessageForm: FC<SubmitMessageFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const form = useForm<SubmitMessageSchema>({
    resolver: zodResolver(submitMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Your answer..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="shrink-0" size="icon">
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </form>
    </Form>
  );
};

export default SubmitMessageForm;

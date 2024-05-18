import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { UseFormReset, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { SendHorizonal } from "lucide-react";

const postMessageSchema = z.object({
  text: z.string().min(1),
});

export type PostMessageSchema = z.infer<typeof postMessageSchema>;

interface PostMessageFormProps {
  onSubmit: (
    values: PostMessageSchema,
    reset: UseFormReset<PostMessageSchema>
  ) => void;
}

const PostMessageForm: FC<PostMessageFormProps> = ({ onSubmit }) => {
  const form = useForm<PostMessageSchema>({
    resolver: zodResolver(postMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex gap-3"
        onSubmit={form.handleSubmit((data) => onSubmit(data, form.reset))}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} />
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

export default PostMessageForm;

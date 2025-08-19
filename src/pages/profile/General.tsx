import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GENERAL_INPUTS } from "@/data";
import { FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const General = () => {
 const form = useForm()

  //! render Inputs
  const renderInputs = GENERAL_INPUTS.map((input) => (
   <FormItem key={input.id}>
     <FormControl>
       <Input
         placeholder={input.placeholder}
         type={input.type}
         className="h-11"
         {...form.register(input.name, input.validation)}
       />
     </FormControl>
     {/* <FormMessage>{form.formState.errors[input.name]?.message}</FormMessage> */}
   </FormItem>
 ));
 return (
  <section className="w-full space-y-4 mb-2">
  <Form {...form}>
    <form
      className="w-full space-y-4"
    >
     {/* avatar */}
     <FormItem>
      <FormControl>
        <Input
          placeholder="Avatar"
          type="file"
          className="h-11"
          accept="image/*"
          {...form.register("avatar")}
        />
      </FormControl>
      {/* <FormMessage>{form.formState.errors[input.name]?.message}</FormMessage> */}
    </FormItem>

      {renderInputs}
      {/* bio */}
      <FormItem>
        <FormControl>
         <Textarea placeholder="Bio" className="h-20"/>
        </FormControl>
        {/* <FormMessage>{form.formState.errors[input.name]?.message}</FormMessage> */}
      </FormItem>
    
      <Button
        className="w-fit h-11"
        type="submit"
        variant={"neutral"}
        aria-label="Login"
      >
        Save Changes
      </Button>
    </form>
  </Form>
</section>
 );
}

export default General;
